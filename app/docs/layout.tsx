import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { SearchWithCallback } from "./search-with-callback";

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
    <Layout
      sidebar={sidebar}
      navbar={navbar}
      pageMap={pageMap}
      search={<SearchWithCallback />}
      footer={footer}
      editLink={false}
      feedback={{ content: null }}
      darkMode={false}
      nextThemes={{
        attribute: "class",
        defaultTheme: "light",
        disableTransitionOnChange: true,
        storageKey: "theme",
      }}
    >
      {children}
    </Layout>
  );
}
