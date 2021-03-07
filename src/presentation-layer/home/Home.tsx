import React, { FunctionComponent, useMemo } from "react";
import { useQuery } from "react-query";
import { useNotification } from "application/hooks";

import { comicService } from "application/services/Comic.service";
import { StarRating, Card, Loader } from "presentation-layer/components";
import { commonHelper } from "application/helper";
import { Comic } from "application/models/Comic.model";

// I did this part because it did not work for me to consume the resource either with http or https or proxys
const cardFake = {
  month: 8,
  num: 628,
  link: "",
  year: 2009,
  news: "",
  safe_title: "Psychic",
  transcript:
    "Man: I'm psychic, you know. Woman: There's no such thing. Man: Okay, think of a number from one to one hundred. Woman: Okay. Man: 43. Woman: Holy shit! Man: I try not to let it affect my life too much. Woman: Wait, I can't believe this. Man: Don't worry about it. Forget I said anything. Woman: But-- Man: Let's get to the movie. Woman: I, uh... Ok, sure. Narrator: This trick may only work 1% of the time, but when it does, it's totally worth it. {{Title text: You can do a lot better than 1% if you start keeping track of the patterns in what numbers people pick.}}",
  alt:
    "You can do a lot better than 1% if you start keeping track of the patterns in what numbers people pick.",
  img: "https://imgs.xkcd.com/comics/psychic.png",
  title: "Psychic",
  day: 26,
};

const Home: FunctionComponent = () => {
  const [starsSelected, setStarsSelected] = React.useState<number>(2);
  const randomNumber = useMemo(() => commonHelper.getRandomNumber(700), []);
  const notify = useNotification();

  const { data: comic, isLoading } = useQuery(
    ["comic", randomNumber],
    ({ queryKey: [, ramdonNumber] }) => comicService.getComic(ramdonNumber),
    {
      retry: 1,
      retryDelay: 3000,
      onSuccess: (comicResponse) => {
        comicService.getComicRating(comicResponse.num).then((rating) => {
          setStarsSelected(rating);
        });
      },
      onError: ({ message }) => {
        notify.error({
          title: "Comic",
          message: `${message}. You are looking at an old comic`,
        });
      },
    }
  );

  const comicValidator: Comic = useMemo(() => comic ?? cardFake, [comic]);

  const onSaveRating = (rating: number) => {
    // It is not wrong to make sure for possible errors: D
    try {
      if (comicValidator) {
        setStarsSelected(rating);
        comicService.saveComicRating(comicValidator.num, rating).then(() => {
          notify.success({
            title: "Comic",
            message: "Thanks for voting",
          });
        });
      }
    } catch (error) {
      notify.error({
        title: "Comic",
        message: `What a shame, contact support`,
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {comicValidator ? (
        <Card comic={comicValidator}>
          <StarRating
            handleInputValue={onSaveRating}
            totalStars={5}
            value={starsSelected}
          />
        </Card>
      ) : (
        <h1 className="title__error">
          Ups something is wrong, please try again later
        </h1>
      )}
    </>
  );
};

export default Home;
