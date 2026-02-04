import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { SpeedInsights } from '@vercel/speed-insights/react';
import {About} from "@/pages/About";
import { useUserConfig } from "@/hooks/useUserConfig";

const App = () => {
  const { isDarkMode, toggleTheme } = useUserConfig();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const sharedProps = {
    isSidebarOpen,
    onSidebarOpen: handleSidebarOpen,
    onSidebarClose: handleSidebarClose,
    onThemeToggle: toggleTheme,
    isDarkMode,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/about" element={<About {...sharedProps} />} />
        <Route path="*" element={<NotFound {...sharedProps} />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
