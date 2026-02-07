import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { SpeedInsights } from '@vercel/speed-insights/react';
import {About} from "@/pages/About";
import {Algorithms} from "@/pages/Algorithms";
import {Challenges} from "@/pages/Challenges";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    onThemeToggle: handleThemeToggle,
    isDarkMode,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/about" element={<About {...sharedProps} />} />
        <Route path="/algorithms" element={<Algorithms {...sharedProps} />} />
        <Route path="*" element={<NotFound {...sharedProps} />} />
        <Route path="/challenges" element={<Challenges {...sharedProps} />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
