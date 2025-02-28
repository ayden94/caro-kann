import { PersistConfig, PersistUtils } from "../types";

export function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
}

export const execMigrate: PersistUtils["execMigration"] = ({ storageKey, storageType, migrate }) => {
  const { version: newVersion, strategy } = migrate!;

  if (storageType === "local") {
    const { state, version } = JSON.parse(localStorage.getItem(storageKey)!);

    // 상태 버전이 신규 버전보다 낮을 경우 마이그레이션 실행
    if (newVersion > version)
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          state: strategy(state, version),
          version: newVersion,
        })
      );
  } else if (storageType === "cookie") {
    const { state, version } = JSON.parse(getCookie(storageKey)!);

    if (newVersion > version)
      document.cookie = `${storageKey}=${JSON.stringify({
        state: strategy(state, version),
        version: newVersion,
      })}`;
  }
};

export const getStorage: PersistUtils["getStorage"] = ({
  storageKey,
  storageType,
  migrate,
  initState,
}) => {
  try {
    let storedValue: string | null = null;

    migrate && storageType && execMigrate({ storageKey, storageType, migrate });

    if (storageType === "local") {
      storedValue = localStorage.getItem(storageKey);
    } else if (storageType === "session") {
      storedValue = sessionStorage.getItem(storageKey);
    } else if (storageType === "cookie") {
      storedValue = getCookie(storageKey);
    }

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  } catch (e) {
    if (typeof window !== "undefined")
      console.error("Caro-Kann : Failed to read from storage");
  }
  
  return { state: initState, version: 0 };
};

export const parseOptions = <T>(StorageConfig?: PersistConfig<T>) => {
  const storageKey =
    StorageConfig?.local ??
    StorageConfig?.cookie ??
    StorageConfig?.session ??
    "";
  const storageType = StorageConfig?.local
    ? "local"
    : StorageConfig?.cookie
    ? "cookie"
    : StorageConfig?.session
    ? "session"
    : null;
  const storageVersion = StorageConfig?.migrate?.version ?? 0;
  const migrate = StorageConfig?.migrate;

  return { storageKey, storageType, storageVersion, migrate } as const;
};

export const setStorage: PersistUtils["setStorage"] = ({
  storageKey,
  storageType,
  storageVersion: version,
  value: state,
}) => {
  const encodedState = JSON.stringify({ state, version });
  try {
    if (storageType === "local") {
      localStorage.setItem(storageKey, encodedState);
    } else if (storageType === "session") {
      sessionStorage.setItem(storageKey, encodedState);
    } else if (storageType === "cookie") {
      document.cookie = `${storageKey}=${encodedState}`;
    }
  } catch (e) {
    if (typeof window !== "undefined")
      console.error("Caro-Kann : Failed to write to storage", e);
  }
};