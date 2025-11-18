import type { Meta, StoryObj } from "@storybook/nextjs";

import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    size: { control: "select", options: ["48", "36"] },
    variant: { control: "select", options: ["gray", "blue"] },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "blue",
    size: 48,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlueButton: Story = {
  args: {
    children: "Blue Button",
    variant: "blue",
  },
};

export const GrayButton: Story = {
  args: {
    children: "Gray Button",
    variant: "gray",
  },
};

export const Size48: Story = {
  args: {
    children: "Size 48 Button",
    size: 48,
  },
};

export const Size36: Story = {
  args: {
    children: "Size 36 Button",
    size: 36,
  },
};

export const DisabledButton: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};
