import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [tittle, setTitle] = useState(""); // Стейт, в котором содержится значение инпута name
  const [narrative, setNarrative] = useState(""); // Стейт, в котором содержится значение инпута about
  const currentUser = useContext(CurrentUserContext); // Подписка на контекст

  function handleChangeTitle(e) {//Обработчик изменения инпута name обновляет стейт
    setTitle(e.target.value);
  }

  function handleChangeNarrative(e) {//Обработчик изменения инпута about обновляет стейт
    setNarrative(e.target.value);
  }
  //debugger;
  function handleSubmit(e) {
    e.preventDefault();//Запрещаем браузеру переходить по адресу формы

    props.onUpdateUser({//Передаём значения управляемых компонентов во внешний обработчик
      name: tittle,
      about: narrative,
    });
  }

  function handleClear() {//очищаем инпуты после закрытия на крестик
    setTitle("");
    setNarrative("");
  }

  useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setTitle(currentUser.tittle);
    setNarrative(currentUser.narrative);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onClick={handleClear}
      name="profile"
      title="Редактировать профиль"
    >
      <label className="popup__label">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          className="popup__input"
          placeholder="Жак-Ив Кусто"
          required
          value={tittle || ""}
          onChange={handleChangeTitle}
        />
        <span className="input-name-error input-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          minLength="2"
          maxLength="200"
          name="about"
          className="popup__input"
          placeholder="Исследователь океана"
          required
          value={narrative || ""}
          onChange={handleChangeNarrative}
        />
        <span className="input-job-error input-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        {props.isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  );
};

export default EditProfilePopup;