import React, { FC } from "react";
import { Comic } from "application/models/Comic.model";

const Card: FC<{ comic: Comic }> = ({ comic, children }) => {
  return (
    <article className="comic-card" aria-label="card containing information about comic">
      <div className="comic-card__img">
        <img src={comic.img} alt={comic.alt} />
      </div>
      <div className="comic-card__content">
        <span className="comic-card__date">{`${comic.day}/ ${comic.month}/ ${comic.year}`}</span>
        <h1 className="comic-card__title">{comic.title}</h1>
        <p className="comic-card__text">{comic.transcript}</p>
        <div className="comic-card__action">{children}</div>
      </div>
    </article>
  );
};

export default Card;
