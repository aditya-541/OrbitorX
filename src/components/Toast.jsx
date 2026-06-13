import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      delete timersRef.current[id];
    }, 300);
  }, []);

  const addToast = useCallback(
    (message, type) => {
      const id = ++idCounter;
      setToasts((prev) => {
        const next = [...prev, { id, message, type, exiting: false }];
        // keep max 3 visible — drop oldest if exceeded
        if (next.length > 3) {
          const removed = next.shift();
          clearTimeout(timersRef.current[removed.id]);
          delete timersRef.current[removed.id];
        }
        return next;
      });
      timersRef.current[id] = setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);
  const info = useCallback((msg) => addToast(msg, 'info'), [addToast]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

// ── icons ────────────────────────────────────────────────────────────────────

function IconSuccess() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconError() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="rgba(255,80,80,0.6)" strokeWidth="1.5" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="rgba(255,100,100,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path
        d="M8 7v4"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="0.75" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M1 1l10 10M11 1L1 11"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── border accent per type ────────────────────────────────────────────────────

const borderColor = {
  success: 'rgba(255,255,255,0.8)',
  error: 'rgba(255,60,60,0.4)',
  info: 'rgba(255,255,255,0.2)',
};

const icons = {
  success: <IconSuccess />,
  error: <IconError />,
  info: <IconInfo />,
};

// ── single toast ──────────────────────────────────────────────────────────────

function Toast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger enter on next frame
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const translateX = toast.exiting || !visible ? '100%' : '0%';
  const opacity = toast.exiting || !visible ? 0 : 1;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        transform: `translateX(${translateX})`,
        opacity,
        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '12px 14px',
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: `3px solid ${borderColor[toast.type]}`,
        borderRadius: '8px',
        color: 'rgba(255,255,255,0.9)',
        fontSize: '14px',
        lineHeight: '1.45',
        maxWidth: '340px',
        width: '340px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: '1px' }}>{icons[toast.type]}</span>
      <span style={{ flex: 1, wordBreak: 'break-word' }}>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        style={{
          flexShrink: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2px',
          borderRadius: '3px',
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <IconClose />
      </button>
    </div>
  );
}

// ── container ─────────────────────────────────────────────────────────────────

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
          <Toast toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
