import { Search } from "@/features/search";
import { Group } from "@/features/group";
import styled from "styled-components";

const TopBar = styled.div`
  width: 90%;
  height: auto;
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
