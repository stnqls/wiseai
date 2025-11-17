import Image from "next/image";
import { getUserData } from "../apis/getUserData";

export default async function UserProfile() {
  const user = await getUserData();

  return (
    <Image
      src={user.profileImage}
      alt={user.name}
      width={50}
      height={56}
      className="rounded-full overflow-hidden mx-auto"
    />
  );
}
