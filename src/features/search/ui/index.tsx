import search from "@/shared/assets/search.svg";
import filter from "@/shared/assets/filter.svg";
import { store } from "@/shared";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "@/features/modal/ui";

const SearchStyles = styled.div<{ changeColor: boolean; tempBlue: boolean }>`
  background-color: ${({ changeColor, tempBlue }) => {
    if (changeColor === false && tempBlue === false) {
      return "transparent";
    }
    if (tempBlue === true && changeColor === true) {
      return "transparent";
    }
    return "#f7f7f8";
  }};
  display: flex;
  width: 90%;
  height: 40px;
  border-radius: 16px;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 15px;
    color: ${({ changeColor, tempBlue }) => {
      if (changeColor === false && tempBlue === false) {
        return "#fff";
      }
      if (tempBlue === true && changeColor === true) {
        return "#fff";
      }
      return "#000";
    }};
    &::placeholder {
      color: #c3c3c6;
    }
    &:focus {
      img:first-child {
        fill: black;
      }
    }
  }
  img {
    display: ${({ changeColor, tempBlue }) => {
      if (changeColor === false && tempBlue === false) {
        return "none";
      }
      if (tempBlue === true && changeColor === true) {
        return "none";
      }
      return "block";
    }};
    width: 24px;
    height: 24px;
    margin: 8px;
  }
`;

export const Search = ({ isOnline, tempBlue }) => {
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setSearchQuery } = store.useStoreSearch();
  console.log(tempBlue);
  console.log(isOnline);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, setSearchQuery]);
  console.log("online:" + isOnline);
  console.log("blue:" + tempBlue);
  return (
    <SearchStyles changeColor={isOnline} tempBlue={tempBlue}>
      <img src={search} />
      <input
        type="text"
        placeholder="Поиск..."
        value={
          isOnline === true && tempBlue === true
            ? "Секундочку, гружусь..."
            : isOnline === false && tempBlue === false
            ? "Не могу обновить данные. Проверь соединение с интернетом."
            : inputValue
        }
        onChange={(event) => setInputValue(event.target.value)}
        disabled={!isOnline}
      />
      <img src={filter} onClick={() => setOpen(!isOpen)} />

      <Modal isOpenModal={isOpen} onClose={() => setOpen(!isOpen)} />
    </SearchStyles>
  );
};
