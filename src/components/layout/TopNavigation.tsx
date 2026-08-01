import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { topNavigation } from '@/data/navigation';
import type { NavGroup, NavChild } from '@/data/navigation';

// Dropdown Portal Component
function DropdownPortal({ 
  group, 
  buttonRef, 
  isOpen, 
  onClose, 
  onNavigate, 
  currentPage 
}: {
  group: NavGroup;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Synchronize Portal Position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const updatePosition = () => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setStyle({
          position: 'fixed',
          top: `${rect.bottom + 2}px`, // Slight offset
          left: `${rect.left}px`,
          zIndex: 100 // --z-dropdown
        });
      };
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, buttonRef]);

  // Click Outside & Escape Logic
  useEffect(() => {
    if (!isOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      // Allow click if it's inside the dropdown
      if (dropdownRef.current?.contains(e.target as Node)) return;
      // Allow click if it's the toggle button itself (handled by button's onClick)
      if (buttonRef.current?.contains(e.target as Node)) return;
      
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        buttonRef.current?.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, buttonRef]);

  // Keyboard Arrow Navigation inside Dropdown
  const handleDropdownKeyDown = (e: React.KeyboardEvent, childPage: string, index: number) => {
    const buttons = dropdownRef.current?.querySelectorAll('button');
    if (!buttons) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = buttons[index + 1] || buttons[0];
      (next as HTMLButtonElement).focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = buttons[index - 1] || buttons[buttons.length - 1];
      (prev as HTMLButtonElement).focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      (buttons[0] as HTMLButtonElement).focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      (buttons[buttons.length - 1] as HTMLButtonElement).focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(childPage);
    } else if (e.key === 'Tab') {
      // Let tab navigate naturally, but close dropdown if leaving
      // Or just close it immediately to prevent focus leaving the portal weirdly
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.12 }}
        style={style}
        className="w-64 bg-[var(--color-gfs-deep)] border border-[var(--color-gfs-border)] rounded-lg shadow-xl py-1"
        onMouseLeave={onClose}
      >
        {group.children.map((child, index) => {
          const isActive = currentPage === child.page;
          return (
            <button
              key={child.id}
              onClick={() => onNavigate(child.page)}
              onKeyDown={(e) => handleDropdownKeyDown(e, child.page, index)}
              className={`w-full px-3 py-2 text-left transition-colors flex flex-col gap-0.5 focus:outline-none focus:bg-[var(--color-gfs-hover)] hover:bg-[var(--color-gfs-hover)] ${
                isActive ? 'bg-[var(--color-gfs-accent-dim)] border-l-2 border-[var(--color-gfs-accent)]' : 'border-l-2 border-transparent'
              }`}
            >
              <span className={`text-[11px] ${isActive ? 'text-[var(--color-gfs-accent)] font-semibold' : 'text-[var(--color-gfs-text)]'}`}>
                {child.label}
              </span>
              <span className={`text-[9px] ${isActive ? 'text-[var(--color-gfs-accent)]/80' : 'text-[var(--color-gfs-text-muted)]'}`}>
                {child.description}
              </span>
            </button>
          );
        })}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// Nav Item Component
function NavItem({ 
  group, 
  isActive, 
  isOpen, 
  onToggle, 
  onHover, 
  onLeave,
  onNavigate,
  currentPage,
  index,
  totalItems
}: { 
  group: NavGroup; 
  isActive: boolean; 
  isOpen: boolean; 
  onToggle: () => void; 
  onHover: () => void; 
  onLeave: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  index: number;
  totalItems: number;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) onToggle();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextBtn = buttonRef.current?.parentElement?.nextElementSibling?.querySelector('button');
      if (nextBtn) (nextBtn as HTMLButtonElement).focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevBtn = buttonRef.current?.parentElement?.previousElementSibling?.querySelector('button');
      if (prevBtn) (prevBtn as HTMLButtonElement).focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      const firstBtn = buttonRef.current?.parentElement?.parentElement?.firstElementChild?.querySelector('button');
      if (firstBtn) (firstBtn as HTMLButtonElement).focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastBtn = buttonRef.current?.parentElement?.parentElement?.lastElementChild?.querySelector('button');
      if (lastBtn) (lastBtn as HTMLButtonElement).focus();
    }
  };

  return (
    <div 
      className="relative flex-shrink-0"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <button 
        ref={buttonRef}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-[8px] px-[12px] h-[36px] rounded-md text-[13px] font-medium transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[var(--color-gfs-accent)] focus:ring-inset ${
          isActive || isOpen
            ? 'text-[var(--color-gfs-accent)] bg-[var(--color-gfs-accent-dim)]'
            : 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)]'
        }`}
      >
        <group.icon className="w-[18px] h-[18px]" />
        {group.label}
        <ChevronDown className={`w-[14px] h-[14px] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <DropdownPortal 
        group={group}
        buttonRef={buttonRef}
        isOpen={isOpen}
        onClose={onLeave}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
    </div>
  );
}

export function TopNavigation() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const { currentPage, setCurrentPage } = useStore();

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    setActiveGroup(null);
  }, [setCurrentPage]);

  return (
    <div className="relative">
      {/* Nav bar */}
      <div className="h-9 border-b border-[var(--color-gfs-border-light)] bg-[var(--color-gfs-deep)] flex items-center px-2 overflow-x-auto overflow-y-visible">
        <div className="flex items-center" role="menubar">
          {topNavigation.map((group, index) => {
            // Check if any child route is active
            const hasActiveRoute = group.children.some(child => child.page === currentPage);
            
            return (
              <NavItem 
                key={group.id}
                group={group}
                isActive={hasActiveRoute}
                isOpen={activeGroup === group.id}
                onToggle={() => setActiveGroup(prev => prev === group.id ? null : group.id)}
                onHover={() => setActiveGroup(group.id)}
                onLeave={() => setActiveGroup(null)}
                onNavigate={handleNavigate}
                currentPage={currentPage}
                index={index}
                totalItems={topNavigation.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
