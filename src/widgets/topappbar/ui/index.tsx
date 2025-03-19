import { Search } from "@/features/search";
import { Group } from "@/features/group";
import styled from "styled-components";

const TopBar = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    width: 90%;
  }
`;

export const Topappbar = () => {
  return (
    <TopBar>
      <h1>Поиск</h1>
      <Search />
      <Group />
    </TopBar>
  );
};
