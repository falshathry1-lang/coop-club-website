'use client';

import { useState } from 'react';

/* ─── Room definitions ──────────────────────────────────────────── */
const ROOMS = [
  {
    id: 'cs',
    name: 'Computer Science',
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
    glow: 'hover:shadow-cyan-500/30',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500',
  },
  {
    id: 'law',
    name: 'Law',
    gradient: 'from-purple-500 to-violet-700',
    border: 'border-purple-500/50',
    text: 'text-purple-400',
    glow: 'hover:shadow-purple-500/30',
    bg: 'bg-purple-500/10',
    ring: 'ring-purple-500',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    gradient: 'from-orange-400 to-amber-500',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
    glow: 'hover:shadow-orange-500/30',
    bg: 'bg-orange-500/10',
    ring: 'ring-orange-500',
  },
  {
    id: 'finance',
    name: 'Finance',
    gradient: 'from-emerald-400 to-green-600',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
    glow: 'hover:shadow-emerald-500/30',
    bg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500',
  },
  {
    id: 'aviation',
    name: 'Aviation',
    gradient: 'from-sky-400 to-blue-700',
    border: 'border-sky-400/50',
    text: 'text-sky-400',
    glow: 'hover:shadow-sky-400/30',
    bg: 'bg-sky-500/10',
    ring: 'ring-sky-400',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    gradient: 'from-rose-500 to-red-700',
    border: 'border-rose-500/50',
    text: 'text-rose-400',
    glow: 'hover:shadow-rose-500/30',
    bg: 'bg-rose-500/10',
    ring: 'ring-rose-500',
  },
] as const;

type Room = (typeof ROOMS)[number];

type Player = { name: string; universityId: string };

type SuccessData = {
  room: Room;
  players: Player[];
  timestamp: string;
};

/* ─── Main page ─────────────────────────────────────────────────── */
export default function EscapeRegistrationPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  function handleRoomSelect(room: Room) {
    setSelectedRoom(room);
    setSuccess(null);
  }

  function handleSuccess(data: SuccessData) {
    setSuccess(data);
    setSelectedRoom(null);
  }

  function resetAll() {
    setSelectedRoom(null);
    setSuccess(null);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/5 bg-black/60 py-10 px-4 text-center">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-violet-700/20 blur-3xl rounded-full" />
        </div>

        <div className="relative">
          {/* Back button */}
          {(selectedRoom || success) && (
            <button
              onClick={resetAll}
              className="absolute left-0 top-0 flex items-center gap-1.5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              ← Rooms
            </button>
          )}

          <p className="text-xs font-bold tracking-[0.3em] uppercase text-violet-400 mb-2">
            COOP Club · Escape Room Event
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
            Escape{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
              Failure 2.0
            </span>
          </h1>
          <p className="text-gray-400 font-semibold text-base">
            Player Registration &nbsp;·&nbsp;{' '}
            <span className="text-gray-300">April 1–2, 2026</span>
          </p>
        </div>
      </header>

      {/* ── Content ──────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {success ? (
          <SuccessScreen data={success} onReset={resetAll} />
        ) : selectedRoom ? (
          <RegistrationForm
            room={selectedRoom}
            onBack={() => setSelectedRoom(null)}
            onSuccess={handleSuccess}
          />
        ) : (
          <RoomGrid onSelect={handleRoomSelect} />
        )}
      </main>

      {/* ── Hidden admin link ─────────────────────────────────────── */}
      <div className="pb-8 text-center">
        <a
          href="https://formspree.io/forms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-gray-700 hover:text-gray-500 transition-colors"
        >
          View All Registrations
        </a>
      </div>
    </div>
  );
}

/* ─── Room grid ─────────────────────────────────────────────────── */
function RoomGrid({ onSelect }: { onSelect: (room: Room) => void }) {
  return (
    <div>
      <p className="text-center text-gray-400 text-sm mb-8 font-medium uppercase tracking-widest">
        Select a Room to Register
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelect(room)}
            className={`
              relative group overflow-hidden rounded-2xl border ${room.border}
              bg-white/5 backdrop-blur-sm p-6 sm:p-8 text-center
              transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${room.glow}
              active:scale-[0.98]
            `}
          >
            {/* gradient top bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${room.gradient}`} />
            {/* ambient bg on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${room.bg} rounded-2xl`} />

            <span className={`relative font-black text-lg sm:text-xl leading-tight ${room.text}`}>
              {room.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Registration form ─────────────────────────────────────────── */
function RegistrationForm({
  room,
  onBack,
  onSuccess,
}: {
  room: Room;
  onBack: () => void;
  onSuccess: (data: SuccessData) => void;
}) {
  const [teamSize, setTeamSize] = useState(2);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 4 }, () => ({ name: '', universityId: '' }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function updatePlayer(index: number, field: keyof Player, value: string) {
    setPlayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const activePlayers = players.slice(0, teamSize);
    const missingName = activePlayers.some((p) => !p.name.trim());
    if (missingName) {
      setError('Please enter a name for every player.');
      return;
    }

    setLoading(true);

    const payload: Record<string, string> = {
      _subject: `Escape Failure 2.0 — ${room.name} — ${teamSize} Player${teamSize > 1 ? 's' : ''}`,
      room: room.name,
      teamSize: String(teamSize),
    };
    activePlayers.forEach((p, i) => {
      payload[`player${i + 1}_name`] = p.name.trim();
      if (p.universityId.trim()) {
        payload[`player${i + 1}_universityId`] = p.universityId.trim();
      }
    });

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (!formspreeId) throw new Error('Formspree not configured.');

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed.');

      onSuccess({
        room,
        players: activePlayers,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Room label */}
      <div className="mb-8 text-center">
        <div className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${room.gradient} text-white font-black text-lg shadow-lg`}>
          {room.name}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team size */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
            Team Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setTeamSize(n)}
                className={`
                  py-3 rounded-xl font-black text-lg transition-all duration-200
                  ${teamSize === n
                    ? `bg-gradient-to-br ${room.gradient} text-white shadow-lg ring-2 ${room.ring} ring-offset-2 ring-offset-gray-950`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }
                `}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Player fields */}
        <div className="space-y-4">
          {Array.from({ length: teamSize }).map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${room.border} bg-white/5 p-4`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${room.text} mb-3`}>
                Player {i + 1}
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full name *"
                  required
                  value={players[i].name}
                  onChange={(e) => updatePlayer(i, 'name', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="University ID (optional)"
                  value={players[i].universityId}
                  onChange={(e) => updatePlayer(i, 'universityId', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-rose-400 text-sm font-medium text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-4 rounded-2xl font-black text-base text-white
            bg-gradient-to-r ${room.gradient}
            shadow-lg transition-all duration-200
            hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
          `}
        >
          {loading ? 'Registering…' : 'Register Team →'}
        </button>
      </form>
    </div>
  );
}

/* ─── Success screen ─────────────────────────────────────────────── */
function SuccessScreen({ data, onReset }: { data: SuccessData; onReset: () => void }) {
  const { room, players, timestamp } = data;

  return (
    <div className="max-w-sm mx-auto text-center">
      {/* Icon */}
      <div className="text-6xl mb-6">🔐</div>

      <div className={`rounded-3xl border ${room.border} bg-white/5 backdrop-blur-sm p-8 mb-6`}>
        {/* Badge */}
        <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${room.gradient} text-white text-xs font-black uppercase tracking-widest mb-4`}>
          {room.name}
        </div>

        <h2 className="text-2xl font-black text-white mb-1">Team Registered!</h2>
        <p className="text-gray-500 text-xs mb-6">Registered at {timestamp}</p>

        {/* Players */}
        <div className="space-y-2 text-left">
          {players.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3"
            >
              <span className={`text-xs font-black ${room.text} w-6 shrink-0`}>
                P{i + 1}
              </span>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{p.name}</p>
                {p.universityId && (
                  <p className="text-gray-500 text-xs">ID: {p.universityId}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 rounded-2xl font-black text-base bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        Register Another Team
      </button>
    </div>
  );
}
