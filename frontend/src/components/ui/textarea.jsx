import React from 'react';
import { cn } from '../../lib/utils';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full rounded-xl border border-stone-200/90 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-2xs",
        "placeholder:text-stone-400 font-normal leading-relaxed",
        "transition-all duration-150 ease-out",
        "hover:border-stone-300",
        "focus-visible:outline-none focus-visible:border-orange-500 focus-visible:ring-3 focus-visible:ring-orange-500/15",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-stone-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
