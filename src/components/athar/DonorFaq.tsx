import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DONOR_FAQS } from "./data";
import { fadeUp, viewport } from "./motion";

export function DonorFaq() {
  return (
    <section id="faq" className="athar-section bg-background">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-6 text-center"
        >
          <p className="type-kicker">قبل ما تتبرّع</p>
          <h2 className="type-h2 mt-2">سؤالين بيسألهن كل متبرّع</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <Accordion type="single" collapsible defaultValue="proof" className="flex flex-col gap-3">
            {DONOR_FAQS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="athar-card overflow-hidden border-b-0 px-4 md:px-5"
              >
                <AccordionTrigger className="py-4 text-start text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="leading-relaxed text-muted-foreground">{item.a}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {item.notes.map((note) => (
                      <li
                        key={note.t}
                        className="rounded-xl bg-ivory px-3 py-2.5 text-start"
                      >
                        <p className="text-sm font-semibold text-foreground">{note.t}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{note.d}</p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
