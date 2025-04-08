'use client';
import { atomWithStorage } from 'jotai/utils';

export const sidebarToggleAtom = atomWithStorage<boolean>('sidebar', true);
