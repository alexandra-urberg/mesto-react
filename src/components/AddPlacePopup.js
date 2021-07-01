import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const AddPlacePopup = (props) => {
    const [description , setDescription] = useState('');
    const [link, setLink] = useState('');
    const currentUser = useContext(CurrentUserContext); // Подписка на контекст
    const [validationErrors, setValidationErrors] = useState({description: '', link: ''})//стейт валидации инпутов

    function handleChangeDescription(e) {//Обработчик изменения инпута name обновляет стейт 
      const { value } = e.target;
      let errors = validationErrors;
      setDescription(value);

      value.length < 2 ? errors.description = 'Минимальное колличество символоа - 2': errors.description = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
    }

    function handleChangeLink(e) {//Обработчик изменения инпута name обновляет стейт
      const { value } = e.target;
      let errors = validationErrors;
      setLink(value);
      const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;

      !regex.test(value) ? errors.link = 'Введите URL.' : errors.link = '' && setValidationErrors(errors);
    }

    function handleSubmit(e) {
        e.preventDefault();//Запрещаем браузеру переходить по адресу формы
        props.onAddPlace({//Передаём значения управляемых компонентов во внешний обработчик
          name: description,
          link,
        });
    }

    useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
      setDescription(currentUser.description);
      setLink(currentUser.link);
      setValidationErrors({description: '', link: ''});//и проверяться на валидность
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="image"
            title="Новое место"
            disabled={(validationErrors.description || validationErrors.link ) || (description === currentUser.description || link === currentUser.link)}
            btn={props.isLoading ? 'Сохранение...' : 'Создать'}
          >
            <label className="popup__label">
              <input
                type="text"
                minLength="2"
                maxLength="30"
                name="name"
                className="popup__input"
                placeholder="Название"
                required
                value={description || ""}
                onChange={handleChangeDescription}
              />
              <span className={`${validationErrors.description ? "popup__input-error" : null}`}>{validationErrors.description}</span>
            </label>
            <label className="popup__label">
              <input
                type="url"
                name="link"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required
                value={link || ""}
                onChange={handleChangeLink}
              />
              <span className={`${validationErrors.link ? "popup__input-error" : null}`}>{validationErrors.link}</span>
            </label>
          </PopupWithForm>
    )
}

export default AddPlacePopup;