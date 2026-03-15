import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

const transition = { type: "spring", duration: 0.4, bounce: 0 };
const pageVariants = {
  initial: { opacity: 0, y: 4 },
  enter: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: -4, transition },
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-svh bg-background text-foreground selection:bg-primary/30">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
