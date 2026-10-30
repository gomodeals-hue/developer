import React, { useState } from 'react';

/**
 * TailGrids / Modern Avatar Primitive Components
 */

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-14 w-14 text-lg'
};

export const AvatarContext = React.createContext({
  size: 'md',
  hasImageLoaded: false,
  setHasImageLoaded: () => {}
});

export function Avatar({ size = 'md', className = '', children, ...props }) {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <AvatarContext.Provider value={{ size, hasImageLoaded, setHasImageLoaded }}>
      <div
        className={`relative inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-white overflow-hidden bg-stone-150 select-none shadow-2xs ${sizeClasses[size] || sizeClasses.md} ${className}`}
        {...props}
      >
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({ src, alt = '', className = '', ...props }) {
  const { setHasImageLoaded } = React.useContext(AvatarContext);
  const [error, setError] = useState(false);

  if (!src || error) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setHasImageLoaded(true)}
      onError={() => {
        setError(true);
        setHasImageLoaded(false);
      }}
      className={`h-full w-full object-cover object-center ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = '', children, ...props }) {
  const { hasImageLoaded } = React.useContext(AvatarContext);

  if (hasImageLoaded) {
    return null;
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-stone-100 text-stone-700 font-semibold tracking-wider uppercase ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarGroup({ className = '', children, 'aria-label': ariaLabel = 'Avatar group', ...props }) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex items-center -space-x-2.5 sm:-space-x-3 overflow-hidden p-0.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarGroupCount({ className = '', children = '5+', ...props }) {
  return (
    <div
      className={`relative z-10 flex items-center justify-center rounded-full bg-stone-900 text-white font-bold text-xs ring-2 ring-white h-10 px-2.5 min-w-[40px] shadow-2xs select-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Avatar;

