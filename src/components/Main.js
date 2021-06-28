import { useContext } from "react";
import { useState, useEffect } from "react";
import Card from "./Card.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDeleteCard,
  onCardClick,
}) => {
  const { avatar, name, about } = useContext(CurrentUserContext); //сюда будет записываться имя пользователя

  const [cards, setCards] = useState([]); //подписываемся на CurrentUserContext, чтобы получить нужное значания контекста

  useEffect(() => {//вытаскиваем информацию о пользователе
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(likes, cardId, currentUserId) { // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some((card) => card._id === currentUserId);
    //я не поняла как делать обзщий запрос на сервер для двух методов в api
    if (isLiked) {//удаляем Лайк
      api
        .deleteLike(cardId)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else { //добавляем лайк
      api
        .addLike(cardId)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === cardId ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <main className="main">
      <section className="profile main__profile">
        <div
          className="profile__avatar-container profile__avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        >
          <button
            onClick={onEditAvatar}
            className="profile__avatar-button"
            type="button"
          ></button>
        </div>
        <div className="profile__conteiner">
          <h1 className="profile__name">{name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__open-button"
            type="button"
          ></button>
          <p className="profile__job">{about}</p>
        </div>
        <button
          id="popup-image__open-button"
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section id="elements" className="elements">
        <ul id="template__container" className="elements__container">
          {cards.map(({ likes, _id, name, link, owner }) => {
            return (
              <Card
                likes={likes}
                cardId={_id}
                name={name}
                link={link}
                owner={owner}
                key={`${owner}.${_id}`}
                onDeleteCard={onDeleteCard}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;


