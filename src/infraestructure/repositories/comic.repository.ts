import { http } from "infraestructure/http/http";
import { ComicDTO } from "infraestructure/http/dto/ComicDTO";
import { Comic } from "application/models/Comic.model";

export const comicRepository = {
  getComic: async (comicId: number): Promise<Comic> => {
    return await http
      .get<ComicDTO>(`${comicId}/info.0.json`)
      .then((comicDTO: ComicDTO) => {
        return {
          num: comicDTO.num,
          month: Number(comicDTO.month),
          link: comicDTO.link,
          year: Number(comicDTO.year),
          news: comicDTO.news,
          safe_title: comicDTO.safe_title,
          transcript: comicDTO.transcript,
          alt: comicDTO.alt,
          img: comicDTO.img,
          title: comicDTO.title,
          day: Number(comicDTO.day),
        };
      });
  },
  saveComicRating: async (comicId: number, rating: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(`${comicId}`, JSON.stringify(rating));
      // simulating latency
      setTimeout(() => {
        resolve(rating);
      }, 1000);
    });
  },
  getComicRating: async (comicId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const response = localStorage.getItem(`${comicId}`);
      // simulating latency

      setTimeout(() => {
        resolve(response ? JSON.parse(response) : 0);
      }, 1000);
    });
  },
};
