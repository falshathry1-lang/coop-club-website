'use client';

import { useEffect, useState } from 'react';

interface Props { targetDate: string; }

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

function calculate(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const labels: Record<string, string> = {
  days: 'يوم',
  hours: 'ساعة',
  minutes: 'دقيقة',
  seconds: 'ثانية',
};

export default function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculate(targetDate));
    const id = setInterval(() => setTimeLeft(calculate(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) return <span className="text-emerald-600 font-bold text-sm">الفعالية جارية الآن!</span>;

  return (
    <div className="flex gap-2" dir="rtl">
      {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
        <div key={unit} className="text-center bg-blue-600 text-white rounded-lg px-2 py-1.5 min-w-[44px]">
          <div className="text-lg font-black leading-none">{String(timeLeft[unit]).padStart(2, '0')}</div>
          <div className="text-blue-200 text-[9px] mt-0.5">{labels[unit]}</div>
        </div>
      ))}
    </div>
  );
}
