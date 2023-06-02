import React, { useState } from "react";
import Profile from "../custom/Profile";

const Filter = ({ filteredNotes, chooseTag, returnToAll, active }) => {
  const [spans] = useState([
    { id: "c++", text: "c++" },
    { id: "java", text: "java" },
    { id: "python", text: "python" },
    { id: "webd", text: "webd" },
    { id: "other", text: "other" },
  ]);
  return (
    <div className="flex flex-col fixed border-2 bg-white min-h-full shadow w-[125px]">
      <Profile />
      <hr />
      <h1 className="text-xl font-semibold m-3">Filter by</h1>
      <hr />
      {filteredNotes.length > 0 && (
        <span
          onClick={returnToAll}
          className="sm:p-3 md:p-3 lg:pt-3 lg:pb-3 lg:pl-10 tags transition-all duration-300 hover:bg-[#7052ca] hover:text-white"
        >
          All
        </span>
      )}
      {spans.map((s, index) => {
        return (
          <span
            key={index}
            className={`${
              active === s.id
                ? "bg-[#7052ca] text-white"
                : "hover:bg-[#7052ca] hover:text-white"
            } sm:p-3 md:p-3 lg:pt-3 lg:pb-3 lg:pl-10 tags transition-all duration-300`}
            id={s.id}
            onClick={() => chooseTag(s)}
          >
            {s.text}
          </span>
        );
      })}
    </div>
  );
};

export default Filter;
