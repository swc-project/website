import Link from "next/link";
import { FC, ReactNode } from "react";
import { Logo } from "../../components/logo";
import { RuntimeVersionSelector } from "../../components/runtime-version-selector";

type ResultsLayoutProps = {
  children: ReactNode;
};

const ResultsLayout: FC<ResultsLayoutProps> = ({ children }) => {
  return (
    <>
      <nav className="bg-background/90 sticky top-0 z-50 border-b px-4 py-2 backdrop-blur-md">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <Logo className="h-5" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://swc.rs/docs/plugin/registering-plugins"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground text-sm underline-offset-4 hover:underline"
            >
              Registration guide
            </Link>
            <RuntimeVersionSelector />
          </div>
        </div>
      </nav>
      <div className="container py-8">{children}</div>
    </>
  );
};

export default ResultsLayout;
