import type { Meta, StoryObj } from "@storybook/nextjs";
import Modal from "./Modal";
import Button from "../Button/Button";
import { useState } from "react";

const meta = {
  title: "Components/Modal",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="text-16 p-24 bg-white w-fit z-10 rounded-12">
            모달 입니다. 모달 내부 입니다.
          </div>
        </Modal>
      </>
    );
  },
};
