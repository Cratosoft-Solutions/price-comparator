"use client";
import React from "react";
import { FacebookShare, WhatsappShare } from "react-share-kit";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const SocialShare = ({ pid, sid, onCloseFunction }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bg-black/40 backdrop-blur-sm top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCloseFunction(false)}
      >
        <motion.div
          className="rounded-2xl shadow-xl bg-dark-surface border border-dark-border/30 flex items-center gap-3 p-4"
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FacebookShare
            url={`https://encuentralofacilcr.com/productdetail?pid=${pid}&sid=${sid}`}
            size={52}
            hashtag={"#encuentralofacilcr"}
          />
          <WhatsappShare
            url={`https://encuentralofacilcr.com/productdetail?pid=${pid}&sid=${sid}`}
            size={52}
            separator=":: "
          />
          <button
            onClick={() => onCloseFunction(false)}
            className="w-9 h-9 rounded-full bg-dark-elevated/80 border border-dark-border/30 flex items-center justify-center text-dark-muted hover:text-accent-glow hover:bg-accent-primary/20 transition-all duration-300"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SocialShare;
