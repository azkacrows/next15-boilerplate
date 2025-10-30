"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.replace(newPathname);
    });
  }

  return (
    <label className="relative inline-block">
      <span className="sr-only">{label}</span>
      <select
        className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-foreground cursor-pointer hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
        ▼
      </span>
    </label>
  );
}
