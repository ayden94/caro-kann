import { useSyncExternalStore } from "react";
import { setNestedStore } from "../utils/setNestedStoreUtils";
export const useStoreSync = ({ Store, storeTag, }) => {
    function useStore(selector = (state) => state) {
        const { getStore, setStore, subscribe, getInitState } = Store;
        const board = useSyncExternalStore(subscribe, () => selector(getStore()), () => selector(getInitState()));
        if (storeTag === "zustand")
            return board;
        if (selector && storeTag !== "reducer")
            return [
                board,
                setNestedStore(setStore, selector),
                setStore,
            ];
        else
            return [board, setStore];
    }
    ;
    useStore.derived = (selector) => useStore(selector)[0];
    return useStore;
};
