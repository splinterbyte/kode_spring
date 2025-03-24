import styled from "styled-components";
import { useDepartments, useStoreTheme, useStoreGroup, themes } from "@/shared";

const GroupStyle = styled.div<{ theme: string }>`
  display: flex;
  align-items: center;
  margin-top: 15px;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  width: 100%;
  justify-content: center;
  background: ${({ theme }) => theme.backgroundBlack};
  transition: background-color 0.5s ease;
  div {
    width: 90%;
    display: flex;
    margin-top: 10px;
  }
  span {
    position: relative;
    font-size: 15px;
    padding: 0 10px;
    height: 25px;
    cursor: pointer;
    color: ${({ theme }) => theme.color};
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: #6534ff;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    &:hover::after {
      transform: scaleX(1);
    }
    &.active::after {
      transform: scaleX(1);
    }
  }
`;

export const Group = () => {
  const { selectedDepartment, setSelectedDepartment } = useStoreGroup();
  const theme = useStoreTheme((state) => state.theme);
  const departaments = useDepartments();
  return (
    <GroupStyle theme={themes[theme]}>
      <div>
        {departaments.map((departament) => (
          <span
            className={selectedDepartment === departament.tag ? "active" : ""}
            key={departament.tag}
            onClick={() => {
              setSelectedDepartment(departament.tag);
            }}
          >
            {departament.name}
          </span>
        ))}
      </div>
    </GroupStyle>
  );
};
