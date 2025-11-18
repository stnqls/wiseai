import type { Meta, StoryObj } from "@storybook/nextjs";

import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "내용을 입력하세요.",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "내용을 입력하세요.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "내용을 입력하세요.",
  },
};
