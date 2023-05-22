import React from "react";
import { Modal } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const AppModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      {/* style modal with tailwind */}
      <div className="flex h-full w-full items-center justify-center bg-black/5">
        <div
          className="w-11/12 rounded-xl bg-white p-4 shadow-md md:w-1/2 md:p-6 lg:w-1/3 lg:p-8"
          data-aos="zoom-out"
        >
          <h2 className="text-center text-2xl font-medium">Recommendation</h2>
          <p className="mt-5 text-grey md:text-lg">
            Consider taking your prescribed medication like an Antacid, which
            can help neutralize stomach acid and relieve symptoms. Stay
            hydrated.
          </p>

          <p className="mt-5 flex items-center justify-center gap-2 text-grey">
            <ErrorIcon />
            This recommendation is based on general knowledge and should no be
            substituted for professional medical advice.
          </p>

          <button className="main_btn light_grey mt-8 w-full">
            Track Symptoms
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AppModal;
