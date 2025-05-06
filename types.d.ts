// Custom declarations for Next.js and other modules
declare module 'next/link' {
  import { ComponentType } from 'react';
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children?: React.ReactNode;
  }
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    prefetch: (url: string) => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module 'next/image' {
  import { ComponentType } from 'react';
  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    className?: string;
    quality?: number;
    fill?: boolean;
    style?: React.CSSProperties;
    sizes?: string;
    [key: string]: any;
  }
  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'lucide-react' {
  import { ComponentType } from 'react';
  export interface IconProps {
    color?: string;
    size?: string | number;
    className?: string;
    [key: string]: any;
  }
  export const BarChart3: ComponentType<IconProps>;
  export const Clock: ComponentType<IconProps>;
  export const Filter: ComponentType<IconProps>;
  export const LayoutDashboard: ComponentType<IconProps>;
  export const Monitor: ComponentType<IconProps>;
  export const Settings: ComponentType<IconProps>;
  export const Shield: ComponentType<IconProps>;
  export const ShieldAlert: ComponentType<IconProps>;
  export const Menu: ComponentType<IconProps>;
  export const Home: ComponentType<IconProps>;
  export const ChevronDown: ComponentType<IconProps>;
  export const AlertCircle: ComponentType<IconProps>;
  export const Activity: ComponentType<IconProps>;
  export const ArrowUpDown: ComponentType<IconProps>;
  export const X: ComponentType<IconProps>;
}

// Ensure JSX namespace is available
import React from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 