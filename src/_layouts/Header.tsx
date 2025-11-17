import { pathUrls } from "@/_routes/path";
import NavLink from "@/_components/NavLink/NavLink";
import UserProfile from "@/_features/user/components/UserProfile";
import EditIcon from "@/assets/icons/edit-3.svg";
import HomeIcon from "@/assets/icons/home.svg";
import { getUserData } from "@/_features/user/apis/getUserData";

export default async function Header() {
  const user = await getUserData();

  return (
    <header
      className={`
     bg-white pt-12 px-12 pb-12 flex border-t-1 border-gray-300
    tablet:px-24 tablet:justify-end tablet:h-full tablet:pb-46 tablet:border-t-0 tablet:border-r-1 tablet:border-r-gray-200 tablet:grow
    `}
    >
      <div
        className={`
        flex justify-between w-full gap-24
        tablet:flex-col tablet:w-100 tablet:h-full tablet:items-center
        pc:w-180
        `}
      >
        <nav
          className={`
          flex gap-12 items-center justify-between flex-1
          tablet:flex-col tablet:justify-start tablet:w-full
          `}
        >
          <span className="text-18 tablet:text-28 font-bold tablet:px-24">
            WiseAI
          </span>

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
          className="mx-0"
        />
      </div>
    </header>
  );
}
