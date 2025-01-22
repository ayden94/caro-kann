import { PersistConfig } from "./PersistConfig";
import { Dispatcher, Store } from "./";

export const storeTypeTag: unique symbol = Symbol("storeTypeTag")

export type MiddlewareStore<
  TInitState,
  TStoreType = string,
  TSetStore = (action: TInitState | ((prev: TInitState) => TInitState)) => void
> = {
  store: Store<TInitState, TSetStore>,
  [storeTypeTag]: TStoreType
}

export type Middleware = {
  devtools: <T>(initState: T | MiddlewareStore<T>, name: string)
    => MiddlewareStore<T, "devtools">
  persist: <T>(initState: T | MiddlewareStore<T>, persistConfig: PersistConfig<T>)
    => MiddlewareStore<T, "persist">
  reducer: <T, A extends object>(reducer: (state: T, action: A) => T, initState: T | MiddlewareStore<T>)
    => MiddlewareStore<T, "reducer", Dispatcher<A>>;
  zustand: <T>(initFn: (set: (nextState: Partial<T> | ((prev: T) => T)) => void, get: () => T, api: Store<T>) => T)
    => MiddlewareStore<T, "zustand">;
}