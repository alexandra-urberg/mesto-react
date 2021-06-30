import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = (props) => {
    function handleDelete(e) {
        e.preventDefault();//Запрещаем браузеру переходить по адресу формы
        props.onCardDelete();//Передаём значения управляемых компонентов во внешний обработчик);
    } 

    return (
        <PopupWithForm
        isOpen={props.isOpen}
        onSubmit={handleDelete}
        onClose={props.onClose}
        name="card-delete"
        title="Вы уверены?"
        >
            <button type="submit" className="popup__save-button">
                {props.isLoading ? 'Удаляем...' : 'Да'}
            </button>
        </PopupWithForm>
    )
}

export default DeleteCardPopup;
