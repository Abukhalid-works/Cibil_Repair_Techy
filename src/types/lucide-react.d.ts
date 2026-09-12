declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;
  
  export const ShieldCheck: LucideIcon;
  export const Phone: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Eye: LucideIcon;
  export const Sparkles: LucideIcon;
  export const FileSearch: LucideIcon;
  export const UserX: LucideIcon;
  export const Compass: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Search: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const FileText: LucideIcon;
  export const BookOpen: LucideIcon;
  export const CalendarCheck: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Headphones: LucideIcon;
  export const ClipboardCheck: LucideIcon;
  export const Target: LucideIcon;
  export const LifeBuoy: LucideIcon;
  export const Loader2: LucideIcon;
  export const Lock: LucideIcon;
  export const Quote: LucideIcon;
  export const Star: LucideIcon;
  export const User: LucideIcon;
  export const Building2: LucideIcon;
  export const Car: LucideIcon;
  export const Layers: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const Info: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const MapPin: LucideIcon;
  export const Mail: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Check: LucideIcon;
}

