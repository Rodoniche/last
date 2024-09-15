import { request } from "./api";

export const auth = (username, password) =>
  request("post", "/token", { username, password }, false);
