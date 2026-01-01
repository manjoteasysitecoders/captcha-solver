import { verifyAdmin } from '@/lib/admin-auth';
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    )
  }

  const body = await req.json();
  const { active } = body as { active?: boolean };

  if (typeof active !== "boolean") {
    return NextResponse.json({ error: "active flag (boolean) is required" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { active },
    select: {
      id: true,
      email: true,
      active: true,
    },
  });

  return NextResponse.json(user);
}
