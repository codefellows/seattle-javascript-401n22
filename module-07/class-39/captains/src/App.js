import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./errorPage";
import HomePage from "./Home";
import Captain from "./Captain";
import PageLayout from "./PageLayout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PageLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         //     /captain/Marvel => {name: "Marvel"}
//         path: "/captain/:name",
//         element: <Captain />,
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/captain/:name" element={<Captain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
