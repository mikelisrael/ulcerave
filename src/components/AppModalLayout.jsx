/**
 * This is a React component that renders a modal with a close button and customizable content.
 * @returns The AppModalLayout component is being returned.
 */
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Modal } from "@mui/material";

const AppModalLayout = ({ open, setOpen, closeFunc, children }) => {
  closeFunc = closeFunc || (() => setOpen(false));

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="bg-mainBg flex h-full w-full items-start justify-center overflow-y-auto">
        <div
          className="relative mt-9 w-[90%] rounded-xl bg-white shadow-md md:mt-16 md:w-[60%] lg:w-[50%] xl:w-1/3"
          data-aos="zoom-out"
          data-aos-duration="500"
        >
          <button
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <CloseOutlinedIcon fontSize="small" />
          </button>

          <div className="p-5 md:px-9 md:py-10">{children}</div>
        </div>
      </div>
    </Modal>
  );
};

export default AppModalLayout;
