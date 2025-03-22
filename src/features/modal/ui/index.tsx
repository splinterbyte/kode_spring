import styled from "styled-components";
import { themes, useStoreSort, useStoreTheme } from "@/shared";
import { useTranslation } from "react-i18next";

const ModalStyles = styled.div<{ theme: string; isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  input[type="radio"] {
    --active: #6534ff;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #6534ff;
    --border-hover: #6534ff;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));

    &:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
        opacity var(--d-o, 0.2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }

  div {
    background: ${({ theme }) => theme.backgroundGray};
    padding: 20px;
    border-radius: 20px;
    align-items: center;
    position: relative;
    display: flex;
    flex-direction: column;
    transform: ${({ isOpen }) => (isOpen ? "scale(1)" : "scale(0.9)")};
    transition: transform 0.3s ease;
    label {
      width: 341px;
      display: flex;
      align-items: center;
      height: 60px;
      user-select: none;
      color: ${({ theme }) => theme.color};
      input[type="radio"] {
        border-radius: 50%;
        margin-right: 15px;
        &:after {
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: var(--active-inner);
          opacity: 0;
          transform: scale(var(--s, 0.7));
        }
        &:checked {
          --s: 0.5;
        }
      }
    }
    h1 {
      text-align: center;
      margin-bottom: 16px;
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }
`;

type ModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
};

export const Modal = ({ isOpenModal, onClose }: ModalProps) => {
  const { t } = useTranslation();
  const { theme } = useStoreTheme();
  const {
    sortByAlphabet,
    sortByBirthday,
    setSortByAlphabet,
    setSortByBirthday,
  } = useStoreSort();

  const handleSortByAlphabet = () => {
    setSortByAlphabet(true);
    setSortByBirthday(false);
    onClose();
  };

  const handleSortByBirthday = () => {
    setSortByBirthday(true);
    onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalStyles
      onClick={handleOverlayClick}
      theme={themes[theme]}
      isOpen={isOpenModal}
    >
      <div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>{t("sort")}</h1>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={handleSortByAlphabet}
            checked={sortByAlphabet}
          />
          {t("sortByAlphabet")}
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={handleSortByBirthday}
            checked={sortByBirthday}
          />
          {t("sortByDate")}
        </label>
      </div>
    </ModalStyles>
  );
};
