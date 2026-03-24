import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import yukawaPortrait from '@/assets/yukawa-portrait.jpg';
import natsumotoPortrait from '@/assets/kenji_natsumoto_portfolio2025-2.png';

/* ─── Typewriter component ─── */
const Typewriter = ({ text, delay = 0, speed = 80, className = '' }: { text: string; delay?: number; speed?: number; className?: string }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
};

/* ─── Code Rain Canvas ─── */
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/{}()';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.1})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />;
};

/* ─── Counter animation ─── */
const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref} className={done ? 'animate-[shake_0.3s_ease-in-out]' : ''}>{count.toLocaleString()}</span>;
};

/* ─── Floating sphere with orbiting terms ─── */
const OrbitingSphere = () => {
  const terms = ['春夏秋冬理論', '強み (Strengths)', '素質 (Aptitude)', '富の法則 (Wealth Law)'];
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Glowing sphere */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, #D4AF37 0%, #F00 50%, transparent 70%)',
            boxShadow: '0 0 60px #D4AF37, 0 0 120px rgba(212,175,55,0.3)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      {/* Orbiting terms */}
      {terms.map((term, i) => (
        <motion.div
          key={term}
          className="absolute text-sm md:text-base font-bold text-white whitespace-nowrap"
          style={{ left: '50%', top: '50%' }}
          animate={{
            x: [
              Math.cos((i / terms.length) * Math.PI * 2) * 120,
              Math.cos(((i / terms.length) * Math.PI * 2) + Math.PI) * 120,
              Math.cos((i / terms.length) * Math.PI * 2) * 120,
            ],
            y: [
              Math.sin((i / terms.length) * Math.PI * 2) * 100,
              Math.sin(((i / terms.length) * Math.PI * 2) + Math.PI) * 100,
              Math.sin((i / terms.length) * Math.PI * 2) * 100,
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {term}
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Scrolling ticker ─── */
const ScrollingTicker = ({ text }: { text: string }) => (
  <div className="overflow-hidden whitespace-nowrap">
    <motion.div
      className="inline-block text-sm text-gray-400"
      animate={{ x: ['0%', '-100%'] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {text}&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;{text}
    </motion.div>
  </div>
);

/* ─── Screen wrapper with snap ─── */
const Screen = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section
    id={id}
    className={`h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden ${className}`}
  >
    {children}
  </section>
);

/* ─── Fade-in wrapper ─── */
const FadeInView = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── App list for Screen 5 ─── */
const appNames = ['SMATSTA', 'SOLVISTA', 'Vyse', 'Lumora', 'Traith', 'ProSprint', '3D Game', 'ChatBot', 'Analytics', 'E-Commerce', 'CRM', 'Scheduler', 'Portfolio', 'Dashboard', 'Social'];

const FlashingApps = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % appNames.length), 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.3 }}
          className="text-4xl md:text-6xl font-black text-white"
        >
          {appNames[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─── Slash-through list item ─── */
const SlashItem = ({ text, delay }: { text: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="relative text-2xl md:text-4xl font-bold text-white/80 my-4"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {text}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-red-600"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ duration: 0.4, delay: delay + 0.6 }}
      />
    </motion.div>
  );
};

/* ─── Main Page ─── */
const SuperVibeCodingV2 = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white" style={{ scrollBehavior: 'smooth' }}>
      {/* Floating Action Button */}
      <a
        href="https://docs.google.com/spreadsheets/d/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] text-black font-bold px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform text-sm md:text-base"
        style={{ boxShadow: '0 0 20px rgba(212,175,55,0.5)' }}
      >
        📋 カリキュラム詳細
      </a>

      {/* ═══ Screen 1: The Hook ═══ */}
      <Screen className="bg-black">
        <CodeRain />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-10" />

        <div className="relative z-20 flex flex-col items-center px-6 text-center">
          {/* Portrait */}
          <motion.div
            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/20 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={yukawaPortrait} alt="湯川鶴章" className="w-full h-full object-cover" />
          </motion.div>

          {/* Typewriter text */}
          <div className="text-xl md:text-3xl font-bold leading-relaxed min-h-[5rem]">
            <Typewriter text="AIに魂を売るか。" delay={1000} speed={120} />
            <br />
            <Typewriter text="AIを魂の依代（よりしろ）にするか。" delay={4000} speed={100} />
          </div>

          {/* Swipe hint */}
          <motion.div
            className="absolute bottom-12 flex flex-col items-center text-white/50 text-sm"
            animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
            transition={{ duration: 2, repeat: Infinity, delay: 7 }}
          >
            <span>▲</span>
            <span>スワイプして運命を変える</span>
          </motion.div>
        </div>
      </Screen>

      {/* ═══ Screen 2: The Agitation ═══ */}
      <Screen>
        {/* Pulsing red-black gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle, rgba(255,0,0,0.3) 0%, #000 70%)',
              'radial-gradient(circle, rgba(255,0,0,0.1) 0%, #000 50%)',
              'radial-gradient(circle, rgba(255,0,0,0.3) 0%, #000 70%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative z-10 px-6 text-center max-w-2xl">
          <FadeInView>
            <p className="text-xl md:text-3xl font-bold mb-10 leading-relaxed">
              偽物のスキルに、<br />
              あといくら<span className="text-red-500">ドブに捨てますか？</span>
            </p>
          </FadeInView>

          <div className="mb-10">
            <SlashItem text="100万円の学校" delay={0.3} />
            <SlashItem text="50万円のコーチング" delay={0.8} />
            <SlashItem text="無意味なAI資格" delay={1.3} />
          </div>

          <FadeInView delay={2}>
            <div className="text-sm md:text-base text-gray-500 space-y-1">
              <p>✗ ツールを覚えただけで満足する人</p>
              <p>✗ 「AIで副業」に飛びつく人</p>
              <p>✗ プロンプトを暗記する人</p>
              <p>✗ 本質を見ずに表面だけ追う人</p>
              <p className="text-red-400 font-semibold mt-3">→ AIの奴隷で終わる</p>
            </div>
          </FadeInView>
        </div>
      </Screen>

      {/* ═══ Screen 3: The Solution - Person ═══ */}
      <Screen>
        {/* Glitch-like transition bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black to-black" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Aura behind portrait */}
          <div className="relative">
            <motion.div
              className="absolute -inset-8 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-[#D4AF37]/30 relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img src={natsumotoPortrait} alt="夏本健司 - 講師" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <FadeInView delay={0.5} className="mt-8 max-w-xl">
            <p className="text-lg md:text-2xl font-bold leading-relaxed">
              異能・<span className="text-[#D4AF37]">夏本健司</span>。<br />
              彼が提唱する「AS-IS / TO-BE」の完全統合が、<br />
              <span className="text-red-400">唯一の出口だ。</span>
            </p>
          </FadeInView>
        </div>
      </Screen>

      {/* ═══ Screen 4: The Solution - Method ═══ */}
      <Screen>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

        <div className="relative z-10 px-6 text-center max-w-2xl">
          <FadeInView>
            <p className="text-lg md:text-2xl font-bold mb-10 leading-relaxed">
              現在地を知り、未来へ<span className="text-[#D4AF37]">強制接続</span>する。<br />
              5つの覚醒ツール
            </p>
          </FadeInView>

          <OrbitingSphere />

          <FadeInView delay={1} className="mt-10">
            <motion.p
              className="text-3xl md:text-5xl font-black text-[#D4AF37]"
              animate={{ textShadow: ['0 0 20px #D4AF37', '0 0 40px #D4AF37', '0 0 20px #D4AF37'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              未来の記憶
            </motion.p>
            <p className="text-sm text-gray-400 mt-3">Gemini × NotebookLM で視覚化</p>
          </FadeInView>
        </div>
      </Screen>

      {/* ═══ Screen 5: The Opportunity - Evidence ═══ */}
      <Screen>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />

        <div className="relative z-10 px-6 text-center max-w-2xl">
          <FlashingApps />

          <FadeInView delay={0.5} className="mt-10">
            <p className="text-lg md:text-2xl font-bold leading-relaxed">
              わずか半年で召喚された<span className="text-[#D4AF37]">15</span>の「未来の記憶」。<br />
              次は、<span className="text-red-400">あなた</span>の番だ。
            </p>
          </FadeInView>

          <FadeInView delay={1}>
            <motion.div
              className="mt-8 inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-xl px-6 py-3 text-[#D4AF37] font-bold text-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              月額15万円の収益モデル
            </motion.div>
          </FadeInView>
        </div>
      </Screen>

      {/* ═══ Screen 6: Urgency ═══ */}
      <Screen className="bg-black">
        <div className="relative z-10 px-6 text-center max-w-2xl">
          <div className="text-6xl md:text-8xl font-black mb-6">
            ¥<AnimatedCounter target={300000} duration={2500} />
          </div>

          <FadeInView delay={2.8}>
            <motion.p
              className="text-xl md:text-2xl font-bold text-[#D4AF37] border-2 border-[#D4AF37] inline-block px-6 py-3 rounded-lg"
              initial={{ rotate: -5 }}
              animate={{ rotate: [-5, 0, -5] }}
              transition={{ duration: 0.5 }}
            >
              先着10名限定：湯川塾・関係者優待
            </motion.p>
          </FadeInView>

          <FadeInView delay={3.5} className="mt-10">
            <p className="text-base md:text-xl leading-relaxed text-gray-300">
              生涯価値を変える投資。<br />
              <span className="text-white font-bold text-2xl">30万円。</span><br />
              <span className="text-red-400 text-sm">これを高いと思うなら、今すぐ画面を閉じろ。</span>
            </p>
          </FadeInView>
        </div>
      </Screen>

      {/* ═══ Screen 7: The Action - Closing ═══ */}
      <Screen>
        <CodeRain />
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 flex flex-col items-center px-6 text-center">
          {/* Clean portrait */}
          <motion.div
            className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 mb-8"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img src={yukawaPortrait} alt="湯川鶴章" className="w-full h-full object-cover" />
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href="#apply"
            className="bg-red-600 text-white font-black text-lg md:text-xl px-8 py-5 rounded-2xl inline-block relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{ boxShadow: '0 0 40px rgba(255,0,0,0.4)' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative z-10">先着10名：未来の記憶を掴む<br className="md:hidden" />（優待枠で申し込む）</span>
          </motion.a>

          {/* Scrolling ticker */}
          <div className="absolute bottom-8 left-0 right-0 px-4">
            <ScrollingTicker text="【追伸：湯川鶴章より】 AIの波に飲まれ、使いこなせずに絶望する人を山のように見てきた。あなたには、絶対にそうなってほしくない。そのままモブとして消費される前に、こちら側へ来い。" />
          </div>
        </div>
      </Screen>
    </div>
  );
};

export default SuperVibeCodingV2;
