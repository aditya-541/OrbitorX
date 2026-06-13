import { useState, useEffect, useCallback } from 'react';

const YEARS = ['All', '2024', '2023', '2022'];
const TYPES = ['All', 'Hackathon', 'Conference', 'Workshop', 'Pitch'];

function classifyType(event) {
  const text = `${event.title} ${event.subtitle}`.toLowerCase();
  if (text.includes('hackathon') || text.includes('hack')) return 'Hackathon';
  if (text.includes('conference') || text.includes('conf') || text.includes('summit') || text.includes('forum') || text.includes('fest')) return 'Conference';
  if (text.includes('workshop') || text.includes('intensive') || text.includes('meetup')) return 'Workshop';
  if (text.includes('pitch') || text.includes('battle') || text.includes('funding')) return 'Pitch';
  return 'Conference';
}

export default function GalleryFilter({ events = [], onChange }) {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('All');
  const [type, setType] = useState('All');

  const applyFilters = useCallback(() => {
    let result = events;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q) ||
          e.subtitle?.toLowerCase().includes(q)
      );
    }

    if (year !== 'All') {
      result = result.filter((e) => String(e.year) === year);
    }

    if (type !== 'All') {
      result = result.filter((e) => classifyType(e) === type);
    }

    onChange?.(result);
  }, [events, search, year, type, onChange]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const hasActiveFilters = search.trim() !== '' || year !== 'All' || type !== 'All';

  const clearAll = () => {
    setSearch('');
    setYear('All');
    setType('All');
  };

  const filteredCount = (() => {
    let result = events;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q) ||
          e.subtitle?.toLowerCase().includes(q)
      );
    }
    if (year !== 'All') result = result.filter((e) => String(e.year) === year);
    if (type !== 'All') result = result.filter((e) => classifyType(e) === type);
    return result.length;
  })();

  return (
    <div className="w-full space-y-4 py-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events, locations..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-sm pl-9 pr-4 py-2 text-white/60 placeholder-white/20 text-xs font-mono tracking-wide focus:outline-none focus:border-white/30 focus:text-white transition-colors duration-200"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Year filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase font-mono mr-1">Year</span>
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-3 py-1 rounded-sm border text-[10px] font-mono tracking-widest uppercase transition-colors duration-200 ${
              year === y
                ? 'border-white/40 text-white bg-white/5'
                : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase font-mono mr-1">Type</span>
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1 rounded-sm border text-[10px] font-mono tracking-widest uppercase transition-colors duration-200 ${
              type === t
                ? 'border-white/40 text-white bg-white/5'
                : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Footer row: result count + clear */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
        <p className="text-white/25 text-[9px] font-mono tracking-[0.25em] uppercase">
          Showing{' '}
          <span className={filteredCount > 0 ? 'text-white/50' : 'text-white/25'}>
            {filteredCount}
          </span>{' '}
          of {events.length} events
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-white/30 hover:text-white/60 text-[9px] font-mono tracking-widest uppercase transition-colors duration-200 underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
