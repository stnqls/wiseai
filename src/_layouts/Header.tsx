import { Suspense } from "react";
import { pathUrls } from "@/_routes/path";
import NavLink from "@/_components/NavLink/NavLink";
import UserProfile from "@/_features/user/components/UserProfile";
import UserIcon from "@/assets/icons/user.svg";
import EditIcon from "@/assets/icons/edit-3.svg";
import HomeIcon from "@/assets/icons/home.svg";

export default function Header() {
  return (
    <header className="flex flex-col gap-12 justify-between items-start border-r-1 border-r-gray-200 pc:w-180 pb-46 pt-24 px-24">
      <nav className="flex flex-col gap-12 items-center pc:items-start">
        <span className="text-28 font-bold pc:px-24">WiseAI</span>

        <NavLink
          href={pathUrls.home}
          icon={<HomeIcon className="w-24 h-24" />}
          title="Home"
        />
        <NavLink
          href={pathUrls.compose}
          icon={<EditIcon className="w-24 h-24" />}
          title="Post"
        />
      </nav>

      <Suspense
        fallback={
          <div className="w-50 h-56 flex justify-center items-center rounded-full bg-gray-300">
            <UserIcon className="w-24 h-24" />
          </div>
        }
      >
        <UserProfile />
      </Suspense>
    </header>
  );
}
