import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import MovieDetails from "../pages/MovieDetails";
import Favorites from "../pages/Favorites";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
