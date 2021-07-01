import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [tittle, setTitle] = useState(""); // Стейт, в котором содержится значение инпута name
  const [narrative, setNarrative] = useState(""); // Стейт, в котором содержится значение инпута about
  const [validationErrors, setValidationErrors] = useState({tittle: '', narrative: ''})//стейт валидации инпутов
  const currentUser = useContext(CurrentUserContext); // Подписка на контекст
  

  function handleChangeTitle(e) {//Обработчик изменения инпута name обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setTitle(value);

    value.length < 2 ? errors.tittle = 'Минимальное колличество символоа - 2': errors.tittle = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
  }

  function handleChangeNarrative(e) {//Обработчик изменения инпута about обновляет стейт
    const { value } = e.target;
    let errors = validationErrors;
    setNarrative(value);

    value.length < 2 ? errors.narrative = 'Минимальное колличество символоа - 2': errors.narrative = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
  }

  function handleSubmit(e) {
    e.preventDefault();//Запрещаем браузеру переходить по адресу формы

    props.onUpdateUser({//Передаём значения управляемых компонентов во внешний обработчик
      name: tittle,
      about: narrative,
    });
  }

  useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    setTitle(currentUser.tittle); 
    setNarrative(currentUser.narrative); 
    setValidationErrors({tittle: '', narrative: ''});//и проверяться на валидность
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      disabled={(validationErrors.tittle || validationErrors.narrative ) || (tittle === currentUser.tittle || narrative === currentUser.narrative)}
      btn={props.isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          className="popup__input"
          placeholder="Жак-Ив Кусто"
          required
          value={tittle || ""}
          onChange={handleChangeTitle}
          onFocus={handleChangeTitle}
        />
        <span className={`${validationErrors.tittle ? "popup__input-error" : null}`}>{validationErrors.tittle}</span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="about"
          className="popup__input"
          placeholder="Исследователь океана"
          required
          value={narrative || ""}
          onChange={handleChangeNarrative}
          onFocus={handleChangeNarrative}
        />
        <span className={`${validationErrors.narrative ? "popup__input-error" : null}`}>{validationErrors.narrative}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;