import notFound from "/assets/not-found.svg";
import { motion } from "motion/react";
function UnderDevelopment() {
  return (
    <>
      <p className="under-development">under development</p>
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="img_wrapper"
      >
        <img src={notFound} alt="" />
      </motion.div>
    </>
  );
}

export default UnderDevelopment;
