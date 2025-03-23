import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "@/pages/home";
import { Profile } from "@/pages/profile";
import { createGlobalStyle } from "styled-components";
import { themes, useStoreTheme } from "@/shared";

const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    margin: 0;
    padding: 0;
  }

  body{
    background-color: ${({ theme }) => theme.backgroundGray};
    transition: background-color 0.5s ease;
  }
`;

export const AppRouter = () => {
  const { theme } = useStoreTheme();
  return (
    <Router basename="/kode_spring">
      <GlobalStyles theme={themes[theme]} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
};
