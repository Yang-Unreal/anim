export const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const opacity = {
  initial: {
    opacity: 0,
    y: 50, // Start 50px down
  },
  open: {
    opacity: 1,
    y: 0, // Move to original position (slide up)
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    y: 50, // Return to 50px down
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};
