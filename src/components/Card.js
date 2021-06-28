import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({
  link,
  name,
  likes,
  owner,
  cardId,
  onDeleteCard,
  onCardClick,
  onCardLike,
}) => {
  const currentUserId = useContext(CurrentUserContext)._id; //подписываемся на CurrentUserContext
  const isOwn = owner._id === currentUserId; // Определяем, являемся ли мы владельцем текущей карточки

  const cardDeleteButtonClassName = // Создаём переменную, которую после зададим в `className` для кнопки удаления
    `element__trash ${isOwn ? "element__trash_visible" : ""}`;

  const isLiked = likes.some((i) => i._id === currentUserId); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = `element__button-like ${ // Создаём переменную, которую после зададим в `className` для кнопки лайка
    isLiked ? "element__button-like_active" : ""
  }`; 

  const handleCardClick = () => { //обработчик передающий информауию от card в ImagePopup для открытия полноразмерной картинки
    onCardClick({ name, link });
  };
  const hadleLikeClick = () => {
    onCardLike(likes, cardId, currentUserId);
  };

  return (
    <li className="element template__card">
      <button
        className={cardDeleteButtonClassName}
        onClick={onDeleteCard}
        type="button"
      ></button>
      <img
        className="element__image"
        onClick={handleCardClick}
        src={link}
        alt={name}
      />
      <div className="element__block">
        <h2 className="element__quote">{name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={hadleLikeClick}
            type="button"
          ></button>
          <p className="element__counter-likes">{likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;

