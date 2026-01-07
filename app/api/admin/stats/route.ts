import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const plans = await prisma.plan.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      _count: { select: { payments: true } },
    },
    orderBy: {
      payments: {
        _count: "desc",
      },
    },
  });

  const coupons = await prisma.coupon.findMany({
    select: {
      id: true,
      code: true,
      percentage: true,
      _count: { select: { payments: true } },
      isActive: true,
    },
    orderBy: {
      payments: { _count: "desc" },
    },
  });

  const [
    usersCount,
    activeUsers,
    totalCreditsAgg,
    usersWithPlan,
    recentUsers,
    totalRevenueAgg,
    pendingPayments,
    invoicesCount,
    recentPurchases,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { active: true } }),
    prisma.user.aggregate({ _sum: { credits: true } }),
    prisma.user.count({ where: { currentPlanId: { not: null } } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    
    // Payments stats
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    }),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.payment.count({ where: { invoiceVisible: true } }),

    // Recent purchases (last 7 days)
    prisma.payment.findMany({
      where: { createdAt: { gte: sevenDaysAgo }, status: "SUCCESS" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        user: { select: { email: true } },
        plan: { select: { name: true } },
        amount: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    users: {
      total: usersCount,
      active: activeUsers,
      inactive: usersCount - activeUsers,
      withPlan: usersWithPlan,
      recent: recentUsers,
      totalCredits: totalCreditsAgg._sum.credits ?? 0,
    },
    plans: {
      total: plans.length,
      avgPrice:
        plans.reduce((sum, p) => sum + p.price, 0) / (plans.length || 1),
      mostPopular: plans[0]?.name ?? null,
      purchased: plans.map((p) => ({
        name: p.name,
        purchasedCount: p._count.payments,
      })),
    },
    coupons: {
      total: coupons.length,
      active: coupons.filter((c) => c.isActive).length,
      inactive: coupons.filter((c) => !c.isActive).length,
      topUsed: coupons[0]?.code ?? null,
      usage: coupons.map((c) => ({
        code: c.code,
        timesUsed: c._count.payments,
      })),
    },
    payments: {
      totalRevenue: totalRevenueAgg._sum.amount ?? 0,
      pending: pendingPayments,
      invoicesGenerated: invoicesCount,
      recentPurchases,
    },
  });
}
