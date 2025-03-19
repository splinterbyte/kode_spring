import styled from "styled-components";
import { departament, store } from "@/shared";

const GroupStyle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  width: 100%;
  justify-content: center;
  div {
    width: 90%;
  }
  span {
    position: relative;
    font-size: 15px;
    padding: 0 10px;
    height: 25px;
    cursor: pointer;
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
  }
`;

export const Group = () => {
  const { setSelectedDepartment } = store.useStoreGroup();
  return (
    <GroupStyle>
      <div>
        {departament.map((item) => (
          <span key={item.tag} onClick={() => setSelectedDepartment(item.tag)}>
            {item.name}
          </span>
        ))}
      </div>
    </GroupStyle>
  );
};
