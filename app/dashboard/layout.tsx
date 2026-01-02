import DashboardUI from "./DashboardUI";
import { requireAuthUser } from "@/lib/require-auth-user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuthUser();

  if (!user) {
    redirect("/signin");
  }

  if (!user.active) {
    redirect("/blocked");
  }

  return <DashboardUI>{children}</DashboardUI>;
}
