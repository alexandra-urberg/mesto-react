import React from 'react';

const Card = ({link, name, likes, onDeleteCard, onCardClick}) => {

    const handleCardClick = () => {//обработчик передающий информауию от card в ImagePopup для открытия полноразмерной картинки
        onCardClick({name, link})
    }

    return (
        <li className="element template__card">
            <button className="element__trash" onClick={onDeleteCard} type="button"></button>
            <img className="element__image" onClick={handleCardClick} src={link} alt={name} />
            <div className="element__block">
                <h2 className="element__quote">{name}</h2>
                <div className="element__like-container">
                    <button className="element__button-like" type="button"></button>
                    <p className="element__counter-likes">{likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;