'use client';
import { atomWithStorage } from 'jotai/utils';

export const authTokenAtom = atomWithStorage<string | null>('token', null);
