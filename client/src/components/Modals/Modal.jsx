import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-20vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
    },
  },
  exit: {
    y: "20vh",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      stiffness: 100,
    },
  },
};

export default function Modal({ open, onClose }) {
  return ReactDOM.createPortal(
    <AnimatePresence exitBeforeEnter>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" w-11/12 md:w-1/2 bg-white rounded-lg z-50"
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="text-2xl font-bold">
                &times;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
}
