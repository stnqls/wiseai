import Button from "./Button/Button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h2>오류가 발생했습니다.</h2>
      <Button variant="blue" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
