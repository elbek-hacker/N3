type IconProps = {
  w?: number;
  h?: number;
  className?: string;
};

export const HomeIcon = ({ w = 20, h = 20, className }: IconProps) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M3 11L12 4l9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
);

export const ProductIcon = ({ w = 20, h = 20, className }: IconProps) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

export const CategoryIcon = ({ w = 20, h = 20, className }: IconProps) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M3 7h5l2 2h11v11H3z" />
  </svg>
);

export const UsersIcon = ({ w = 20, h = 20, className }: IconProps) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <circle cx="9" cy="7" r="4" />
    <path d="M17 11c2.5 0 4 2 4 4v2h-6" />
    <path d="M2 21v-2c0-2 2.5-4 6-4s6 2 6 4v2z" />
  </svg>
);