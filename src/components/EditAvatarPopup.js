import { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

///Подскажите, пожалуйста, как тут надо сделать валидацию. Огромное спасибо!!!

const EditAvatarPopup = (props) => {
    const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную
    const [validationErrors, setValidationErrors] = useState({avatar: ''});//стейт валидации инпутов

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(//Передаём значения во внешний обработчик для измения аватара
          avatarRef.current.value
        );
    }
    
    function handleChangeAvatar(e) {
        const { value } = e.target;
        let errors = validationErrors;

        const spx = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    
        !spx.test(value) ? errors = 'Введите URL.' : errors = '' && setValidationErrors(errors);
    }

    useEffect(() => {
        avatar.current.value = '';
        setValidationErrors('');
    }, [props.isOpen]);


    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            disabled={validationErrors}
            btn={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <label className="popup__label">
                <input
                    ref={avatarRef}
                    type="url"
                    name="avatar"
                    className="popup__input"
                    placeholder="Ссылка на фотографию"
                    onChange={handleChangeAvatar}
                    required
                />
                <span className={`${validationErrors.avatar ? "popup__input-error" : null}`}>{validationErrors}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
