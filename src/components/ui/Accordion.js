'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
;

export default function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="acc-wrapper">
      <button
        type="button"
        className="acc-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="acc-title">{title}</span>
        <span className="acc-icon">
          {isOpen ? <IoChevronUp /> : <IoChevronDown />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="acc-contentWrapper"
          >
            <div className="acc-content">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
