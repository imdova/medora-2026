"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    q: "How to book an appointment?",
    a: "Search for a doctor by name or specialty, choose an available time slot, and confirm your booking. You'll receive a confirmation by email and in the app.",
  },
  {
    q: "How does Medora 247 work?",
    a: "Medora 247 connects you with verified healthcare providers. You can compare doctors, read reviews, book appointments, and manage your health records in one place.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes. You can cancel or reschedule up to 24 hours before your appointment at no charge from your dashboard or via the app.",
  },
  {
    q: "Is my data secure?",
    a: "We use industry-standard encryption and comply with healthcare privacy regulations. Your data is never shared without your consent.",
  },
  {
    q: "Do you offer emergency care?",
    a: "For life-threatening emergencies, please call emergency services. For urgent but non-emergency issues, you can use our same-day or next-day appointment options.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-20" id="faq">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.h2
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Your Questions, Answered
        </motion.h2>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
