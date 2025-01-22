import { PersistConfig } from "./PersistConfig";
import { Dispatcher, Store } from "./";

export const storeTypeTag: unique symbol = Symbol("storeTypeTag")

export type MiddlewareStore<T, STORE_TYPE = string, S = (action: T | ((prev: T) => T)) => void> = {
  store: Store<T, S>,
  [storeTypeTag]: STORE_TYPE
}

export type Middleware = {
  devtools: <T>(initState: T | MiddlewareStore<T>, name: string)
    => MiddlewareStore<T, "devtools">
  persist: <T>(initState: T | MiddlewareStore<T>, persistConfig: PersistConfig<T>)
    => MiddlewareStore<T, "persist">
  reducer: <T, A extends { [x: string]: any, type: any }>(reducer: (state: T, action: A) => T, initState: T | MiddlewareStore<T>)
    => MiddlewareStore<T, "reducer", Dispatcher<A>>;
  zustand: <T>(initFn: (set: (nextState: Partial<T> | ((prev: T) => T)) => void, get: () => T, api: Store<T>) => T)
    => MiddlewareStore<T, "zustand">;
}