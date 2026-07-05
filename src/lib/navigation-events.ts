'use client';

export const ROUTE_LOADING_EVENT = 'verse:route-loading';

export function emitRouteLoading(payload: { label: string; href: string }) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ROUTE_LOADING_EVENT, { detail: payload }));
}
