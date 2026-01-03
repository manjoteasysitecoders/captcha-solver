export const GST_RATE = 0.18;  // 18%

export function calculatePrice(
  basePrice: number,
  coupon?: { percentage: number }
) {
  const discountedPrice = coupon
    ? Math.round(basePrice * (1 - coupon.percentage / 100))
    : basePrice;

  const gstAmount = Math.round(discountedPrice * GST_RATE);
  const totalAmount = discountedPrice + gstAmount;

  return { discountedPrice, gstAmount, totalAmount };
}