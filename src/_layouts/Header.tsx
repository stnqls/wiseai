import { pathUrls } from "@/_routes/path";
import EditIcon from "@/assets/icons/edit-3.svg";
import HomeIcon from "@/assets/icons/home.svg";
import NavLink from "@/_components/NavLink/NavLink";
import { getUserData } from "@/_features/user/apis/getUserData";
import Image from "next/image";

export default async function Header() {
  const user = await getUserData();

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

      <Image
        src={user.profileImage}
        alt={user.name}
        width={50}
        height={56}
        className="rounded-full overflow-hidden mx-auto"
      />
    </header>
  );
}
