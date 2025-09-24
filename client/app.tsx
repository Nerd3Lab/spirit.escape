import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useOutlet } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { routes } from "@/routes";
import Layout from "@/components/layout/layout";

const queryClient = new QueryClient();

const App = () => {
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  const currentOutlet = useOutlet();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div
                ref={nodeRef as React.RefObject<HTMLDivElement>}
                className="fade"
              >
                {currentOutlet}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
