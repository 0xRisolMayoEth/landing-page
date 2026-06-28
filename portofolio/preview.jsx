import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Send, Mail, Linkedin, Twitter } from "lucide-react";

// ── Editable content ─────────────────────────────────────────────
const NAME = "Galang";
const ROLE = "Freelance Web Developer";
const projects = [
  {
    id: "01",
    name: "NovaAI",
    blurb: "A sleek SaaS landing page for an AI product — built so signing up feels like the obvious next step.",
    result: "One clear story, one strong CTA.",
    kind: "novaai",
    feature: true,
  },
  {
    id: "02",
    name: "IRONFIT Gym",
    blurb: "A high-energy landing page for a local gym.",
    result: "Bold and dark, made to convert.",
    kind: "gym",
  },
  {
    id: "03",
    name: "Lumière Salon",
    blurb: "An elegant page for a beauty salon, booking front and center.",
    result: "Soft, premium, on-brand.",
    kind: "salon",
  },
  {
    id: "04",
    name: "Roti & Co",
    blurb: "A warm bakery landing page that makes you hungry on sight.",
    result: "Appetite-first design.",
    kind: "roti",
  },
  {
    id: "05",
    name: "GRAUNG TEMPA",
    blurb: "A bold, dark landing page for a local exhaust brand — product as the hero.",
    result: "Single-scroll, built to sell.",
    kind: "landing-dark",
  },
];
// ─────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.pf {
  --bg-base:#F7F9FC; --bg-card:#FFFFFF; --ink:#0B1B33; --ink-soft:#51607C;
  --ink-faint:#8A98B5; --blue:#1B4DFF; --blue-deep:#0A2A6B; --blue-electric:#4D7CFF;
  --border:#E4EAF5; --wash:#EDF2FF;
  background:var(--bg-base); color:var(--ink);
  font-family:'Geist',system-ui,sans-serif; -webkit-font-smoothing:antialiased;
  min-height:100%; overflow-x:hidden;
}
.pf *{box-sizing:border-box;}
.serif{font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-weight:400;}
.mono{font-family:'JetBrains Mono',monospace;}
.wrap{max-width:1180px; margin:0 auto; padding:0 28px;}

/* page-wide ambient background */
.bg-ambient{position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden;}
.bg-grid{position:absolute; inset:0; background-size:32px 32px; opacity:.4;
  background-image:radial-gradient(var(--border) 1px, transparent 1px);
  -webkit-mask-image:radial-gradient(125% 95% at 50% 16%, #000 34%, transparent 82%);
  mask-image:radial-gradient(125% 95% at 50% 16%, #000 34%, transparent 82%);}
.blob{position:absolute; border-radius:50%; filter:blur(70px);}
.blob.b1{width:620px; height:620px; top:-170px; left:-130px;
  background:radial-gradient(circle, rgba(77,124,255,.20), transparent 68%); animation:floatA 22s ease-in-out infinite alternate;}
.blob.b2{width:560px; height:560px; top:-70px; right:-150px;
  background:radial-gradient(circle, rgba(27,77,255,.15), transparent 68%); animation:floatB 27s ease-in-out infinite alternate;}
.blob.b3{width:700px; height:700px; bottom:-260px; left:28%;
  background:radial-gradient(circle, rgba(120,160,255,.12), transparent 70%); animation:floatC 32s ease-in-out infinite alternate;}
@keyframes floatA{to{transform:translate(64px,42px) scale(1.08);}}
@keyframes floatB{to{transform:translate(-52px,32px) scale(1.05);}}
@keyframes floatC{to{transform:translate(44px,-54px) scale(1.1);}}

/* scroll progress */
.scroll-bar{position:fixed; top:0; left:0; height:3px; width:100%; z-index:60; transform-origin:left;
  background:linear-gradient(90deg,var(--blue),var(--blue-electric)); box-shadow:0 0 10px rgba(27,77,255,.4);}

/* keep content above ambient */
.nav,.hero,.section,.footer{position:relative; z-index:1;}

/* nav */
.nav{position:sticky; top:0; z-index:40; backdrop-filter:saturate(160%) blur(12px);
  background:rgba(247,249,252,.72); border-bottom:1px solid var(--border);
  transition:background .3s, box-shadow .3s, border-color .3s;}
.nav.scrolled{background:rgba(247,249,252,.86); box-shadow:0 6px 24px rgba(11,27,51,.06);
  border-color:#D8E2F4;}
.nav-in{display:flex; align-items:center; justify-content:space-between; height:64px;}
.brand{font-weight:600; letter-spacing:-.01em; font-size:16px;}
.brand .dot{color:var(--blue);}
.nav-links{display:flex; gap:30px;}
.nav-links a{color:var(--ink-soft); text-decoration:none; font-size:14px; position:relative;}
.nav-links a:hover{color:var(--ink);}
@media(max-width:680px){.nav-links{display:none;}}

/* eyebrow / section label */
.eyebrow{font-size:11.5px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--blue); display:inline-flex; align-items:center; gap:8px;}
.eyebrow::before{content:"//"; color:var(--blue-electric);}

/* hero */
.hero{position:relative; padding:120px 0 110px;}
.aurora{position:absolute; inset:-10% 0 auto; height:520px; pointer-events:none; z-index:0;
  background:radial-gradient(620px 320px at 22% 30%, rgba(77,124,255,.16), transparent 60%),
             radial-gradient(520px 320px at 78% 10%, rgba(27,77,255,.10), transparent 60%);
  filter:blur(8px); animation:drift 16s ease-in-out infinite alternate;}
@keyframes drift{to{transform:translateY(26px) translateX(-14px);}}
.dotgrid{position:absolute; inset:0; z-index:0; opacity:.5; pointer-events:none;
  background-image:radial-gradient(var(--border) 1px, transparent 1px);
  background-size:26px 26px; mask-image:linear-gradient(180deg,#000,transparent 72%);}
.glow{position:absolute; width:360px; height:360px; border-radius:50%; z-index:0; pointer-events:none;
  background:radial-gradient(circle, rgba(27,77,255,.10), transparent 65%); transform:translate(-50%,-50%);
  transition:opacity .4s; filter:blur(6px);}
.hero-in{position:relative; z-index:2; max-width:880px;}
.pill{display:inline-flex; align-items:center; gap:9px; padding:7px 14px; border-radius:999px;
  background:var(--bg-card); border:1px solid var(--border); font-size:13px; color:var(--ink-soft);
  box-shadow:0 6px 22px rgba(27,77,255,.05);}
.pill .live{width:7px; height:7px; border-radius:50%; background:#1fc16b; position:relative;}
.pill .live::after{content:""; position:absolute; inset:-4px; border-radius:50%;
  background:rgba(31,193,107,.35); animation:pulse 2s ease-out infinite;}
@keyframes pulse{0%{transform:scale(.6);opacity:.8}100%{transform:scale(2.4);opacity:0}}
.h1{font-size:clamp(2.7rem,7.2vw,5.4rem); line-height:1.02; letter-spacing:-.028em;
  font-weight:600; margin:26px 0 0;}
.h1 .accent{color:var(--blue-deep);}
.line{display:block; overflow:hidden; padding:.06em 0;}
.line-in{display:block; transform:translateY(118%);
  animation:lineUp 1s cubic-bezier(.16,1,.3,1) both;}
@keyframes lineUp{to{transform:translateY(0);}}
.hero-fade{opacity:0; transform:translateY(16px);
  animation:fadeUp .9s cubic-bezier(.2,.8,.2,1) both;}
@keyframes fadeUp{to{opacity:1; transform:none;}}
.lead{margin:26px 0 0; font-size:clamp(1rem,2.2vw,1.22rem); line-height:1.6;
  color:var(--ink-soft); max-width:620px; font-weight:300;}
.cta-row{display:flex; gap:14px; margin-top:40px; flex-wrap:wrap;}
.btn{display:inline-flex; align-items:center; gap:9px; padding:14px 22px; border-radius:13px;
  font-size:14.5px; font-weight:500; text-decoration:none; cursor:pointer; border:1px solid transparent;
  transition:transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, background .2s;}
.btn-primary{background:var(--blue); color:#fff; box-shadow:0 10px 26px rgba(27,77,255,.26);}
.btn-primary:hover{transform:translateY(-2px); box-shadow:0 16px 34px rgba(27,77,255,.32);}
.btn-ghost{background:var(--bg-card); color:var(--ink); border-color:var(--border);}
.btn-ghost:hover{transform:translateY(-2px); border-color:var(--blue-electric);}

/* sections */
.section{padding:96px 0; border-top:1px solid var(--border);}
.sec-head{display:flex; align-items:baseline; justify-content:space-between; gap:20px; margin-bottom:44px;}
.sec-title{font-size:clamp(1.7rem,3.6vw,2.5rem); letter-spacing:-.02em; font-weight:600; margin:14px 0 0;}
.sec-note{color:var(--ink-faint); font-size:13px; max-width:230px; text-align:right;}
@media(max-width:680px){.sec-note{display:none;}}

/* projects — asymmetric, visual */
.grid{display:grid; grid-template-columns:repeat(12,1fr); gap:20px;}
.card{grid-column:span 12; background:var(--bg-card); border:1px solid var(--border);
  border-radius:20px; position:relative; overflow:hidden; text-decoration:none; color:inherit;
  display:flex; flex-direction:column;
  transition:transform .4s cubic-bezier(.2,.8,.2,1), border-color .3s, box-shadow .4s;}
@media(min-width:760px){.card.feature{grid-column:span 8;} .card.third{grid-column:span 4;}}
.card:hover{transform:translateY(-6px); border-color:var(--blue-electric);
  box-shadow:0 26px 60px rgba(27,77,255,.13);}
.card:hover .arrow{transform:translate(3px,-3px); color:var(--blue);}
.card:hover .preview-zoom{transform:scale(1.045);}
.card:hover .view-tag{opacity:1; transform:translateY(0);}

/* preview frame */
.preview{position:relative; margin:14px 14px 0; border-radius:14px; overflow:hidden;
  border:1px solid var(--border); background:var(--wash); aspect-ratio:16/10;}
.card.feature .preview{aspect-ratio:16/9.4;}
.preview-zoom{position:absolute; inset:0; transition:transform .6s cubic-bezier(.2,.8,.2,1);}
.view-tag{position:absolute; left:12px; bottom:12px; z-index:5; font-size:12px; font-weight:500;
  color:#fff; background:var(--blue); padding:6px 12px; border-radius:8px; display:inline-flex;
  align-items:center; gap:6px; opacity:0; transform:translateY(8px); transition:.35s;
  box-shadow:0 8px 20px rgba(27,77,255,.3);}
.preview::before{content:""; position:absolute; inset:0; z-index:4; background:var(--bg-card);
  transform:scaleX(1); transform-origin:right; transition:transform .8s cubic-bezier(.76,0,.24,1);}
.reveal.in .preview::before{transform:scaleX(0);}

.card-body{padding:20px 24px 26px;}
.card-top{display:flex; align-items:flex-start; justify-content:space-between;}
.card-id{font-size:12px; color:var(--ink-faint);}
.arrow{transition:transform .3s, color .3s; color:var(--ink-faint);}
.card-name{font-size:clamp(1.2rem,2.3vw,1.55rem); font-weight:600; letter-spacing:-.015em; margin:14px 0 0;}
.card-blurb{color:var(--ink-soft); font-size:14.5px; line-height:1.55; margin:11px 0 0;}
.card-result{color:var(--ink); font-size:13px; margin:16px 0 0; display:inline-flex; gap:8px;
  align-items:center; font-weight:500;}
.card-result::before{content:"→"; color:var(--blue);}

/* ── mockups ── */
.mk{position:absolute; inset:0; background:#fff;}
.mk-bar{height:26px; display:flex; align-items:center; gap:6px; padding:0 12px;
  background:#F2F6FF; border-bottom:1px solid var(--border);}
.mk-dot{width:8px; height:8px; border-radius:50%; background:#D6DEEC;}
.mk-title{margin-left:8px; font-size:10px; color:var(--ink-faint);}
.mk-body{position:absolute; top:26px; left:0; right:0; bottom:0; padding:13px 15px;}

/* dashboard */
.sig{display:flex; align-items:center; justify-content:space-between; padding:7px 11px; margin-bottom:6px;
  background:var(--bg-base); border:1px solid var(--border); border-radius:9px;}
.sig-name{font-size:10.5px; font-weight:600; letter-spacing:.04em; color:var(--ink);}
.pill-buy,.pill-sell,.pill-watch{font-size:8.5px; font-weight:700; padding:3px 7px; border-radius:5px; letter-spacing:.05em;}
.pill-buy{background:#E3F9ED; color:#0E8A4F;}
.pill-sell{background:#FDE7E7; color:#C0392B;}
.pill-watch{background:var(--wash); color:var(--blue-deep);}
.bars{display:flex; align-items:flex-end; gap:6px; height:46px; margin-top:11px; padding:0 2px;}
.bar{flex:1; height:var(--h); background:linear-gradient(180deg,var(--blue-electric),var(--blue));
  border-radius:4px 4px 0 0; transform:scaleY(0); transform-origin:bottom;
  transition:transform .7s cubic-bezier(.2,.8,.2,1); transition-delay:var(--d);}
.reveal.in .bar{transform:scaleY(1);}

/* agent pipeline */
.flow{display:flex; align-items:center; gap:5px; position:relative;}
.node{font-size:9px; font-weight:600; padding:5px 8px; border-radius:7px; background:var(--bg-base);
  border:1px solid var(--border); color:var(--ink-soft); white-space:nowrap;}
.node-on{background:var(--blue); color:#fff; border-color:var(--blue);}
.flink{flex:1; height:1.5px; background:linear-gradient(90deg,var(--border),var(--blue-electric));}
.flow-dot{position:absolute; top:50%; left:0; width:6px; height:6px; border-radius:50%;
  background:var(--blue); box-shadow:0 0 8px var(--blue-electric); transform:translateY(-50%);
  animation:travel 3.6s ease-in-out infinite;}
@keyframes travel{0%{left:4%}100%{left:90%}}
.tweet{margin-top:13px; background:#fff; border:1px solid var(--border); border-radius:10px; padding:11px;}
.tw-top{display:flex; align-items:center; gap:8px; margin-bottom:8px;}
.tw-av{width:20px; height:20px; border-radius:50%; flex:none;
  background:linear-gradient(135deg,var(--blue-electric),var(--blue));}
.tw-line{display:block; height:7px; border-radius:4px; background:var(--wash); margin-bottom:6px;}
.tw-w0{width:36%; background:var(--border);} .tw-w1{width:92%;} .tw-w2{width:66%;}
.tw-cursor{display:inline-block; width:2px; height:10px; background:var(--blue); vertical-align:middle;
  animation:blink 1s step-end infinite;}
@keyframes blink{50%{opacity:0}}

/* landing — light (Carica) */
.mk-land{background:linear-gradient(180deg,#F2FBF6,#fff);}
.land-nav{display:flex; align-items:center; justify-content:space-between; padding:12px 15px;}
.land-brand{font-family:'Instrument Serif',serif; font-style:italic; font-size:15px; color:#0E8A4F;}
.land-menu{display:flex; gap:5px;}
.land-menu i{width:14px; height:2px; background:#CBD9D0; border-radius:2px;}
.land-hero{display:flex; align-items:center; gap:14px; padding:8px 16px;}
.land-text{flex:1;}
.lh{display:block; height:11px; border-radius:5px; background:#D7E8DE; margin-bottom:9px;}
.lh.w1{width:90%; height:15px; background:#BFE0CD;} .lh.w2{width:58%;}
.land-cta{display:inline-block; margin-top:3px; font-size:9px; font-weight:600; color:#fff;
  background:#16A35A; padding:6px 12px; border-radius:7px;}
.land-prod{width:74px; height:74px; border-radius:50%; flex:none;
  background:radial-gradient(circle at 35% 30%, #7EEBB1, #16A35A);
  box-shadow:0 12px 26px rgba(22,163,90,.32);}

/* landing — dark (GRAUNG) */
.mk-dark{background:radial-gradient(120% 100% at 50% 0%, #18223C, #0A0F1C);}
.dark-brand{font-size:13px; font-weight:800; letter-spacing:.16em; color:#fff;}
.land-menu.dk i{background:#3A4A6B;}
.dark-hero{padding:10px 16px;}
.dh{display:block; height:13px; border-radius:5px; background:#2A3553; margin-bottom:9px;}
.dh.w1{width:72%; background:linear-gradient(90deg,#FF7A3C,#FFB648);} .dh.w2{width:44%;}
.dark-prod{height:38px; border-radius:10px; margin-top:4px;
  background:linear-gradient(100deg,#1D2742,#3A507F 60%,#1D2742); border:1px solid #2C3B5E;}
.dark-cta{display:inline-block; margin-top:11px; font-size:9px; font-weight:700; color:#0A0F1C;
  background:linear-gradient(90deg,#FF7A3C,#FFB648); padding:6px 12px; border-radius:7px;}

/* novaai — AI SaaS */
.mk-nova{background:radial-gradient(130% 110% at 50% -10%, #2A2350, #0C0A1F);}
.nova-brand{font-size:13px; font-weight:700; color:#fff; letter-spacing:.02em;}
.nova-brand span{color:#A78BFA;}
.land-menu.nv i{background:#4B4070;}
.nova-hero{position:relative; padding:4px 16px 0; text-align:center;}
.nova-orb{width:54px; height:54px; border-radius:50%; margin:4px auto 12px;
  background:radial-gradient(circle at 35% 30%, #C4B5FD, #7C3AED 55%, #4338CA);
  box-shadow:0 0 28px rgba(124,58,237,.6); animation:floaty 4s ease-in-out infinite;}
@keyframes floaty{50%{transform:translateY(-6px);}}
.nl{display:block; height:9px; border-radius:5px; margin:0 auto 8px; background:#2C2750;}
.nl.w1{width:62%; height:11px; background:linear-gradient(90deg,#A78BFA,#60A5FA);}
.nl.w2{width:40%;}
.nova-cta{display:inline-block; margin-top:5px; font-size:9px; font-weight:700; color:#0C0A1F;
  background:linear-gradient(90deg,#C4B5FD,#A78BFA); padding:6px 14px; border-radius:7px;}

/* gym — bold dark */
.mk-gym{background:linear-gradient(160deg,#171717,#0A0A0A);}
.gym-brand{font-size:13px; font-weight:900; font-style:italic; color:#fff; letter-spacing:.04em;}
.gym-brand span{color:#C4F000;}
.land-menu.gy i{background:#3A3A3A;}
.gym-hero{padding:14px 16px;}
.gl{display:block; height:15px; border-radius:4px; margin-bottom:9px; transform:skewX(-7deg);}
.gl.w1{width:78%; background:linear-gradient(90deg,#C4F000,#84CC16);}
.gl.w2{width:50%; height:12px; background:#272727;}
.gym-cta{display:inline-block; margin-top:6px; font-size:9.5px; font-weight:800; font-style:italic;
  color:#0A0A0A; background:#C4F000; padding:7px 14px; border-radius:6px; letter-spacing:.04em;}

/* salon — elegant light */
.mk-salon{background:linear-gradient(180deg,#FBF4F1,#fff);}
.salon-brand{font-family:'Instrument Serif',serif; font-style:italic; font-size:16px; color:#9D5C5C;}
.land-menu.sl i{background:#E2C9C2;}
.salon-hero{display:flex; align-items:center; gap:13px; padding:8px 16px;}
.salon-text{flex:1;}
.sl-h{display:block; height:11px; border-radius:5px; background:#EBD7D1; margin-bottom:9px;}
.sl-h.w1{width:86%; height:15px; background:#E0BDB4;} .sl-h.w2{width:54%;}
.salon-cta{display:inline-block; margin-top:4px; font-size:9px; font-weight:600; color:#fff;
  background:#B5736F; padding:6px 13px; border-radius:20px; letter-spacing:.03em;}
.salon-img{width:64px; height:64px; border-radius:14px; flex:none;
  background:linear-gradient(135deg,#F0D4CC,#C98E88); box-shadow:0 10px 22px rgba(157,92,92,.22);}

/* roti — warm bakery */
.mk-roti{background:linear-gradient(180deg,#FBF3E6,#fff);}
.roti-brand{font-family:'Instrument Serif',serif; font-style:italic; font-size:15px; color:#8A5A2B;}
.land-menu.rt i{background:#E4CFAE;}
.roti-hero{display:flex; align-items:center; gap:13px; padding:8px 16px;}
.roti-loaf{width:62px; height:62px; border-radius:50% 50% 46% 46%; flex:none;
  background:radial-gradient(circle at 38% 32%, #E8B873, #B97B33); box-shadow:0 10px 22px rgba(138,90,43,.28);}
.roti-text{flex:1;}
.rl{display:block; height:11px; border-radius:5px; background:#EAD9BC; margin-bottom:9px;}
.rl.w1{width:82%; height:15px; background:#DBBE8C;} .rl.w2{width:52%;}
.roti-cta{display:inline-block; margin-top:4px; font-size:9px; font-weight:700; color:#fff;
  background:#B97B33; padding:6px 13px; border-radius:7px;}

/* about */
.about-grid{display:grid; grid-template-columns:1.4fr 1fr; gap:60px; align-items:start;}
@media(max-width:760px){.about-grid{grid-template-columns:1fr; gap:34px;}}
.about-lead{font-size:clamp(1.3rem,2.8vw,1.9rem); line-height:1.4; letter-spacing:-.015em; font-weight:400;}
.about-lead b{font-weight:600;}
.about-body{color:var(--ink-soft); font-size:15px; line-height:1.7; margin-top:20px;}
.about-side{border-left:2px solid var(--border); padding-left:24px;}
.stat{margin-bottom:24px;}
.stat .n{font-size:2rem; font-weight:600; letter-spacing:-.02em;}
.stat .n .serif{color:var(--blue-deep);}
.stat .l{font-size:13px; color:var(--ink-faint); margin-top:2px;}

/* skills */
.skill-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:24px;}
@media(max-width:680px){.skill-grid{grid-template-columns:1fr;}}
.skill-col h4{font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--blue);
  margin:0 0 14px; padding-bottom:12px; border-bottom:1px solid var(--border);}
.skill-col li{list-style:none; padding:9px 0; color:var(--ink-soft); font-size:15px;
  display:flex; align-items:center; gap:10px;}
.skill-col li::before{content:""; width:5px; height:5px; border-radius:50%; background:var(--blue-electric);}

/* contact */
.contact{text-align:center; padding:120px 0;}
.contact h2{font-size:clamp(2.2rem,6vw,4rem); letter-spacing:-.025em; font-weight:600; line-height:1.05;}
.socials{display:flex; gap:14px; justify-content:center; margin-top:34px;}
.soc{width:46px; height:46px; border-radius:12px; display:grid; place-items:center;
  background:var(--bg-card); border:1px solid var(--border); color:var(--ink-soft);
  transition:transform .25s, color .25s, border-color .25s;}
.soc:hover{transform:translateY(-3px); color:var(--blue); border-color:var(--blue-electric);}

/* footer */
.footer{border-top:1px solid var(--border); padding:30px 0;}
.footer-in{display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
  color:var(--ink-faint); font-size:13px;}
.footer a{color:var(--ink-soft); text-decoration:none;}
.footer a:hover{color:var(--blue);}

/* reveal */
.reveal{opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1);}
.reveal.in{opacity:1; transform:none;}
@media(prefers-reduced-motion:reduce){
  .reveal{opacity:1; transform:none; transition:none;}
  .aurora{animation:none;} .pill .live::after{animation:none;}
  .flow-dot,.tw-cursor{animation:none;}
  .nova-orb{animation:none;}
  .blob{animation:none;}
  .line-in{animation:none; transform:none;}
  .hero-fade{animation:none; opacity:1; transform:none;}
  .bar{transform:none;} .preview::before{display:none;}
}
`;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

function Mockup({ kind }) {
  if (kind === "novaai")
    return (
      <div className="mk mk-nova">
        <div className="land-nav">
          <span className="nova-brand">Nova<span>AI</span></span>
          <span className="land-menu nv"><i /><i /><i /></span>
        </div>
        <div className="nova-hero">
          <div className="nova-orb" />
          <span className="nl w1" /><span className="nl w2" />
          <span className="nova-cta">Try Nova free</span>
        </div>
      </div>
    );
  if (kind === "gym")
    return (
      <div className="mk mk-gym">
        <div className="land-nav">
          <span className="gym-brand">IRON<span>FIT</span></span>
          <span className="land-menu gy"><i /><i /><i /></span>
        </div>
        <div className="gym-hero">
          <span className="gl w1" /><span className="gl w2" />
          <span className="gym-cta">JOIN NOW</span>
        </div>
      </div>
    );
  if (kind === "salon")
    return (
      <div className="mk mk-salon">
        <div className="land-nav">
          <span className="salon-brand">Lumière</span>
          <span className="land-menu sl"><i /><i /><i /></span>
        </div>
        <div className="salon-hero">
          <div className="salon-text">
            <span className="sl-h w1" /><span className="sl-h w2" /><span className="salon-cta">Book a visit</span>
          </div>
          <div className="salon-img" />
        </div>
      </div>
    );
  if (kind === "roti")
    return (
      <div className="mk mk-roti">
        <div className="land-nav">
          <span className="roti-brand">Roti &amp; Co</span>
          <span className="land-menu rt"><i /><i /><i /></span>
        </div>
        <div className="roti-hero">
          <div className="roti-loaf" />
          <div className="roti-text">
            <span className="rl w1" /><span className="rl w2" /><span className="roti-cta">Order fresh</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="mk mk-dark">
      <div className="land-nav">
        <span className="dark-brand">GRAUNG</span>
        <span className="land-menu dk"><i /><i /><i /></span>
      </div>
      <div className="dark-hero">
        <span className="dh w1" /><span className="dh w2" />
        <div className="dark-prod" />
        <span className="dark-cta">Get yours</span>
      </div>
    </div>
  );
}

function Magnetic({ href, className, children }) {
  const ref = useRef(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }}
    >
      {children}
    </a>
  );
}

export default function Portfolio() {
  const root = useReveal();
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false });
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? h.scrollTop / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        setScrolled(h.scrollTop > 8);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pf" ref={root}>
      <style>{css}</style>

      <div className="scroll-bar" ref={barRef} style={{ transform: "scaleX(0)" }} />

      <div className="bg-ambient">
        <div className="bg-grid" />
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-in">
          <span className="brand">{NAME}<span className="dot">.</span></span>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        className="hero"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
        }}
        onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
      >
        <div className="aurora" />
        <div className="glow" style={{ left: glow.x, top: glow.y, opacity: glow.on ? 1 : 0 }} />
        <div className="wrap hero-in">
          <span className="pill hero-fade" style={{ animationDelay: ".05s" }}>
            <span className="live" /> Available for freelance work
          </span>
          <h1 className="h1">
            <span className="line">
              <span className="line-in" style={{ animationDelay: ".18s" }}>
                I build <span className="serif accent">clean</span> websites &amp;
              </span>
            </span>
            <span className="line">
              <span className="line-in" style={{ animationDelay: ".30s" }}>
                <span className="serif accent">AI</span> tools that ship.
              </span>
            </span>
          </h1>
          <p className="lead hero-fade" style={{ animationDelay: ".52s" }}>
            {ROLE} based in Central Java, Indonesia. I turn rough ideas into fast,
            considered websites — landing pages that convert, and tools that quietly do the work.
          </p>
          <div className="cta-row hero-fade" style={{ animationDelay: ".64s" }}>
            <Magnetic href="#work" className="btn btn-primary">
              View selected work <ArrowUpRight size={17} />
            </Magnetic>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
        </div>
      </header>

      {/* WORK */}
      <section className="section" id="work">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="sec-title">Things I&apos;ve built</h2>
            </div>
            <p className="sec-note">A few projects, not a gallery. Each one solved a real problem.</p>
          </div>
          <div className="grid">
            {projects.map((p) => (
              <a
                key={p.id}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`card reveal ${p.feature ? "feature" : "third"}`}
              >
                <div className="preview">
                  <div className="preview-zoom"><Mockup kind={p.kind} /></div>
                  <span className="view-tag">View project <ArrowUpRight size={13} /></span>
                </div>
                <div className="card-body">
                  <div className="card-top">
                    <span className="card-id mono">{p.id}</span>
                    <ArrowUpRight className="arrow" size={20} />
                  </div>
                  <h3 className="card-name">{p.name}</h3>
                  <p className="card-blurb">{p.blurb}</p>
                  <span className="card-result">{p.result}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="wrap about-grid">
          <div className="reveal">
            <span className="eyebrow">About</span>
            <p className="about-lead" style={{ marginTop: 18 }}>
              I&apos;m {NAME} — a developer who likes <b>shipping</b> over
              <span className="serif" style={{ color: "var(--blue-deep)" }}> talking</span>.
            </p>
            <p className="about-body">
              I work end-to-end: design, build, deploy. Most of my work lives at the
              intersection of clean interfaces and automation — landing pages that convert,
              dashboards that stay readable, and systems that run themselves. I care about
              speed, clarity, and getting things into the world.
            </p>
            <p className="about-body">
              Currently sharpening my craft on real projects and open to freelance work for
              small businesses and founders who want something done right.
            </p>
          </div>
          <div className="about-side reveal">
            <div className="stat">
              <div className="n">4<span className="serif">+</span></div>
              <div className="l">Shipped projects</div>
            </div>
            <div className="stat">
              <div className="n">Full<span className="serif">-stack</span></div>
              <div className="l">Design → deploy</div>
            </div>
            <div className="stat">
              <div className="n">24<span className="serif">/7</span></div>
              <div className="l">Self-hosted systems running</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="wrap contact reveal">
          <span className="eyebrow" style={{ justifyContent: "center", display: "flex" }}>Contact</span>
          <h2 style={{ marginTop: 18 }}>
            Let&apos;s build something<br /><span className="serif" style={{ color: "var(--blue-deep)" }}>worth shipping.</span>
          </h2>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: 32 }}>
            <Magnetic href="mailto:hello@example.com" className="btn btn-primary">
              <Mail size={17} /> Say hello
            </Magnetic>
          </div>
          <div className="socials">
            <a className="soc" href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub"><Github size={19} /></a>
            <a className="soc" href="#" onClick={(e) => e.preventDefault()} aria-label="Telegram"><Send size={19} /></a>
            <a className="soc" href="#" onClick={(e) => e.preventDefault()} aria-label="X"><Twitter size={19} /></a>
            <a className="soc" href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn"><Linkedin size={19} /></a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-in">
          <span>© {new Date().getFullYear()} {NAME}. Built from scratch.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
