"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ReadyState = { ready: boolean; setReady: (value: boolean) => void };

const ReadyContext = createContext<ReadyState>({ ready: false, setReady: () => {} });

/** `ready` flips to true when the loading screen hands off, which triggers the hero entrance. */
export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>;
}

export const useReady = () => useContext(ReadyContext);
