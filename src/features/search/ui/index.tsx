import filter from "@/shared/assets/filter.svg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/features/modal";
import { themes, useStoreSearch, useStoreTheme } from "@/shared";
import { useTranslation } from "react-i18next";

const SearchStyles = styled.div<{ changeColor: boolean; tempBlue: boolean }>`
  background-color: ${({ changeColor, tempBlue }) =>
    (changeColor === false && tempBlue === false) ||
    (changeColor === true && tempBlue === true)
      ? "transparent"
      : "#f7f7f8"};
  display: flex;
  width: 90%;
  height: 40px;
  border-radius: 16px;
  transition: fill 0.3s ease-in-out;
  &:has(input:focus) svg path {
    fill: #000;
    transition: fill 0.3s ease;
  }
  input {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: none;
    font-size: 15px;
    color: ${({ changeColor, tempBlue }) =>
      (changeColor === false && tempBlue === false) ||
      (changeColor === true && tempBlue === true)
        ? "#fff"
        : "#000"};
    &::placeholder {
      color: #c3c3c6;
    }
  }
  img,
  svg {
    display: ${({ changeColor, tempBlue }) =>
      (changeColor === false && tempBlue === false) ||
      (changeColor === true && tempBlue === true)
        ? "none"
        : "block"};
    width: 24px;
    height: 24px;
    margin: 8px;
  }
  img {
    cursor: pointer;
  }
`;

type Props = {
  isOnline: boolean;
  tempBlue: boolean;
};

export const Search = ({ isOnline, tempBlue }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useStoreSearch();
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState(searchQuery);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(value);
    }, 1000);
  };
  const { theme } = useStoreTheme();
  return (
    <SearchStyles
      changeColor={isOnline}
      tempBlue={tempBlue}
      theme={themes[theme]}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.71 20.29L18 16.61C19.4401 14.8144 20.1375 12.5353 19.9488 10.2413C19.7601 7.94733 18.6997 5.81281 16.9855 4.27667C15.2714 2.74053 13.0338 1.91954 10.7329 1.9825C8.43203 2.04546 6.24272 2.98759 4.61514 4.61517C2.98756 6.24275 2.04543 8.43207 1.98247 10.7329C1.91951 13.0338 2.7405 15.2714 4.27664 16.9855C5.81278 18.6997 7.9473 19.7601 10.2413 19.9488C12.5353 20.1375 14.8144 19.4401 16.61 18L20.29 21.68C20.383 21.7738 20.4936 21.8482 20.6154 21.8989C20.7373 21.9497 20.868 21.9758 21 21.9758C21.132 21.9758 21.2627 21.9497 21.3846 21.8989C21.5064 21.8482 21.617 21.7738 21.71 21.68C21.8902 21.4936 21.991 21.2444 21.991 20.985C21.991 20.7257 21.8902 20.4765 21.71 20.29ZM11 18C9.61553 18 8.26215 17.5895 7.111 16.8203C5.95986 16.0511 5.06265 14.9579 4.53284 13.6788C4.00303 12.3997 3.8644 10.9923 4.1345 9.63439C4.4046 8.27653 5.07128 7.02925 6.05025 6.05028C7.02922 5.07131 8.2765 4.40463 9.63436 4.13453C10.9922 3.86443 12.3997 4.00306 13.6788 4.53287C14.9579 5.06268 16.0511 5.95989 16.8203 7.11103C17.5895 8.26218 18 9.61556 18 11C18 12.8565 17.2625 14.637 15.9497 15.9498C14.637 17.2625 12.8565 18 11 18Z"
          fill="#C3C3C6"
        />
      </svg>

      <input
        type="text"
        placeholder={`${t("placeholder")}`}
        value={
          isOnline === true && tempBlue === true
            ? "Секундочку, гружусь..."
            : isOnline === false && tempBlue === false
            ? "Не могу обновить данные. Проверь соединение с интернетом."
            : inputValue
        }
        onChange={handleInputChange}
        disabled={!isOnline}
      />
      <img src={filter} onClick={() => setOpen(!isOpen)} />

      <Modal isOpenModal={isOpen} onClose={() => setOpen(!isOpen)} />
    </SearchStyles>
  );
};
