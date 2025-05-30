import { motion } from "motion/react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex fixed top-0 left-0 right-0 justify-between items-center w-full px-6 py-3 z-50"
    >
      <h2 className="cursor-pointer text-2xl md:text-[40px] md:leading-tight max-w-5xl tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white">
        Remote
      </h2>
    </motion.nav>
  );
};
