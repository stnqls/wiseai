import Link from "next/link";
import FrownIcon from "@/assets/icons/frown.svg";
import Button from "@/_components/Button/Button";
import { pathUrls } from "@/_routes/path";

export default function NotFoundPage() {
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="m-auto flex w-428 flex-col items-center justify-center pt-100 pb-180">
          <FrownIcon width={70} height={70} className="text-red-500" />
          <h2 className="text-28 font-semibold text-gray-1000 mt-16">
            요청하신 페이지를 찾을 수 없습니다.
          </h2>

          <p className=" mt-20 text-center text-gray-600">
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경,삭제되어 페이지를 찾을 수 없습니다.
          </p>

          <Link href={pathUrls.home} className="mt-40 w-full">
            <Button>메인 페이지로 가기</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
