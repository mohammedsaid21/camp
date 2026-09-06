import { motion } from "framer-motion";
import { TRUST } from "./data";
import { fadeUp, stagger, viewport } from "./motion";

export function TrustSection() {
  return (
    <section id="trust" className="athar-section border-y border-border bg-ivory">
      <div className="athar-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="type-kicker">قائم على الإثبات، لا الوعود</p>
          <h2 className="type-h1 mt-2">لا نطلب منك الثقة. نُريك الأثر.</h2>
          <p className="mt-3 max-w-[46ch] type-body text-muted-foreground">
            بسجل مفتوح للحملات، وتوثيق للعمليات، ووضوح في أين ذهب الدعم.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.06)}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {TRUST.map((item) => (
            <motion.li key={item.n} variants={fadeUp} className="athar-card p-4">
              <p className="type-caption text-muted-foreground">{item.n}</p>
              <h3 className="mt-1 font-semibold">{item.t}</h3>
              <p className="mt-1 type-small text-muted-foreground">{item.d}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
