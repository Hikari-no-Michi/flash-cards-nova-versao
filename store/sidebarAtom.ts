'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const sidebarToggleAtom = atomWithStorage('sidebar', true);
