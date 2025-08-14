import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const StudentDetailPage = () => {
  const student = useLoaderData();

  if (!student) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl text-red-600">Student not found.</h2>
        <Link
          to="/"
          className="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
        Student Details
      </h2>
      <div className="space-y-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-600 w-24 inline-block">
            ID:
          </strong>{" "}
          {student.id}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-600 w-24 inline-block">
            Full Name:
          </strong>{" "}
          {student.name}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-600 w-24 inline-block">
            Email:
          </strong>{" "}
          {student.email}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-600 w-24 inline-block">
            Phone:
          </strong>{" "}
          {student.phone}
        </p>
      </div>
      <Link to="/">
        <button className="mt-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default StudentDetailPage;
