'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [inView, count, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { label: 'عضو نشط', value: 200, suffix: '+', icon: '👥' },
  { label: 'شريك مؤسسي', value: 20, suffix: '+', icon: '🏢' },
  { label: 'فعالية منظمة', value: 30, suffix: '+', icon: '📅' },
];

export default function StatsCounter() {
  return (
    <section className="py-12 bg-gradient-to-l from-blue-600 to-indigo-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center text-white"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black mb-1">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-blue-200 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
