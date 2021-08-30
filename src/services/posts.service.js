import { AUTH_TOKEN_KEY } from '../helper/constants';
import api from './api.service';
import StorageLayer from './storage.service';

export const getPosts = (page) => {
  const slToken = StorageLayer.get({ key: AUTH_TOKEN_KEY });
  return api.get(`/assignment/posts?page${page}&sl_token=${slToken}`);
};
