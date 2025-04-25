import React from "react";

export default function Button({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      } self-end mr-5 py-1 px-4 bg-blue-950 rounded text-white`}
    >
      <span>{children}</span>
      {loading && (
        <span className="loading loading-spinner loading-xs ml-3"></span>
      )}
    </button>
  );
}
