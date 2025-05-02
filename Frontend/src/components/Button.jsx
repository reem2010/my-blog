import React from "react";

export default function Button({ loading, children, customStyle }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      } w-full  px-4  bg-blue-950 rounded-xl text-white ${customStyle}`}
    >
      <span>{children}</span>
      {loading && (
        <span className="loading loading-spinner loading-xs ml-3"></span>
      )}
    </button>
  );
}
