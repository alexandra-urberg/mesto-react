import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState(""); // Стейт, в котором содержится значение инпута name
  const [about, setAbout] = useState(""); // Стейт, в котором содержится значение инпута about
  const currentUser = useContext(CurrentUserContext); // Подписка на контекст

  function handleChangeName(e) {
    // Обработчик изменения инпута name обновляет стейт
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    // Обработчик изменения инпута about обновляет стейт
    setAbout(e.target.value);
  }
  //debugger;
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name,
      about,
    });
  }

  function handleClear() {
    setName("");
    setAbout("");
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleCloseByOverlay={props.handleCloseByOverlay}
      onSubmit={handleSubmit}
      onClick={handleClear}
      name="profile"
      title="Редактировать профиль"
      btn="Сохранить"
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
          value={name || ""}
          onChange={handleChangeName}
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
          value={about || ""}
          onChange={handleChangeAbout}
        />
        <span className="input-job-error input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;