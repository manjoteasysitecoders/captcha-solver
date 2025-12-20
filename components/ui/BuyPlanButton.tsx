"use client";
import { ButtonHTMLAttributes } from "react";

interface BuyPlanButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onAuthenticatedClick?: () => void | Promise<void>;
  onUnauthenticatedClick?: () => void;
}

const BuyPlanButton: React.FC<BuyPlanButtonProps> = ({
  onAuthenticatedClick,
  onUnauthenticatedClick,
  children,
  ...props
}) => {
  const handleClick = () => {
    if (onAuthenticatedClick) {
      onAuthenticatedClick();
    } else if (onUnauthenticatedClick) {
      onUnauthenticatedClick();
    }
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
};

export default BuyPlanButton;
