import { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

///Подскажите, пожалуйста, как тут надо сделать валидацию. Огромное спасибо!!!

const EditAvatarPopup = (props) => {
    const avatarRef = useRef(''); // записываем объект, возвращаемый хуком, в переменную
    const [validationErrors, setValidationErrors] = useState('');//стейт валидации инпутов
    const [value, setValue] = useState(''); //стейт для значения инпута

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(//Передаём значения во внешний обработчик для измения аватара
          avatarRef.current.value
        );
    }

    function handleChange(e) {
        const input = e.target;
        const {value, validity} = input;
        let error = validationErrors;
        setValue(value);

        validity.typeMismatch ? error = 'Введите URL.' : error = '' && setValidationErrors(error);
    }

    useEffect(() => {
        setValue('');
        setValidationErrors('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            disabled={validationErrors || !avatarRef.current.value }
            btn={props.isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <label className="popup__label">
                <input
                    ref={avatarRef}
                    value={value}
                    type="url"
                    name="avatar"
                    className="popup__input"
                    placeholder="Ссылка на фотографию"
                    onChange={handleChange}
                    pattern= "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i"
                    required
                />
                <span className={`${validationErrors ? "popup__input-error" : null}`}>{validationErrors}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
