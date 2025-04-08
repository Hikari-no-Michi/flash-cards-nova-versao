'use client';
import { atomWithStorage } from 'jotai/utils';

export const isLoading = atomWithStorage<boolean>('isLoading', false);
