import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  const email = searchParams.get("email");
  const plan = searchParams.get("plan");
  const status = searchParams.get("status");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const skip = (page - 1) * limit;

  const [payments, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(fromDate || toDate
          ? {
              createdAt: {
                ...(fromDate && { gte: new Date(fromDate) }),
                ...(toDate && { lte: new Date(toDate) }),
              },
            }
          : {}),
        ...(email
          ? {
              user: {
                email: { contains: email, mode: "insensitive" },
              },
            }
          : {}),
        ...(plan
          ? {
              plan: {
                name: { contains: plan, mode: "insensitive" },
              },
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        user: { select: { email: true } },
        plan: { select: { name: true, price: true } },
        coupon: { select: { code: true, percentage: true } },
      },
    }),
    prisma.payment.count({
      where: {
        ...(status && { status: status as any }),
        ...(fromDate || toDate
          ? {
              createdAt: {
                ...(fromDate && { gte: new Date(fromDate) }),
                ...(toDate && { lte: new Date(toDate) }),
              },
            }
          : {}),
        ...(email
          ? {
              user: {
                email: { contains: email, mode: "insensitive" },
              },
            }
          : {}),
        ...(plan
          ? {
              plan: {
                name: { contains: plan, mode: "insensitive" },
              },
            }
          : {}),
      },
    }),
  ]);

  return NextResponse.json({
    payments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
