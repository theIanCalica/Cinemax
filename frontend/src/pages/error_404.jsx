import React from "react";

const error_404 = () => {
  return (
    <>
      <div className="h-screen bg-blue-500 w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-white text-6xl font-bold">404</h1>
            <p className="text-white text-lg">Page Not Found</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-lg">
              The page you are looking for does not exist.
            </p>
            <p className="text-white text-lg">
              Please check the URL or return to the homepage.
            </p>
            <button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded">
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default error_404;
