import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { store } from "./app/store";
import { selectStudentById } from "./features/students/studentsSlice";

// Pages and Components
import StudentListPage from "./pages/StudentListPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import StudentForm from "./components/StudentForm";

// Loader function to get student data from the Redux store
const studentLoader = ({ params }) => {
  const state = store.getState();
  return selectStudentById(state, params.id);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <StudentListPage /> },
      { path: "student/add", element: <StudentForm /> },
      {
        path: "student/:id",
        element: <StudentDetailPage />,
        loader: studentLoader,
      },
      {
        path: "student/edit/:id",
        element: <StudentForm />,
        loader: studentLoader,
      },
    ],
  },
]);

function RootLayout() {
  return (
    // Add a background color to the body to make the white cards stand out
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
