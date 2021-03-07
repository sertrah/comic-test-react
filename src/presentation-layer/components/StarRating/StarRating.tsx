import React, { FunctionComponent } from "react";

type StarRating = {
  handleInputValue: (a: number)=> void;
  totalStars: number;
  value: number;
};

const InputStar: FunctionComponent<StarRating> = ({
  totalStars,
  handleInputValue,
  value,
}) => {
  let stars = [];
  for (let index = 1; index <= totalStars; index++) {
    stars.push(<span className="icon" key={`${value}-star-${index}`}>★</span>);
  }
  return (
    <label >
      <input
        type="radio"
        name="stars"
        value={totalStars}
        checked={totalStars === value}
        onChange={(event) => handleInputValue(Number(event.target.value))}
      />
      {stars}
    </label>
  );
};

const StarRating: FunctionComponent<StarRating> = ({
  handleInputValue,
  totalStars,
  value,
}) => {
  const starInputs = [];

  for (let acc = 1; acc <= totalStars; acc++) {
    starInputs.push(
      <InputStar
        totalStars={acc}
        handleInputValue={handleInputValue}
        value={value}
        key={`${acc}-star`}
      />
    );
  }
  return <div className="rating">{starInputs}</div>;
};

export default StarRating;
