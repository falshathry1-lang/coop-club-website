'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TimelineItem {
  year: number;
  month: number;
  title: string;
  description: string;
  status?: 'done' | 'scheduled';
}

const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function formatMonthYearAr(year: number, month: number) {
  return `${arabicMonths[month - 1]} ${year}`;
}

function StatusBadge({ status }: { status?: 'done' | 'scheduled' }) {
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mb-2">
        ✓ تم
      </span>
    );
  }
  if (status === 'scheduled') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 mb-2">
        🗓 مجدول
      </span>
    );
  }
  return null;
}

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isRight = index % 2 === 0;
  const isScheduled = item.status === 'scheduled';

  const cardClass = isScheduled
    ? 'bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm max-w-xs w-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-right'
    : 'bg-white border border-blue-100 rounded-2xl p-5 shadow-sm max-w-xs w-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-right';

  const mobileCardClass = isScheduled
    ? 'md:hidden flex-1 bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm mb-2 text-right'
    : 'md:hidden flex-1 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm mb-2 text-right';

  const dotClass = isScheduled
    ? 'w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 ring-4 ring-white shadow-md mt-5'
    : 'w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 ring-4 ring-white shadow-md mt-5';

  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-1">
        <StatusBadge status={item.status} />
        <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">
          {formatMonthYearAr(item.year, item.month)}
        </p>
      </div>
      <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
    </>
  );

  const mobileCardContent = (
    <>
      <div className="flex items-center justify-between mb-1">
        <StatusBadge status={item.status} />
        <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">
          {formatMonthYearAr(item.year, item.month)}
        </p>
      </div>
      <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
    </>
  );

  return (
    <div ref={ref} className="relative flex items-start gap-4 md:gap-0">
      {/* Desktop right column */}
      <div className={`hidden md:flex w-[calc(50%-24px)] ${isRight ? 'justify-start pl-8' : 'order-3 pr-8 justify-end'}`}>
        {isRight && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cardClass}
          >
            {cardContent}
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="relative z-10 flex-shrink-0 md:w-12 flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          className={dotClass}
        />
      </div>

      {/* Desktop left column */}
      <div className={`hidden md:flex w-[calc(50%-24px)] order-3 ${isRight ? 'pr-8 justify-end' : 'pl-8 justify-start order-1'}`}>
        {!isRight && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cardClass}
          >
            {cardContent}
          </motion.div>
        )}
      </div>

      {/* Mobile card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={mobileCardClass}
      >
        {mobileCardContent}
      </motion.div>
    </div>
  );
}

export default function TimelineSection({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* Vertical line — centered */}
      <div className="absolute right-[10px] md:right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent md:translate-x-0.5" />
      <div className="flex flex-col gap-10 pr-8 md:pr-0">
        {items.map((item, i) => (
          <TimelineEntry key={`${item.year}-${item.month}-${i}`} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
