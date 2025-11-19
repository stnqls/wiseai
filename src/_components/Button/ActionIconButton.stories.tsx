import type { Meta, StoryObj } from "@storybook/nextjs";

import HeartIcon from "@/assets/icons/heart.svg";
import ActionIconButton from "./ActionIconButton";
import { useState } from "react";
import { cn } from "@/_lib/cn";

const meta = {
  title: "Components/ActionIconButton",
  component: ActionIconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "object" },
    text: { control: ["number", "string"] },
  },
  args: {
    icon: <HeartIcon className="w-18 h-18" />,
    text: 10,
  },
} satisfies Meta<typeof ActionIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <HeartIcon className="w-18 h-18" />,
    text: 10,
  },
};

export const IconButtonWithAction: Story = {
  render: function Render() {
    const [count, setCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    return (
      <ActionIconButton
        icon={
          <HeartIcon className={cn("w-18 h-18", isLiked && "text-blue-500")} />
        }
        text={count}
        onClick={() => {
          setCount(() => (isLiked ? count - 1 : count + 1));
          setIsLiked(!isLiked);
        }}
      />
    );
  },
};
