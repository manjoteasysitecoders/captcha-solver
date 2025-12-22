import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <Navbar />
      <div>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        {children}
      </div>
      <Footer />
    </main>
  );
}
