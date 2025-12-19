import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

const sidebar = { defaultMenuCollapseLevel: 1 };
const navbar = <Navbar logo={<b>CAPTCHA Solver</b>} />;

const footer = (
  <Footer>
    <div className="flex justify-center w-full">
      MIT {new Date().getFullYear()} © CAPTCHA Solver.
    </div>
  </Footer>
);

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/docs");

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Layout
          sidebar={sidebar}
          navbar={navbar}
          pageMap={pageMap}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
