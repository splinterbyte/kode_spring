import { useStoreTheme, themes } from "@/shared";
import { Employees } from "@/widgets/employees";
import { Topappbar } from "@/widgets/topappbar";

import styled from "styled-components";

const HomeStyles = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundGray};
  transition: background-color 0.5s ease;

  hr {
    width: 100%;
    border: none;
    border-top: 0.33px solid #c3c3c6;
  }
`;

export const Home = () => {
  const { theme } = useStoreTheme();
  return (
    <HomeStyles theme={themes[theme]}>
      <Topappbar />
      <hr />
      <Employees />
    </HomeStyles>
  );
};
