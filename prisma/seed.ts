import { Prisma } from "@/app/generated/prisma/client";
import "dotenv/config";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function main() {
  const password = "12345678";
  const passwordHash = await bcrypt.hash(password, 12);

  const adminData: Prisma.AdminCreateInput[] = [
    {
      username: "admin",
      password: passwordHash,
    },
  ];

  for (const a of adminData) {
    await prisma.admin.create({ data: a });
  }
}

main();
