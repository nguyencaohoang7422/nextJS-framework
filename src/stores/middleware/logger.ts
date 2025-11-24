import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    const prevState = get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (set as any)(...a);
    const nextState = get();

    console.groupCollapsed(
      `%caction ${name ? `[${name}]` : ""}`,
      "color: #03A9F4; font-weight: bold",
    );
    console.log("%cprev state", "color: #9E9E9E; font-weight: bold", prevState);
    console.log("%caction", "color: #03A9F4; font-weight: bold", a[0]);
    console.log("%cnext state", "color: #4CAF50; font-weight: bold", nextState);
    console.groupEnd();
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
