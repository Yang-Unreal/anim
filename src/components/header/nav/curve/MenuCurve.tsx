import { motion } from "motion/react";

export default function Curve() {
  const height = window.innerHeight; // Get the height of the window

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${
    height / 2
  } 100 0`;

  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${
    height / 2
  } 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.5, 0, 0.2, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.5, 0, 0.2, 1] },
    },
  };

  return (
    <svg className="absolute left-[-99px] top-0 h-full w-[100px] fill-[#292929] stroke-none">
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
}
