import { nodejs } from './node';
import { react } from './react';
import { unix } from './unix';

export type Query = { type: string; name: string; message: string; answer: string };
export interface Subject {
  queries: Query[];
}
export interface SubCategory {
  [key: string]: Subject;
}
export interface Subjects {
  [key: string]: Subject | SubCategory;
}

export const subjects: Subjects = { nodejs, react, unix };

export const logo = `
╔═╗─────────────╔╗
║╦╩╦═╦═╦═╦═╦╦╦╦╦╝╠═╗╔╦╗
║╩╗║╔╩╗║╔╣╩╣╔╣║║╬║╬╚╣║║
╚═╩═╝─╚═╝╚═╩╝╠╗╠═╩══╬╗║
─────────────╚═╝────╚═╝`;

export const slogan = 'Get a little bit better evveryday';
