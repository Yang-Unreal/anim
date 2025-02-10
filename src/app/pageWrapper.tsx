import { motion } from "motion/react";
import { usePreloaderContext } from "@/components/provider/preloaderContextProvider";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { showPage } = usePreloaderContext();

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{
        y: showPage ? 0 : "100vh",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
};
