'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const ACADEMIC_YEARS = [
  'المستوى الأول',
  'المستوى الثاني',
  'المستوى الثالث',
  'المستوى الرابع',
  'المستوى الخامس',
  'المستوى السادس',
  'ما فوق',
];

const DEPARTMENTS = [
  'الموارد البشرية',
  'الرعاية والتمويل',
  'العلاقات العامة',
  'العمليات',
  'الإعلام',
  'التصميم',
  'رحلة التدريب',
  'حوار الخريجين',
  'برنامج تميز',
  'برنامج ملهم',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm text-right bg-white placeholder:text-slate-400';

const labelClass = 'block text-sm font-bold text-slate-700 mb-1.5 text-right';

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (!formspreeId) {
      setStatus('error');
      setErrorMsg('لم يتم إعداد Formspree بعد. يرجى إضافة NEXT_PUBLIC_FORMSPREE_ID في ملف .env.local');
      return;
    }

    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);

    const sheetsWebhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(Object.fromEntries(data)),
      }).catch(() => {});
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? 'خطأ في الإرسال');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا عبر إنستغرام.');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
        dir="rtl"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">تم تقديم طلبك بنجاح!</h3>
        <p className="text-slate-500 mb-6 leading-relaxed">
          شكراً لتقديمك إلى نادي التدريب التعاوني! سنراجع طلبك ونتواصل معك قريباً. تابع بريدك الإلكتروني.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline text-sm">
          تقديم طلب آخر
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">

      {/* Full Name */}
      <div>
        <label className={labelClass}>
          الاسم الكامل <span className="text-blue-500">*</span>
        </label>
        <input
          name="fullName"
          type="text"
          required
          placeholder="مثال: سارة القحطاني"
          className={inputClass}
        />
      </div>

      {/* Student ID */}
      <div>
        <label className={labelClass}>
          الرقم الجامعي <span className="text-blue-500">*</span>
        </label>
        <input
          name="studentId"
          type="text"
          required
          placeholder="مثال: 202312345"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>
          البريد الجامعي <span className="text-blue-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="مثال: student@psu.edu.sa"
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>
          رقم الجوال <span className="text-blue-500">*</span>
        </label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="مثال: 05xxxxxxxx"
          className={inputClass}
        />
      </div>

      {/* Major + Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            التخصص <span className="text-blue-500">*</span>
          </label>
          <input
            name="major"
            type="text"
            required
            placeholder="مثال: علوم الحاسب"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            المستوى الدراسي <span className="text-blue-500">*</span>
          </label>
          <select
            name="academicYear"
            required
            defaultValue=""
            className={inputClass + ' cursor-pointer'}
          >
            <option value="" disabled>اختر المستوى</option>
            {ACADEMIC_YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Department Interest */}
      <div>
        <label className={labelClass}>
          القسم المفضل <span className="text-blue-500">*</span>
        </label>
        <select
          name="departmentInterest"
          required
          defaultValue=""
          className={inputClass + ' cursor-pointer'}
        >
          <option value="" disabled>اختر القسم</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div>
        <label className={labelClass}>
          المهارات والخبرات <span className="text-blue-500">*</span>
        </label>
        <textarea
          name="skills"
          required
          rows={3}
          placeholder="اذكر مهاراتك وخبراتك ذات الصلة..."
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Why Join */}
      <div>
        <label className={labelClass}>
          لماذا تريد الانضمام إلى نادي التدريب التعاوني؟ <span className="text-blue-500">*</span>
        </label>
        <textarea
          name="whyJoin"
          required
          rows={4}
          placeholder="أخبرنا عما يجذبك إلى نادي التدريب التعاوني وما الذي تأمل في تقديمه..."
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-right">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary justify-center text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جارٍ الإرسال...
          </span>
        ) : (
          'إرسال الطلب ✦'
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        بالإرسال، توافق على التواصل معك من قِبل نادي التدريب التعاوني بشأن طلبك.
      </p>
    </form>
  );
}
