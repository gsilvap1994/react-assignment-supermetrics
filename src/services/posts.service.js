import { AUTH_TOKEN_KEY } from "../helper/constants";
import api from "./api.service";
import StorageLayer from "./storage.service";

export const getPosts = (page) => {
    const sl_token = StorageLayer.get({ key: AUTH_TOKEN_KEY });
    return api.get(`/assignment/posts?page${10}&sl_token=${sl_token}`)
}
