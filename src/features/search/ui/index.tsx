import search from "@/shared/assets/search.svg";
import filter from "@/shared/assets/filter.svg";
import { store } from "@/shared";
import styled from "styled-components";
import { useState } from "react";
import Modal from "@/features/modal/ui";

const SearchStyles = styled.div`
  background-color: #f7f7f8;
  display: flex;
  width: 100%;
  height: 40px;
  border-radius: 16px;
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 15px;
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
    width: 24px;
    height: 24px;
    margin: 8px;
  }
`;

export const Search = () => {
  const [isOpen, setOpen] = useState(false);

  const { setSearchQuery, searchQuery } = store.useStoreSearch();
  return (
    <SearchStyles>
      <img src={search} />
      <input
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <img src={filter} onClick={() => setOpen(!isOpen)} />

      <Modal isOpenModal={isOpen} onClose={() => setOpen(!isOpen)} />
    </SearchStyles>
  );
};
