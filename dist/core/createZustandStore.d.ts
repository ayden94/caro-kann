import { Store } from "../types";
export declare function createZustandStore<T>(initFn: (set: (nextState: Partial<T> | ((prev: T) => T)) => void, get: () => T, api: Omit<Store<T>, "getInitState">) => T): Store<T>;
