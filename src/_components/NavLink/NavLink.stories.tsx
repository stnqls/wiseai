import type { Meta, StoryObj } from "@storybook/nextjs";
import NavLink from "./NavLink";
import HomeIcon from "@/assets/icons/home.svg";

const meta = {
  title: "Components/NavLink",
  component: NavLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/",
    icon: <HomeIcon className="w-24 h-24" />,
    title: "Home",
  },
};
