'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atom<'light' | 'dark'>('light');

export const authTokenAtom = atomWithStorage<string | null>('token', null);

export const isLoading = atomWithStorage<boolean>('isLoading', false);

export const isLoggedAtom = atomWithStorage<boolean>('isLogged', false);

export const sidebarToggleAtom = atomWithStorage<boolean>('sidebar', true);

export const modalLoginAtom = atom(false);

export const ShowNotifications = atom(false);

export const ShowOptionsProfile = atom(false);

export interface IReviewedQuestion {
    userId: string;
    questionId: string;
    status: 'correct' | 'incorrect';
    materiaId: string;
}
  
export const reviewedQuestionsAtom = atom<IReviewedQuestion[]>([]);





