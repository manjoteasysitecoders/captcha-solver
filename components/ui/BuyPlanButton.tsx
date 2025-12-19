"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onAuthenticatedClick?: () => void; // optional
};

export default function BuyPlanButton({
  onAuthenticatedClick,
  children = "Get Started",
  ...props
}: Props) {
  const { status } = useSession();
  const router = useRouter();

  async function handleClick() {
    if (status === "authenticated") {
      if (onAuthenticatedClick) {
        await onAuthenticatedClick(); // call payment function
      }
    } else {
      router.push("/signup");
    }
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
