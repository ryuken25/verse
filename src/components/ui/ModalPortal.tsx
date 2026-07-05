'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPortal({ children, isOpen, onClose }: ModalPortalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  // Create container on mount
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.createElement('div');
    el.id = 'verse-modal-portal';
    document.body.appendChild(el);
    elRef.current = el;
    return () => { document.body.removeChild(el); };
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !elRef.current) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overscroll-contain min-h-dvh"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>,
    elRef.current
  );
}
