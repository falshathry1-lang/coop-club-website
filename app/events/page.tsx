import AnimatedSection from '@/components/AnimatedSection';
import CountdownTimer from '@/components/CountdownTimer';
import eventsData from '@/data/events.json';

type Event = {
  id: number;
  title: string;
  titleAr?: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  category: string;
  image: string;
};

const categoryColors: Record<string, string> = {
  'Training Journey': 'bg-blue-100 text-blue-700',
  Milestone: 'bg-amber-100 text-amber-700',
  'Graduate Dialogue': 'bg-violet-100 text-violet-700',
  Tamayuz: 'bg-emerald-100 text-emerald-700',
};

const categoryAr: Record<string, string> = {
  'Training Journey': 'رحلة التدريب',
  Milestone: 'إنجاز',
  'Graduate Dialogue': 'حوار الخريجين',
  Tamayuz: 'تميز',
};

const arabicMonths = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

export default function EventsPage() {
  const events = eventsData as Event[];
  const upcoming = events.filter((e) => e.type === 'upcoming');
  const past = events.filter((e) => e.type === 'past');

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
        <div className="blob absolute -top-16 -left-16 w-72 h-72 bg-cyan-100/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">ما الجاري</p>
            <h1 className="section-heading text-slate-900 mb-6">
              <span className="text-gradient">الفعاليات</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              من رحلات التدريب إلى حوار الخريجين — ابقَ على اطلاع بكل ما يدور في نادي التدريب التعاوني.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                الفعاليات القادمة
              </h2>
            </AnimatedSection>
            <div className="space-y-6">
              {upcoming.map((event, i) => {
                const d = new Date(event.date);
                return (
                  <AnimatedSection key={event.id} delay={i * 0.1}>
                    <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl p-4 text-center min-w-[80px]">
                          <div className="text-2xl font-black leading-none">{d.getDate()}</div>
                          <div className="text-blue-200 text-xs font-semibold mt-0.5">{arabicMonths[d.getMonth()]}</div>
                          <div className="text-blue-200 text-xs">{d.getFullYear()}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${categoryColors[event.category] ?? 'bg-slate-100 text-slate-600'}`}>
                              {categoryAr[event.category] ?? event.category}
                            </span>
                            <span className="text-slate-400 text-xs">{event.time} · {event.location}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{event.titleAr ?? event.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <CountdownTimer targetDate={`${event.date}T${event.time}:00`} />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-2xl font-black text-slate-900">الفعاليات السابقة</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((event, i) => {
                const d = new Date(event.date);
                return (
                  <AnimatedSection key={event.id} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm card-hover h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-slate-100 rounded-lg p-2.5 text-center min-w-[52px]">
                          <div className="text-lg font-black text-slate-700 leading-none">{d.getDate()}</div>
                          <div className="text-slate-400 text-xs">{arabicMonths[d.getMonth()].slice(0,3)} {String(d.getFullYear()).slice(2)}</div>
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-1 leading-tight">{event.titleAr ?? event.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{event.description}</p>
                      <p className="text-slate-400 text-xs mt-3 flex items-center gap-1">
                        <span>📍</span> {event.location}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
