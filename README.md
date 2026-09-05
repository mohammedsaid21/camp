# Impact Compass

بدي الموقع يظهر بشكل اقوى وكمان بدي 

3d 

لازم يكون

واعطيني الوان وتصميم اقوى

<div dir="rtl" lang="ar" class="athar-root">
<style>
  .athar-root {
    --bg: #FAF7EF;
    --surface: #FFFFFF;
    --surface-alt: #F1E9D7;
    --text: #17130D;
    --text-soft: #6B6151;
    --text-faint: #9C9078;
    --line: #E7DFC8;
    --line-soft: #EFE9DA;
    --accent: #E8871F;
    --accent-bright: #FFA83D;
    --accent-link: #A85A16;
    --accent-edge: #B8631A;
    --on-accent: #291A08;
    --ember-tint: #FDECE4;
    --ember: #B03D1B;
    --radius-sm: 7px;
    --radius-md: 14px;
    --radius-lg: 22px;
 
    font-family: 'IBM Plex Sans Arabic', 'Tahoma', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.62;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    position: relative;
    isolation: isolate;
  }
  .athar-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .athar-root img, .athar-root svg, .athar-root canvas { display: block; max-width: 100%; }
  .athar-root a { color: inherit; text-decoration: none; }
  .athar-root ul { list-style: none; }
  .athar-root button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }
  .athar-root .serif { font-family: 'Markazi Text', 'Georgia', serif; font-weight: 700; }
  .athar-root .wrap { max-width: 1180px; margin-inline: auto; padding-inline: 20px; position: relative; z-index: 1; }
  @media (min-width: 860px) { .athar-root .wrap { padding-inline: 40px; } }
 
  /* ===== DARK ZONES (hero, impact, final cta, footer, nav, sticky bar) ===== */
  .zone-dark {
    --bg: #0C0A07; --surface: #1E1710; --surface-alt: #241C12;
    --text: #F7EFDD; --text-soft: #C2B79D; --text-faint: #857A63;
    --line: #332A1C; --line-soft: #241D13;
    --accent-link: #FFC168;
    background: var(--bg); color: var(--text);
  }
 
  /* ---------- NAV ---------- */
  .athar-nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(12, 10, 7, 0.82);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid transparent;
    transition: box-shadow .35s ease, border-color .35s ease, padding .35s ease;
    padding-block: 18px;
  }
  .athar-nav.is-compact { padding-block: 10px; border-color: #332A1C; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
  .athar-nav .wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .athar-logo { font-family: 'Markazi Text', serif; font-weight: 700; font-size: 1.8rem; color: #F7EFDD; }
  .athar-logo span { color: var(--accent); }
  .athar-nav-links { display: none; gap: 32px; font-size: .95rem; color: #C2B79D; }
  .athar-nav-links a:hover { color: #FFC168; }
  @media (min-width: 900px) { .athar-nav-links { display: flex; } }
 
  .athar-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 26px; border-radius: var(--radius-sm);
    font-size: .94rem; font-weight: 700;
    transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
  }
  .athar-btn-primary {
    background: linear-gradient(180deg, var(--accent-bright), var(--accent));
    color: var(--on-accent);
    box-shadow: 0 4px 0 var(--accent-edge), 0 10px 22px rgba(232,135,31,.28);
    transform: translateY(0);
  }
  .athar-btn-primary:hover { filter: brightness(1.05); }
  .athar-btn-primary:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--accent-edge), 0 4px 10px rgba(232,135,31,.22); }
  .athar-btn-primary.glow { animation: pulseGlow 2.6s ease-in-out infinite; }
  @keyframes pulseGlow { 0%,100% { box-shadow: 0 4px 0 var(--accent-edge), 0 0 0 0 rgba(232,135,31,.45), 0 10px 22px rgba(232,135,31,.28); } 50% { box-shadow: 0 4px 0 var(--accent-edge), 0 0 0 12px rgba(232,135,31,0), 0 10px 22px rgba(232,135,31,.28); } }
  .athar-btn-ghost { border: 1.5px solid #3A3122; color: #F7EFDD; }
  .athar-btn-ghost:hover { border-color: var(--accent); color: #FFC168; }
 
  .athar-burger { display: flex; flex-direction: column; gap: 5px; padding: 8px; }
  .athar-burger span { width: 20px; height: 2px; background: #F7EFDD; border-radius: 2px; }
  @media (min-width: 900px) { .athar-burger { display: none; } }
  .athar-mobile-menu { max-height: 0; overflow: hidden; transition: max-height .35s ease; background: #120F0A; border-bottom: 1px solid #332A1C; }
  .athar-mobile-menu.open { max-height: 320px; }
  .athar-mobile-menu ul { display: flex; flex-direction: column; padding: 8px 20px 20px; gap: 4px; }
  .athar-mobile-menu a { display: block; padding: 13px 4px; border-bottom: 1px solid #241D13; color: #C2B79D; font-size: 1rem; }
 
  /* ---------- HERO ---------- */
  .athar-hero { position: relative; padding-top: 58px; padding-bottom: 56px; overflow: hidden; }
  .hero-glow {
    position: absolute; z-index: 0; top: -220px; inset-inline-start: 50%; width: 720px; height: 720px;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(232,135,31,.28) 0%, rgba(232,135,31,0) 68%);
    filter: blur(10px);
    animation: driftGlow 11s ease-in-out infinite alternate;
  }
  @keyframes driftGlow { 0% { transform: translateX(-56%) translateY(0) scale(1);} 100% { transform: translateX(-44%) translateY(30px) scale(1.08);} }
  .athar-hero-inner { position: relative; z-index: 1; }
  .hero-title-line { overflow: hidden; }
  .hero-title-line span { display: block; transform: translateY(110%); opacity: 0; animation: riseIn .9s cubic-bezier(.2,.8,.2,1) forwards; }
  .hero-title-line:nth-child(1) span { animation-delay: .05s; }
  .hero-title-line:nth-child(2) span { animation-delay: .22s; }
  @keyframes riseIn { to { transform: translateY(0); opacity: 1; } }
  .athar-hero h1 { font-size: clamp(2.5rem, 9vw, 4.4rem); line-height: 1.14; letter-spacing: -.01em; max-width: 16ch; color: #FFFFFF; }
  .athar-hero h1 .accent-text { color: var(--accent); }
  .athar-hero-sub { margin-top: 24px; max-width: 48ch; font-size: clamp(1.02rem, 2.4vw, 1.2rem); color: #C2B79D; opacity: 0; animation: fadeUp .8s ease forwards; animation-delay: .5s; }
  .athar-hero-ctas { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 14px; opacity: 0; animation: fadeUp .8s ease forwards; animation-delay: .68s; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
 
  .athar-hero-frame {
    margin-top: 50px; border-radius: var(--radius-lg); border: 1px solid #332A1C;
    background: radial-gradient(circle at 30% 30%, rgba(232,135,31,.12), transparent 60%), #150F09;
    aspect-ratio: 16/10; position: relative; overflow: hidden;
    opacity: 0; animation: fadeUp 1s ease forwards; animation-delay: .85s;
  }
  @media (min-width: 700px) { .athar-hero-frame { aspect-ratio: 21/9; } }
  .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .athar-hero-frame-caption {
    position: absolute; bottom: 18px; inset-inline-start: 18px; font-size: .8rem; color: #C2B79D;
    background: rgba(12,10,7,.7); padding: 7px 13px; border-radius: 20px; border: 1px solid #332A1C;
  }
 
  /* ---------- SECTION HEAD ---------- */
  .athar-section-head { max-width: 54ch; margin-bottom: 42px; }
  .athar-section-head h2 { font-size: clamp(1.7rem, 4.2vw, 2.4rem); }
  .zone-dark .athar-section-head h2 { color: #FFFFFF; }
  .athar-section-head p { margin-top: 13px; color: var(--text-soft); font-size: 1.02rem; }
 
  /* ---------- IMPACT (dark) ---------- */
  .athar-impact { padding-block: 58px; border-top: 1px solid #241D13; border-bottom: 1px solid #241D13; }
  .impact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px 20px; }
  @media (min-width: 720px) { .impact-grid { grid-template-columns: repeat(4, 1fr); } }
  .impact-stat .num {
    font-family: 'Markazi Text', serif; font-weight: 700; font-size: clamp(2.3rem, 6.4vw, 3.3rem);
    color: var(--accent);
    text-shadow: 1px 1px 0 #A85A16, 2px 2px 0 #7C4310, 0 0 28px rgba(232,135,31,.4);
  }
  .impact-stat .label { margin-top: 8px; font-size: .9rem; color: #C2B79D; }
 
  /* ---------- JOURNEY (light) ---------- */
  .athar-journey { padding-block: 68px; background: var(--surface-alt); }
  .journey-track { display: flex; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
  .journey-track::-webkit-scrollbar { display: none; }
  .journey-node { flex: 0 0 auto; width: 172px; text-align: center; padding-inline: 6px; opacity: .2; transform: translateY(12px); transition: opacity .5s ease, transform .5s ease; }
  .journey-node.is-visible { opacity: 1; transform: translateY(0); }
  .journey-dot {
    width: 52px; height: 52px; margin-inline: auto; border-radius: 50%;
    background: radial-gradient(circle at 32% 28%, #FFD79A, #E8871F 55%, #A85A16 100%);
    display: flex; align-items: center; justify-content: center;
    color: #291A08; font-family: 'Markazi Text', serif; font-weight: 700; font-size: 1.25rem;
    box-shadow: 0 3px 0 rgba(0,0,0,.14), 0 12px 20px rgba(232,135,31,.28);
    transition: transform .3s ease;
  }
  .journey-node.is-visible .journey-dot { transform: translateY(-2px); }
  .journey-node h3 { margin-top: 15px; font-size: 1.02rem; font-weight: 700; }
  .journey-node p { margin-top: 6px; font-size: .83rem; color: var(--text-soft); line-height: 1.55; }
  .journey-line-wrap { position: relative; height: 2px; margin-inline: 25px; }
  .journey-line-wrap svg { position: absolute; top: -1px; width: 100%; height: 2px; overflow: visible; }
  .journey-line-path { stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 8; stroke-dashoffset: 1000; transition: stroke-dashoffset 1.2s ease; }
  .journey-line-wrap.is-visible .journey-line-path { stroke-dashoffset: 0; }
  .journey-line-wrap.is-flowing .journey-line-path { animation: flowDash 1.6s linear infinite; }
  @keyframes flowDash { to { stroke-dashoffset: -140; } }
 
  /* ---------- TRUST (light) ---------- */
  .athar-trust { padding-block: 68px; }
  .trust-layout { display: grid; gap: 40px; }
  @media (min-width: 860px) { .trust-layout { grid-template-columns: 1fr 1fr; align-items: start; } }
  .trust-list { display: flex; flex-direction: column; gap: 18px; }
  .trust-item { display: flex; gap: 15px; align-items: flex-start; padding-block: 17px; border-top: 1px solid var(--line-soft); }
  .trust-item:first-child { border-top: none; }
  .trust-icon { flex: 0 0 auto; width: 28px; height: 28px; border-radius: 50%; background: var(--ember-tint); color: var(--ember); display: flex; align-items: center; justify-content: center; font-size: .85rem; font-weight: 700; }
  .trust-item p { font-size: .98rem; padding-top: 4px; }
 
  /* ---------- PROOF (light, 3D tilt) ---------- */
  .athar-proof { padding-block: 68px; background: var(--surface-alt); }
  .proof-card {
    display: grid; gap: 28px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-lg); padding: 30px;
    box-shadow: 0 1px 2px rgba(23,19,13,.04), 0 18px 40px rgba(23,19,13,.08);
    transition: box-shadow .3s ease; transform-style: preserve-3d; will-change: transform;
  }
  @media (min-width: 860px) { .proof-card { grid-template-columns: 1fr 1fr; } }
  .proof-media { aspect-ratio: 4/3; border-radius: var(--radius-md); background: radial-gradient(circle at 70% 20%, rgba(232,135,31,.16), transparent 55%), var(--surface-alt); position: relative; }
  .proof-tag { position: absolute; top: 14px; inset-inline-start: 14px; background: rgba(255,255,255,.9); border: 1px solid var(--line); border-radius: 20px; padding: 5px 12px; font-size: .78rem; color: var(--accent-link); font-weight: 600; }
  .proof-body h3 { font-size: clamp(1.15rem, 2.6vw, 1.5rem); }
  .proof-meta { display: flex; gap: 10px; font-size: .82rem; color: var(--text-soft); margin-top: 8px; }
  .proof-meta span:not(:last-child)::after { content: '•'; margin-inline-start: 10px; color: var(--text-faint); }
  .proof-numbers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 22px; }
  .proof-numbers .n { font-family: 'Markazi Text', serif; font-size: 1.5rem; color: var(--accent-link); }
  .proof-numbers .l { font-size: .78rem; color: var(--text-soft); margin-top: 2px; }
  .proof-breakdown { margin-top: 22px; display: flex; flex-direction: column; gap: 8px; }
  .proof-breakdown div { display: flex; justify-content: space-between; font-size: .88rem; color: var(--text-soft); padding-block: 8px; border-top: 1px solid var(--line-soft); }
  .proof-breakdown div:first-child { border-top: none; }
  .proof-breakdown b { color: var(--text); font-weight: 600; }
  .proof-link { display: inline-block; margin-top: 22px; font-size: .92rem; font-weight: 700; color: var(--accent-link); border-bottom: 1px solid var(--accent-link); padding-bottom: 2px; }
  .proof-connection { margin-top: 16px; font-size: .84rem; color: var(--text-faint); }
 
  /* ---------- CAMPAIGNS (light, 3D tilt) ---------- */
  .athar-campaigns { padding-block: 68px; }
  .campaign-layout { display: grid; gap: 22px; }
  @media (min-width: 860px) { .campaign-layout { grid-template-columns: 1.3fr 1fr; grid-template-rows: auto auto; } .campaign-featured { grid-row: span 2; } }
  .campaign-card {
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-lg);
    overflow: hidden; display: flex; flex-direction: column;
    box-shadow: 0 1px 2px rgba(23,19,13,.04), 0 10px 26px rgba(23,19,13,.06);
    transition: box-shadow .3s ease, border-color .3s ease;
    transform-style: preserve-3d; will-change: transform;
  }
  .campaign-card:hover { border-color: #E3B27C; box-shadow: 0 20px 46px rgba(23,19,13,.14), 0 0 0 1px rgba(232,135,31,.08); }
  .campaign-media { aspect-ratio: 16/10; background: radial-gradient(circle at 25% 20%, rgba(232,135,31,.16), transparent 55%), var(--surface-alt); position: relative; }
  .campaign-featured .campaign-media { aspect-ratio: 4/3; }
  .campaign-badges { position: absolute; top: 14px; inset-inline: 14px; display: flex; justify-content: space-between; gap: 8px; }
  .campaign-status { background: rgba(255,255,255,.88); border: 1px solid var(--line); border-radius: 20px; padding: 5px 12px; font-size: .78rem; display: flex; align-items: center; gap: 6px; color: var(--text-soft); }
  .campaign-status .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }
  .campaign-urgent { background: var(--ember-tint); color: var(--ember); border: 1px solid #F3C9B7; border-radius: 20px; padding: 5px 12px; font-size: .78rem; font-weight: 700; }
  .campaign-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
  .campaign-meta { display: flex; gap: 10px; font-size: .8rem; color: var(--text-soft); }
  .campaign-meta span:not(:last-child)::after { content: '•'; margin-inline-start: 10px; color: var(--text-faint); }
  .campaign-body h3 { font-size: clamp(1.08rem, 2.6vw, 1.4rem); line-height: 1.4; }
  .campaign-desc { font-size: .93rem; color: var(--text-soft); line-height: 1.65; }
  .campaign-progress { margin-top: auto; }
  .campaign-progress-row { display: flex; justify-content: space-between; align-items: baseline; font-size: .89rem; margin-bottom: 8px; }
  .campaign-progress-row .raised { font-weight: 700; }
  .campaign-progress-row .pct { color: var(--accent-link); font-weight: 700; }
  .campaign-progress-track { height: 7px; background: var(--surface-alt); border-radius: 4px; overflow: hidden; position: relative; }
  .campaign-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent-edge), var(--accent)); border-radius: 4px; width: 0%; transition: width 1.2s cubic-bezier(.2,.7,.3,1); position: relative; overflow: hidden; }
  .campaign-progress-fill::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent); width: 40%; animation: shimmer 2.2s ease-in-out infinite; }
  @keyframes shimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(280%); } }
  .campaign-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 15px; gap: 10px; }
  .campaign-donors { font-size: .82rem; color: var(--text-soft); }
  .campaign-cta { font-size: .89rem; font-weight: 700; color: var(--accent-link); border-bottom: 1px solid var(--accent-link); padding-bottom: 1px; white-space: nowrap; }
 
  /* ---------- STORIES (light) ---------- */
  .athar-stories { padding-block: 68px; background: var(--surface-alt); }
  .stories-grid { display: grid; gap: 22px; }
  @media (min-width: 860px) { .stories-grid { grid-template-columns: 1fr 1fr; } }
  .story-card { background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--line); padding: 30px; box-shadow: 0 1px 2px rgba(23,19,13,.04), 0 10px 26px rgba(23,19,13,.06); }
  .story-card blockquote { font-family: 'Markazi Text', serif; font-size: clamp(1.2rem, 3vw, 1.5rem); line-height: 1.6; }
  .story-card cite { display: block; margin-top: 18px; font-style: normal; font-size: .84rem; color: var(--text-faint); }
 
  /* ---------- FINAL CTA (dark) ---------- */
  .athar-final-cta { padding-block: 76px; text-align: center; position: relative; overflow: hidden; }
  .athar-final-cta::before { content: ''; position: absolute; inset-inline-start: 50%; top: 0; width: 640px; height: 640px; transform: translate(-50%, -40%); background: radial-gradient(circle, rgba(232,135,31,.22), transparent 65%); }
  .athar-final-cta h2 { position: relative; font-size: clamp(1.8rem, 5vw, 2.6rem); color: #FFFFFF; max-width: 20ch; margin-inline: auto; }
  .athar-final-cta p { position: relative; margin-top: 16px; color: #C2B79D; }
  .athar-final-cta .athar-btn { position: relative; margin-top: 30px; }
 
  /* ---------- FOOTER (dark) ---------- */
  .athar-footer { padding-block: 56px 90px; border-top: 1px solid #241D13; }
  .footer-top { display: grid; gap: 36px; padding-bottom: 36px; border-bottom: 1px solid #241D13; }
  @media (min-width: 720px) { .footer-top { grid-template-columns: 1.4fr 1fr 1fr 1fr; } }
  .footer-brand p { margin-top: 14px; font-size: .9rem; max-width: 34ch; color: #857A63; }
  .footer-col h4 { font-size: .88rem; color: #F7EFDD; margin-bottom: 14px; font-weight: 700; }
  .footer-col ul { display: flex; flex-direction: column; gap: 10px; }
  .footer-col a { font-size: .88rem; color: #857A63; }
  .footer-col a:hover { color: #FFC168; }
  .footer-note { margin-top: 28px; font-size: .82rem; color: #857A63; line-height: 1.7; max-width: 70ch; }
  .footer-bottom { margin-top: 24px; font-size: .8rem; color: #5C523E; }
 
  /* ---------- STICKY MOBILE CTA (dark) ---------- */
  .athar-sticky-cta {
    position: fixed; bottom: 0; inset-inline: 0; z-index: 40;
    background: rgba(12,10,7,.92); backdrop-filter: blur(10px);
    border-top: 1px solid #332A1C; padding: 13px 20px;
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    transform: translateY(110%); transition: transform .35s ease;
  }
  .athar-sticky-cta.show { transform: translateY(0); }
  .athar-sticky-cta p { font-size: .8rem; color: #C2B79D; }
  @media (min-width: 900px) { .athar-sticky-cta { display: none; } }
 
  .reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }
 
  @media (prefers-reduced-motion: reduce) {
    .athar-root *, .athar-root *::before, .athar-root *::after { transition: none !important; animation: none !important; }
    .hero-title-line span { transform: none; opacity: 1; }
    .athar-hero-sub, .athar-hero-ctas, .athar-hero-frame { opacity: 1; }
  }
</style>
 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">



    أثر.
    


      

الرئيسية


      

الحملات


      

الشفافية


      

مثال موثّق


      

من نحن


    


    


      ادعم الآن
      
    


    


      

الرئيسية


      

الحملات


      

الشفافية


      

مثال موثّق


      

من نحن


    


    


      لكل تبرع أثر.
      لكل أثر دليل.
    


    

من لحظة تبرعك، نوثّق كل خطوة: أين وصل المبلغ، من استفاد منه، وماذا تغيّر بسببه — بالأرقام والصور، لا بالوعود.


    


      ادعم حملة الآن
      شاهد كيف نوثّق
    


    


      


      شبكة الأثر — كل نقطة تمثّل تبرعًا متصلًا بنتيجته الموثّقة
    


    


      

الأرقام حتى الآن


      

تُحدَّث تلقائيًا من قاعدة البيانات كل ما توثَّق عملية جديدة.


    


    


      

$0

إجمالي الدعم المُقدَّم


      

0

عائلة تم الوصول إليها


      

0

حملات مكتملة وموثّقة


      

0

عملية إغاثة ميدانية


    


    


      

كيف يتحوّل تبرعك إلى أثر؟


      

خمس خطوات نمرّ بها مع كل حملة، من إطلاقها إلى توثيق نتيجتها.


    


    


      

١

حملة

تُطلق لتغطية احتياج حقيقي وموثّق على الأرض.


      


      

٢

تبرّع

تدعم الحملة بالمبلغ الذي يناسبك.


      


      

٣

تنفيذ

يُستخدم الدعم لشراء المساعدات وتجهيزها.


      


      

٤

توثيق

نسجّل العملية بصور وتقرير وأرقام واضحة.


      


      

٥

أثر

تشاهد بنفسك نتيجة ما دعمته.


    


    


      

قائم على الإثبات، لا الوعود


      

لا نطلب منكم أن تثقوا بنا فقط — نُريكم ما حدث فعلاً، خطوة بخطوة، لكل دولار.


    


    


      

✓

عمليات ميدانية موثّقة بالكامل


      

✓

سجل مفتوح لكل الحملات السابقة


      

✓

ملخصات مالية واضحة لكل حملة


      

✓

صور وفيديوهات حقيقية من التنفيذ


      

✓

بيان واضح لكيفية توزيع كل مبلغ


    


    


      

هكذا تبدو حملة موثّقة بالكامل


      

قبل أن نطلب دعمك لحملة جديدة، إليك كيف انتهت حملة سابقة — بالأرقام والصور.


    


    


      

مكتملة وموثّقة


      


        

توزيع مساعدات غذائية — أغسطس 2026


        

مدينة غزةمساعدات غذائية


        


          

2,400$

تم إنفاقها


          

80

عائلة مستفيدة


          

1

عملية توزيع


        


        


          

سلال غذائية2,000$


          

نقل وتوصيل250$


          

تكاليف تشغيل150$


        


        

مُوِّلت هذه العملية عبر حملة المساعدات الغذائية لشهر أغسطس.


        شاهد التقرير الكامل
      


    


    


      

أين تُحتاج المساعدة الآن


      

حملات نشطة تحتاج دعمًا مباشرًا. كل حملة تنتهي تُنقل لاحقًا إلى صفحة التوثيق.


    


    


      


        

 نشطةعاجل — متبقّي 4 أيام


        


          

خان يونس، غزةمساعدات غذائية


          

مساعدات غذائية عاجلة لعائلات نازحة


          

80 عائلة نازحة بحاجة إلى سلال غذائية أساسية تكفيها أسبوعين، وسط ارتفاع الأسعار وشح المواد المتوفرة في الأسواق المحلية.


          


            

1,840$ من أصل 2,500$73%


            


          


          

142 شخصًا ساهموا حتى الآنادعم هذه الحملة


        


      


 
      


        

 نشطة


        


          

رفحمياه وصرف صحي


          

توفير مياه شرب نظيفة


          

تركيب وحدات تحلية صغيرة لأحياء تعاني انقطاعًا متكررًا في مياه الشرب الآمنة.


          


            

3,200$ / 6,000$53%


            


          


          

58 شخصًا ساهمواادعم


        


      


 
      


        

 تقترب من الاكتمال


        


          

دير البلحمستلزمات طبية


          

مستلزمات طبية لعيادة ميدانية


          

تأمين أدوية أساسية ومستلزمات إسعاف لعيادة تخدم النازحين في المنطقة.


          


            

8,900$ / 10,000$89%


            


          


          

210 شخصًا ساهمواادعم


        


      


    


    


      

خلف الأرقام


      

قصص قصيرة، برضا أصحابها، بدون استغلال معاناة أحد.


    


    


      


        

"بعد وصول السلة الغذائية، تمكّنت العائلة من تحضير وجبات لأسبوع كامل دون قلق."


        توثيق ميداني — خان يونس، سبتمبر 2026
      


      


        

"خلال ثلاثة أيام من انطلاق الحملة، وصلت المستلزمات الطبية إلى العيادة وبدأ استخدامها فورًا."


        فريق التوثيق الميداني — دير البلح
      


    


    

صار عندك دليل. صار عندك أثر.


    

ابدأ بدعم حملة، وتابع أثرها بنفسك خطوة بخطوة.


    ادعم حملة الآن


    


      


        أثر.
        

منصة توثّق أين يذهب تبرعك وماذا يحقق، خطوة بخطوة، من الحملة إلى الأثر.


      


      

المهمة

من نحن

كيف نعمل

تواصل معنا


      

الشفافية

التقارير المالية

أرشيف الحملات

معلومات التبرع


      

تابعنا

إنستغرام

واتساب

تيليجرام


    


    

نلتزم بحماية كرامة وخصوصية من نوثّق قصصهم. لا يُنشر أي اسم أو صورة أو تفاصيل شخصية دون موافقة صريحة من صاحبها أو ذويه.


    

أثر — منصة توثيق مساعدات إنسانية. جميع الأرقام في هذا العرض تجريبية بانتظار ربط قاعدة البيانات.

كل مبلغ يوصل ويُوثَّق

ادعم الآن

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5ca9873a-c70a-47a7-a877-f5effe0e044b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
# Camp-Athr
