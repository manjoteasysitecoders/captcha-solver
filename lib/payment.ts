export const payWithRazorpay = async (amount: number) => {
  if (!(window as any).Razorpay) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  }

  const orderResponse = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  if (!orderResponse.ok) {
    const err = await orderResponse.json();
    if (orderResponse.status === 403) {
      throw new Error("Your account is blocked. Contact our team.");
    } else {
      throw new Error(err.error || "Payment failed. Please try again.");
    }
  }

  const order = await orderResponse.json();

  return new Promise((resolve, reject) => {
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Captcha Solver",
      description: "Buy Credits",
      order_id: order.id,
      handler: async (response: any) => {
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.status === "success") {
            resolve(verifyData);
          } else {
            reject(new Error("Payment Verification Failed"));
          }
        } catch (err) {
          reject(err);
        }
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#F37254" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
};
