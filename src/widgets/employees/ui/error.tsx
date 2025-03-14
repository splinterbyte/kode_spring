import searchError from "@/shared/assets/searchError.svg";
import styled from "styled-components";

const SearchErrorStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  span {
    &:first-of-type {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      margin: 8px 0 12px 0;
      color: black;
    }
    color: #97979b;
  }
  img {
    height: 56px;
    width: 56px;
  }
`;

export const SearchError = () => {
  return (
    <SearchErrorStyles>
      <img src={searchError} />
      <span>Мы никого не нашли</span>
      <span>Попробуй скорректировать запрос</span>
    </SearchErrorStyles>
  );
};
