"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 border-t-2 border-border text-center sm:text-left mt-4">
      <div className="container mx-auto px-4 grid gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-bold text-lg justify-center sm:justify-start">
            <Link href="/">CAPTCHA Solver</Link>
          </div>
          <p className="text-sm">© 2025 CAPTCHA Solver. All Rights Reserved.</p>

          {/* Payment methods */}
          <div className="mt-4 flex gap-3 flex-wrap"></div>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/products/image-captcha"
                className="hover:text-primary transition-colors"
              >
                Image Captcha
              </Link>
            </li>
            <li>
              <Link
                href="/products/text-captcha"
                className="hover:text-primary transition-colors"
              >
                Text Captcha
              </Link>
            </li>
            <li>
              <Link
                href="/products/audio-captcha"
                className="hover:text-primary transition-colors"
              >
                Audio Captcha
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/refund"
                className="hover:text-primary transition-colors"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h4 className="font-semibold mb-4 ">Contact</h4>
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            {/* Email Icon */}
            <Link
              href="mailto:support@captchasolver.com"
              className="hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hover:text-primary transition-colors"
              >
                <path d="M12 12.713l11.985-7.713H0L12 12.713zm0 2.574L0 5.701V18c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2V5.701l-12 9.586z" />
              </svg>
            </Link>

            {/* Telegram Icon */}
            <Link
              href="https://web.telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hover:text-primary transition-colors"
              >
                <path d="M12 0C5.371 0 0 5.372 0 12c0 6.628 5.371 12 12 12s12-5.372 12-12c0-6.628-5.371-12-12-12zm5.596 8.536l-1.403 6.606c-.106.5-.38.622-.77.386l-2.132-1.574-1.03.991c-.114.114-.21.21-.431.21l.154-2.172 3.946-3.56c.172-.154-.037-.24-.265-.086l-4.873 3.063-2.098-.655c-.455-.143-.465-.455.096-.671l8.19-3.15c.381-.143.715.086.594.655z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
