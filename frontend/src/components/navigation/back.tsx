import React from "react";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      <button
        type="button"
        className="text-blue-600 hover:underline flex items-center gap-1"
        onClick={() => navigate(-1)}
      >
        <span aria-hidden="true">←</span> Go Back
      </button>
    </div>
  );
}

export default Back;
