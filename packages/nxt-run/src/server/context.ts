import { type HelmetServerState } from 'react-helmet-async';
import { type RouteObject } from 'react-router-dom';
import { type StaticHandlerContext } from 'react-router-dom/server';

export type ManifestEntry = {
  type: string;
  href: string;
};

export type EntryContext = {
  manifest?: Record<string, ManifestEntry[]>;
  routes: RouteObject[];
  staticHandlerContext: StaticHandlerContext;
  helmetContext: {
    helmet: HelmetServerState;
  };
};

const componentsContext = new Set<string>();

// noinspection JSUnusedGlobalSymbols
export const components$ = {
  getComponents() {
    return componentsContext;
  },
  clearComponents() {
    componentsContext.clear();
  },
  addComponent(componentId: string): void {
    componentsContext.add(componentId);
  },
};
