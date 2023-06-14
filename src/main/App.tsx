import { useEffect } from "react";

// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

// pages
import { Characters, CharacterDetail, NotFound404 } from "../pages/index";
import LocationComponent from "../pages/location";
import Detail from "../pages/character-detail";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document!.scrollingElement!.scrollTop = 0;
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LocationComponent />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="*" element={<NotFound404 />} />
      <Route path="/location" element={<LocationComponent />} />
      <Route path="/character/:id" element={<Detail />} />
    </Routes>
  );
}
