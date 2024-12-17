import { Context } from "react";
export interface Board<T> {
    getBoard: () => T;
    setBoard: (action: T | ((prev: T) => T)) => void;
    subscribe: (callback: () => void) => () => void;
}
export type setBoard<T> = Pick<Board<T>, "setBoard">["setBoard"];
export type CreateBoard = <T>(initValue: T) => Board<T>;
export type UseBoard<T> = {
    (): readonly [T, setBoard<T>];
    <S>(selector: (state: T) => S): readonly [S, (action: S | ((prev: S) => S)) => void];
};
export type UseStore = {
    <T>(initialState: T, Board: Context<Board<T>>): readonly [T, setBoard<T>];
    <T, S>(initialState: T, Board: Context<Board<T>>, selector: (board: T) => S): readonly [S, (action: S | ((prev: S) => S)) => void];
};
