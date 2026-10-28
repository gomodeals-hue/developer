import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  default: "bg-[#f76e28] text-white hover:bg-[#de5713] active:bg-[#c44908] shadow-xs hover:shadow-md hover:shadow-orange-500/20",
  primary: "bg-[#f76e28] text-white hover:bg-[#de5713] active:bg-[#c44908] shadow-xs hover:shadow-md hover:shadow-orange-500/20",
  secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 active:bg-stone-300 border border-stone-200/80",
  outline: "border border-stone-200 bg-white hover:bg-stone-50 hover:border-orange-300 text-stone-800 shadow-2xs",
  ghost: "text-stone-700 hover:bg-stone-100 hover:text-stone-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs",
  destructive: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs",
  subtle: "bg-orange-50 text-orange-700 hover:bg-orange-100 active:bg-orange-200 border border-orange-200/80"
};

const buttonSizes = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  default: "h-10 px-4 py-2 text-sm rounded-xl gap-2",
  md: "h-10 px-4 py-2 text-sm rounded-xl gap-2",
  lg: "h-12 px-6 text-base font-bold rounded-xl gap-2.5",
  icon: "h-10 w-10 p-0 rounded-xl justify-center",
  "icon-sm": "h-8 w-8 p-0 rounded-lg justify-center",
  "icon-lg": "h-12 w-12 p-0 rounded-xl justify-center"
};

export const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  type = "button",
  ...props 
}, ref) => {
  const variantClass = buttonVariants[variant] || buttonVariants.default;
  const sizeClass = buttonSizes[size] || buttonSizes.default;

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-semibold select-none cursor-pointer",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
