import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
  });
}

/** Generate a deterministic gradient class pair based on a string seed */
export function getPostGradient(id: string): string {
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-blue-600 to-violet-500',
    'from-cyan-500 to-blue-500',
    'from-indigo-500 to-blue-400',
    'from-violet-500 to-blue-500',
    'from-blue-500 to-indigo-600',
    'from-sky-500 to-blue-600',
    'from-blue-400 to-cyan-600',
  ];
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    event: 'bg-blue-100 text-blue-700',
    milestone: 'bg-amber-100 text-amber-700',
    announcement: 'bg-violet-100 text-violet-700',
    partner: 'bg-emerald-100 text-emerald-700',
    general: 'bg-slate-100 text-slate-600',
  };
  return map[category] ?? 'bg-slate-100 text-slate-600';
}
