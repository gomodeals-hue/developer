'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Undo2, Trash2 } from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { cn } from '../../lib/utils';

// Native resize observer bounds hook for smooth spring width animation
function useMeasure() {
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.width > 0) {
          setBounds({ width: Math.ceil(rect.width), height: Math.ceil(rect.height) });
        }
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, bounds];
}

// Letter-by-letter spring text animator matching Watermelon UI
function AnimatedText({ text, className, delayStep = 0.012 }) {
  const chars = String(text).split('');

  return (
    <span className={className} style={{ display: 'inline-flex' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          style={{ display: 'inline-flex', willChange: 'transform' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 8,
                opacity: 0,
                scale: 0.6,
                filter: 'blur(2px)',
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                y: -8,
                opacity: 0,
                scale: 0.6,
                filter: 'blur(2px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 16,
                mass: 1.1,
                delay: i * delayStep,
              }}
              style={{
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * TimedUndoAction Component
 * Animated timed undo button that triggers a countdown timer before a destructive action executes.
 */
export const TimedUndoAction = ({
  initialSeconds = 4,
  deleteLabel = 'Remove',
  undoLabel = 'Cancel',
  icon,
  deleteIcon,
  onDelete,
  onUndo,
  size = 'sm', // 'xs' | 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [countDown, setCountDown] = useState(initialSeconds);
  const [measureRef, bounds] = useMeasure();
  const onDeleteRef = useRef(onDelete);
  const onUndoRef = useRef(onUndo);

  useEffect(() => {
    onDeleteRef.current = onDelete;
    onUndoRef.current = onUndo;
  }, [onDelete, onUndo]);

  const handleClick = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (!isDeleting) {
      // Start deleting countdown
      setIsDeleting(true);
      setCountDown(initialSeconds);
    } else {
      // Undo / cancel deletion
      setIsDeleting(false);
      setCountDown(initialSeconds);
      if (onUndoRef.current) {
        onUndoRef.current();
      }
    }
  };

  useEffect(() => {
    if (!isDeleting) return;

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDeleting(false);
          // Action officially finalized!
          if (onDeleteRef.current) {
            onDeleteRef.current();
          }
          return initialSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isDeleting, initialSeconds]);

  // Size styling configurations
  const sizeStyles = {
    xs: {
      padding: isDeleting ? 'px-2 py-1' : 'px-2.5 py-1',
      gap: 'gap-1.5',
      text: 'text-[11px] font-bold tracking-tight',
      badge: 'px-1.5 py-0.5 text-[10px] font-black',
      iconBox: 'p-1',
      iconSize: 11,
      delIconSize: 11,
    },
    sm: {
      padding: isDeleting ? 'px-2.5 py-1.5' : 'px-3 py-1.5',
      gap: 'gap-2',
      text: 'text-xs font-bold tracking-tight',
      badge: 'px-2 py-0.5 text-[11px] font-black',
      iconBox: 'p-1.5',
      iconSize: 13,
      delIconSize: 12,
    },
    md: {
      padding: isDeleting ? 'px-3 py-2' : 'px-4 py-2',
      gap: 'gap-2.5',
      text: 'text-sm font-bold',
      badge: 'px-2.5 py-1 text-xs font-black',
      iconBox: 'p-2',
      iconSize: 15,
      delIconSize: 14,
    },
    lg: {
      padding: isDeleting ? 'px-4 py-3' : 'px-6 py-3',
      gap: 'gap-3',
      text: 'text-base font-bold',
      badge: 'px-3 py-1 text-sm font-black',
      iconBox: 'p-2.5',
      iconSize: 18,
      delIconSize: 16,
    },
  }[size] || sizeStyles.sm;

  return (
    <div className={cn("inline-flex items-center font-sans select-none", className)}>
      <MotionConfig
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
      >
        <motion.button
          type="button"
          onClick={handleClick}
          animate={{
            width: bounds.width > 0 ? bounds.width : 'auto',
          }}
          className={cn(
            'relative inline-flex items-center justify-start overflow-hidden rounded-full transition-colors duration-300 cursor-pointer shadow-xs border',
            isDeleting
              ? 'bg-rose-50 text-rose-700 border-rose-300/80 shadow-rose-500/10'
              : 'bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border-stone-200 hover:border-rose-200'
          )}
          title={isDeleting ? 'Click to cancel deletion' : deleteLabel}
        >
          <div
            ref={measureRef}
            className={cn(
              'flex items-center justify-center whitespace-nowrap',
              sizeStyles.gap,
              sizeStyles.padding
            )}
          >
            {/* Animated Undo Icon (shown during deleting) */}
            <AnimatePresence mode="popLayout">
              {isDeleting ? (
                <motion.div
                  key="undo-icon"
                  className={cn("rounded-full bg-rose-600 text-white shrink-0 shadow-xs flex items-center justify-center", sizeStyles.iconBox)}
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
                >
                  {icon ?? <Undo2 size={sizeStyles.iconSize} strokeWidth={2.6} />}
                </motion.div>
              ) : (
                <motion.div
                  key="del-icon"
                  className="shrink-0 text-stone-400 group-hover:text-rose-600 transition-colors"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  {deleteIcon ?? <Trash2 size={sizeStyles.delIconSize} strokeWidth={2} />}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Morphing Animated Text */}
            <div className="flex items-center justify-center">
              <AnimatedText
                text={isDeleting ? undoLabel : deleteLabel}
                className={cn(
                  'z-10 leading-none select-none font-bold',
                  sizeStyles.text,
                  isDeleting ? 'text-rose-700' : 'text-stone-700'
                )}
              />
            </div>

            {/* Countdown Badge with Vertical Sliding Digit Animation */}
            <AnimatePresence mode="popLayout">
              {isDeleting && (
                <motion.div
                  key="countdown-badge"
                  className={cn(
                    "flex items-center justify-center rounded-full bg-rose-600 text-white tabular-nums shrink-0 shadow-xs leading-none",
                    sizeStyles.badge
                  )}
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={countDown}
                      initial={{
                        opacity: 0,
                        y: -14,
                        filter: 'blur(2px)',
                        scale: 0.6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 14,
                        filter: 'blur(2px)',
                        scale: 0.6,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 20,
                        mass: 0.9,
                      }}
                      className="inline-block"
                    >
                      {countDown}s
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </MotionConfig>
    </div>
  );
};

export function TimedUndoActionDemo() {
  return (
    <TimedUndoAction
      initialSeconds={4}
      deleteLabel="Remove"
      undoLabel="Cancel"
    />
  );
}

export default TimedUndoAction;
