import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Landing from "./routes/Landing";
import Trips from "./routes/Trips";
import Dashboard from "./routes/Dashboard";
import Chat from "./components/dashboard/Chat";
import PostTrip from "./components/dashboard/Post-Trip/PostTrip";
import Details from "./components/dashboard/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="landing" element={<Landing />} />
      <Route path="trips" element={<Trips />} />
      <Route path="dashboard/:tripId/" element={<Dashboard />}>
        <Route path="chat" element={<Chat />} />
        <Route path="posttrip" element={<PostTrip />} />
        <Route path="details" element={<Details />} />
        <Route path="map" element={<div>Hello</div>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
