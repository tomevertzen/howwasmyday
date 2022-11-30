import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modals/Modal";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-8 sm:px-5">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div>
        <Link className="text-2xl font-bold" to="/dashboard">
          Howwasmyday.
        </Link>
      </div>
      <div className="flex items-center space-x-10">
        <button
          className="p-3 bg-hworange text-white rounded"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add new day
        </button>
        <Link to="/dashboard/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navigation;
