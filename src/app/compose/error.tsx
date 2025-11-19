"use client";
// Error boundaries must be Client Components
import Error from "@/_components/Error";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <Error reset={reset} />;
}
