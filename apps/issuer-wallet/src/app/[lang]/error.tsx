"use client";

export default function Error({
  error,
  reset,
}: {
  params: { lang: string };
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <span>{error.message}</span>;
}
