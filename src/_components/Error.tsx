import Button from "./Button/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col gap-24 items-center justify-center h-full">
      <h2 className="text-24 font-bold">오류가 발생했습니다.</h2>
      <Button variant="blue" onClick={reset} className="w-250">
        Try again
      </Button>
    </div>
  );
}
