import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const AddPlacePopup = (props) => {
    const [description , setDescription] = useState("");
    const [link, setLink] = useState("");
    const currentUser = useContext(CurrentUserContext);

    function handleChangeDescription(e) {//Обработчик изменения инпута name обновляет стейт
        setDescription(e.target.value);
    }

    function handleChangeLink(e) {//Обработчик изменения инпута name обновляет стейт
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();//Запрещаем браузеру переходить по адресу формы
        props.onAddPlace({//Передаём значения управляемых компонентов во внешний обработчик
          name: description,
          link,
        });
    }
    
    function handleClear() {
        setDescription("");
        setLink("");
    }

    useEffect(() => {// После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
        setDescription(currentUser.description);
        setLink(currentUser.link);
      }, [currentUser]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onClick={handleClear}
            name="image"
            title="Новое место"
            btn="Создать"
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
              <span className="popup__input-title-error input-error"></span>
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
              <span className="popup__input-img-error input-error"></span>
            </label>
            <button type="submit" className="popup__save-button">
            {props.isLoading ? 'Сохранение...' : 'Создать'}
            </button>
          </PopupWithForm>
    )
}

export default AddPlacePopup;