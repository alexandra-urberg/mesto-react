import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
    const [name , setName] = useState('');
    const [link, setLink] = useState('');
    const [validationErrors, setValidationErrors] = useState({name: '', link: ''})//стейт валидации инпутов

    function handleChangename(e) {//Обработчик изменения инпута name обновляет стейт 
      const { value } = e.target;
      let errors = validationErrors;
      setName(value);

      value.length < 2 ? errors.name = 'Минимальное колличество символоа - 2': errors.name = '' && setValidationErrors(errors);// проверяем на минимальное колличество символов
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
        name,
        link,
      });
    }

    useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
      setName('');
      setLink('');
      setValidationErrors({name: '', link: ''});//и проверяться на валидность
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="image"
            title="Новое место"
            disabled={validationErrors.name || validationErrors.link}
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
                value={name || ""}
                onChange={handleChangename}
              />
              <span className={`${validationErrors.name ? "popup__input-error" : null}`}>{validationErrors.name}</span>
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