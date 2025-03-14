import { Employees } from "@/widgets/employees";
import { Topappbar } from "@/widgets/topappbar";

import styled from "styled-components";

const HomeStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  hr {
    width: 100%;
    border: none;
    border-top: 0.33px solid #c3c3c6;
  }
`;

export const Home = () => {
  return (
    <HomeStyles>
      <Topappbar />
      <hr />
      <Employees />
    </HomeStyles>
  );
};
