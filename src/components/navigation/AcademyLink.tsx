'use client';

import { useRouter } from 'next/navigation';
import { emitRouteLoading } from '@/lib/navigation-events';

export default function AcademyLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        emitRouteLoading({ label: 'Loading Academy', href });
        setTimeout(() => router.push(href), 200);
      }}
    >
      {children}
    </button>
  );
}
