import React from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const AnimatedPage = ({ children, props }) => {
  return (
    <motion.div
      variants={props.animations ? props.animations : animations}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

AnimatedPage.defaultProps = {
  props: animations,
};
export default AnimatedPage;
