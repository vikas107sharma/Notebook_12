import React, { useState } from "react";

const TextField = ({ text, setText, dark }) => {
  return (
    <div className="w-full">
      <textarea
        type="text"
        id="code"
        rows="30"
        class={`${
          dark == true ? "bg-zinc-800 text-white" : "bg-gray-100 text-zinc-800"
        } transition-all duration-300 block p-2.5 w-full shadow-sm text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </div>
  );
};

export default TextField;
