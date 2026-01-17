import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

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
        <Route path="*" element={<NotFound {...sharedProps} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
