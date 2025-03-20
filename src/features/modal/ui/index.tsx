import styled from "styled-components";
import { store } from "@/shared";

const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    background: white;
    padding: 20px;
    border-radius: 20px;

    position: relative;
    display: flex;
    flex-direction: column;
    label {
      width: 341px;
      display: flex;
      align-items: center;
      height: 60px;
      user-select: none;
      input {
        width: 20%;
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

const Modal = ({ isOpenModal, onClose }: ModalProps) => {
  const {
    sortByAlphabet,
    sortByBirthday,
    setSortByAlphabet,
    setSortByBirthday,
  } = store.useStoreSort();
  if (!isOpenModal) return null;

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
    <ModalStyles onClick={handleOverlayClick}>
      <div>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Сортировка</h1>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={handleSortByAlphabet}
            checked={sortByAlphabet}
          />
          По алфавиту
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onClick={handleSortByBirthday}
            checked={sortByBirthday}
          />
          По дню рождения
        </label>
      </div>
    </ModalStyles>
  );
};

export default Modal;
