import { Package2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/home" className={cn("flex items-center gap-2 text-primary", className)}>
      <Package2 className="h-6 w-6" />
      <span className="text-xl font-bold font-headline">ParcelVibe</span>
    </Link>
  );
};

export default Logo;
