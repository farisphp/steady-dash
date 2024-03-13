import * as React from "react";

import { LayoutDashboard } from "lucide-react";

const Header = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filder]:bg-background/60"
      {...props}
    >
      <div className="flex p-3">
        {/* <Logo className="size-8 text-primary" /> */}
        <div className="flex items-center gap-1">
          <LayoutDashboard />
          <span className="font-semibold">Steady Dash</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <aside className="w-72 border-r border-border/80 px-3 py-2" {...props}>
      Side
    </aside>
  );
};

const AppLayout = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex h-full flex-1" {...props}>
        <Sidebar />
        <section className="p-3">{children}</section>
      </main>
    </div>
  );
};

export { AppLayout };
