import { IStyles, styles } from "./style.css";

const getOptionClassNamesImpl =
  <S extends IStyles>(styles: S) =>
  <E extends keyof S>(element: E) =>
  (author: keyof S[E]) =>
    Object.values(styles[element][author]);

export const getOptionClassNames = getOptionClassNamesImpl(styles);

const getClassNameImpl =
  <S extends IStyles>(styles: S) =>
  <E extends keyof S>(element: E) =>
  <A extends keyof S[E]>(author: A) =>
  (option: keyof S[E][A]): string =>
    styles[element][author][option];

export const getClassName = getClassNameImpl(styles);
