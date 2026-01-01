import DashboardUI from "./DashboardUI";
import { authOptions, getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/signin");
  }

  if (user.active === false) {
    redirect("/signup");
  }

  return <DashboardUI>{children}</DashboardUI>;
}
