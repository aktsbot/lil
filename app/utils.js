import { nanoid } from "nanoid";

export const makeToken = () => {
  return nanoid(15);
};

export const makeId = () => {
  return nanoid(6);
};
