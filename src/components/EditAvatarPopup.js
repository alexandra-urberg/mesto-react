import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
    const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(//Передаём значения во внешний обработчик для измения аватара
          avatarRef.current.value
        );
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
        >
            <label className="popup__label">
                <input
                    ref={avatarRef}
                    type="url"
                    name="avatar"
                    className="popup__input"
                    placeholder="Ссылка на фотографию"
                    required
                />
                <span className="input-avatar-error input-error"></span>
            </label>
            <button type="submit" className="popup__save-button">
                {props.isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;