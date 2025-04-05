'use client';
import { atomWithStorage } from 'jotai/utils';

export const sidebarToggleAtom = atomWithStorage('sidebar', true);
