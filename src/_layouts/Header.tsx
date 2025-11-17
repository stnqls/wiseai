import { pathUrls } from "@/_routes/path";
import NavLink from "@/_components/NavLink/NavLink";
import UserProfile from "@/_features/user/components/UserProfile";
import EditIcon from "@/assets/icons/edit-3.svg";
import HomeIcon from "@/assets/icons/home.svg";
import { getUserData } from "@/_features/user/apis/getUserData";

export default async function Header() {
  const user = await getUserData();

  return (
    <header className="sticky top-0 left-0 h-full bg-white grow border-r-1 border-r-gray-200 pb-46 pt-24 px-24 flex justify-end">
      <div className="flex flex-col justify-between h-full w-100 pc:w-180">
        <nav className="flex flex-col gap-12 items-center w-full">
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
        <UserProfile
          src={user.profileImage}
          alt={user.name}
          width={50}
          height={56}
        />
      </div>
    </header>
  );
}
