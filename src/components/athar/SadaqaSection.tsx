import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { fadeUp, viewport } from "./motion";
import { useGiveMeter } from "./GiveMeter";
import { DONATE_ORIGINS, originWhatsapp } from "./data";

export function SadaqaSection() {
  const { openMeter } = useGiveMeter();

  return (
    <section id="donate" className="scroll-mt-24 bg-forest py-12 text-forest-foreground md:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="mx-auto max-w-7xl px-5 text-center md:px-10"
      >
        <p className="text-sm font-semibold text-leaf">صدقة ما بتنتهي عند الإيد</p>
        <h2 className="mx-auto mt-2 text-[clamp(1.7rem,4vw,2.5rem)] font-semibold leading-snug">
          اللي بتعطيه اليوم، بتشوف أثره بكرة.
        </h2>
        <blockquote className="font-verse mx-auto mt-5  text-lg leading-loose text-white/90 md:text-xl">
          ﴿مَن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً﴾
        </blockquote>
        <p className="mt-1 text-xs text-white/55">سورة البقرة — ٢٤٥</p>
        <p className="mx-auto mt-4 max-w-[42ch] text-sm text-white/75">
          مو كلام تبرعات. شغل بالمخيم، متصوّر، وواصل. إذا حابب تكون جزء من الجاي — الباب مفتوح.
        </p>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => openMeter("khubz")}
            className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <div className="text-base font-semibold text-white">أكل</div>
            <div className="mt-1 text-[11px] text-white/60">خبز · جاجة · طبخة</div>
          </button>
          <a
            href="#iftar"
            className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <div className="text-base font-semibold text-white">إفطار</div>
            <div className="mt-1 text-[11px] text-white/60">على سفرة صائم</div>
          </a>
          <button
            type="button"
            onClick={() => openMeter("maa")}
            className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <div className="text-base font-semibold text-white">ماء</div>
            <div className="mt-1 text-[11px] text-white/60">تقدير: 100 شخص ≈ 200$</div>
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/impact" variant="ghostOnDark">
            اصنع أثرًا
          </Button>
          <Button href="/zakat" variant="ghostOnDark">
            احسب زكاتك
          </Button>
          {DONATE_ORIGINS.map((origin) => (
            <Button
              key={origin.id}
              href={originWhatsapp(origin.id)}
              variant={origin.id === "outside" ? "donate" : "ghostOnDark"}
            >
              {origin.label}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/55">رقم للي برا غزة، ورقم لأهل غزة.</p>
      </motion.div>
    </section>
  );
}
