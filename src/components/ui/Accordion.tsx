"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className={cn(
      "mb-4 rounded-[2rem] border transition-all duration-500 overflow-hidden",
      isOpen ? "bg-primary/5 border-primary/20 shadow-xl shadow-primary/5" : "bg-white border-primary/5 hover:border-primary/20"
    )}>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-8 md:p-10 text-left focus:outline-none group"
      >
        <span className={cn(
          "text-xl md:text-2xl font-black transition-colors duration-300 tracking-tight",
          isOpen ? "text-primary" : "text-dark group-hover:text-primary"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500",
            isOpen ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover:bg-primary/10"
          )}
        >
          {isOpen ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-10 pb-10 text-text-secondary text-lg font-medium leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items }: { items: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};
