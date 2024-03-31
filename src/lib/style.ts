import styles from "./style.module.css";

export type ClassTag = keyof typeof styles;
const classTags = () => Object.keys(styles) as ClassTag[];

export const isClassTag = (s: string): s is ClassTag => s in styles;

export const className = (tag: ClassTag) => styles[tag];

type IClassTag = `${string}-${string}-${string}`;

type ParseClassInfo<T extends IClassTag> =
  T extends `${infer TARGET}-${infer AUTHOR}-${infer OPERATION}`
    ? {
        target: TARGET;
        author: AUTHOR;
        operation: OPERATION;
      }
    : never;

const classInfoFromClassTag = <T extends IClassTag>(
  classTag: T,
): ParseClassInfo<T> => {
  const [target, author, operation] = classTag.split("-");
  return {
    target,
    author,
    operation,
  } as ParseClassInfo<T>;
};

export type ClassInfo = ParseClassInfo<ClassTag>;
export const classInfos = (): ClassInfo[] =>
  classTags().map(classInfoFromClassTag);

const hasTargetAuthor =
  <T extends string, A extends string>(target: T, author: A) =>
  (i: ClassInfo): i is Extract<ClassInfo, { target: T; author: A }> =>
    i.target === target && i.author === author;

export const classInfosOf = <T extends string, A extends string>(
  target: T,
  author: A,
): Extract<ClassInfo, { target: T; author: A }>[] =>
  classInfos().filter(hasTargetAuthor(target, author));

export interface IClassInfo {
  target: string;
  author: string;
  operation: string;
}

export const classInfoFromProperties = <
  T extends string,
  A extends string,
  O extends string,
>(
  target: T,
  author: A,
  operation: O,
) => ({ target, author, operation }) satisfies IClassInfo;

export type ClassInfoTag<T extends IClassInfo> =
  `${T["target"]}-${T["author"]}-${T["operation"]}`;

export const classInfoTag = <T extends IClassInfo>(info: T): ClassInfoTag<T> =>
  `${info["target"]}-${info["author"]}-${info["operation"]}}`;

export type ClassInfoFromProperties<
  T extends string,
  A extends string,
  O extends string,
> = ReturnType<typeof classInfoFromProperties<T, A, O>>;
