import React from "react";

export const Btn = ({ title, func }: any) => {
  return (
    <button
      style={{ marginTop: "10px", padding: "10px 20px" }}
      onClick={async () => {
        await func();
      }}
    >
      {title}
    </button>
  );
};
