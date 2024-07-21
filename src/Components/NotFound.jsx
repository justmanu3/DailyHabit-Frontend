import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800">404</h2>
        <h3 className="text-xl font-medium text-gray-600 mt-2">
          Page Not Found
        </h3>
        <p className="text-gray-500 mt-4">
          Go to the{" "}
          <Link to="/home" className="text-blue-500 hover:underline">
            Welcome Page
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
