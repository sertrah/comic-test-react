import { comicRepository } from "infraestructure/repositories/comic.repository";
import { Comic } from "application/models/Comic.model";

export const comicService = {
  getComic: (comicId: number): Promise<Comic> => {
    return comicRepository.getComic(comicId);
  },
  saveComicRating: (comicId: number, rating: number) => {
    return comicRepository.saveComicRating(comicId, rating);
  },
  getComicRating: (comicId: number) => {
    return comicRepository.getComicRating(comicId);
  },
};
