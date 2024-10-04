import React from "react";

const LoadingBar = () => {
  return (
    <div className="text-center w-1/2">
      <div className="flex justify-center mb-3 mx-auto">
        <img src="/src/assets/images/logo.png" alt="Logo" width={400} />
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded">
        <div
          className="absolute top-0 left-0 h-full bg-red-600 rounded loading-bar"
          style={{ animation: "loading 2s infinite" }}
        ></div>
      </div>

      {/* Barra de carga roja animada */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingBar;
