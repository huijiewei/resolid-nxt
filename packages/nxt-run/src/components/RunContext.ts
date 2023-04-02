import { createContext, useContext } from 'react';
import { type StaticHandlerContext } from 'react-router-dom/server';
import type { RouteObject } from 'react-router-dom';
import type { FilledContext } from 'react-helmet-async';

export type ManifestEntry = {
  type: string;
  href: string;
};

export type RunContextValue = {
  manifest?: Record<string, ManifestEntry[]>;
  helmetContext?: FilledContext;
  routes: RouteObject[];
  staticHandlerContext: StaticHandlerContext | Response | null;
};

export const RunContext = createContext<RunContextValue>({} as unknown as RunContextValue);

export const useRunContext = () => useContext(RunContext);
