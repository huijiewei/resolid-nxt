import { type FilledContext } from 'react-helmet-async';
import { type RouteObject } from 'react-router-dom';
import { type StaticHandlerContext } from 'react-router-dom/server';

export type ManifestEntry = {
  type: string;
  href: string;
};

export type EntryContext = {
  manifest?: Record<string, ManifestEntry[]>;
  routes: RouteObject[];
  staticHandlerContext: StaticHandlerContext | Response | null;
  helmetContext?: FilledContext;
};

const componentsContext = new Set<string>();

export const components$ = {
  getComponents() {
    return componentsContext;
  },
  addComponent(componentId: string): void {
    componentsContext.add(componentId);
  },
};
