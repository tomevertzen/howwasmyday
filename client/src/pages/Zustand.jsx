import React, { useState, useEffect } from "react";
import useTryoutStore from "../app/tryoutStore";

const Zustand = () => {
  const [addInput, setAddInput] = useState("");
  const [removeInput, setRemoveInput] = useState("");
  const [tryoutArray, setTryoutArray] = useState([]);

  const refresh = useRefreshToken();

  const { tryout, addToTryout, removeFromTryout, clearTryout } =
    useTryoutStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    addToTryout(value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!value) {
      console.log("No value entered.");
      return;
    }

    removeFromTryout(value);
  };

  return (
    <div className="flex flex-col space-y-10 w-80 m-32">
      <form onSubmit={handleSubmit} className="flex flex-col  space-y-1">
        <label className="font-bold">Add to store</label>
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          className="border border-black p-2 rounded"
        />
        <button className="border border-black p-2 bg-green-200">
          + Add to store array
        </button>
      </form>
      <form onSubmit={handleDelete} className="flex flex-col space-y-1">
        <label className="font-bold">Delete from store</label>
        <input
          type="text"
          className="border border-black rounded p-2"
          value={removeInput}
          onChange={(e) => setRemoveInput(e.target.value)}
        />
        <button className="border border-black p-2 bg-red-200">
          - Remove from store array
        </button>
      </form>
      <div>
        <button
          className="border border-black p-2 bg-red-200"
          onClick={() => {
            clearTryout();
          }}
        >
          Delete full array
        </button>
        <button
          className="border border-black p-2 bg-red-200"
          onClick={() => {
            refresh();
          }}
        >
          Refresh
        </button>
      </div>
      <div>
        <ul>
          {tryout.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Zustand;
