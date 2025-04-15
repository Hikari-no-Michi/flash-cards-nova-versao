'use client';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import dayjs from 'dayjs';


interface IUserAtom {
  _id: string;
  username: string;
  fullName?: string;
  email?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: string;
  paymentDate?: string | null;
}

export interface ReviewedQuestionType {
  userId: string;
  questionId: string;
  status: 'correct' | 'incorrect';
  materiaId: string;
  createdAt?: Date; 
}

export const paginaAtom = atom('PageDashboard');

export const reviewedQuestionsAtom = atom<ReviewedQuestionType[]>([]);

export const themeAtom = atom<'light' | 'dark'>('light');

export const authTokenAtom = atomWithStorage<string | null>('token', null);

export const isLoading = atomWithStorage<boolean>('isLoading', false);

export const isLoggedAtom = atomWithStorage<boolean>('isLogged', false);

export const sidebarToggleAtom = atomWithStorage<boolean>('sidebar', true);

export const modalLoginAtom = atom(false);

export const isRegisterFormAtom = atom(false);

export const ShowNotifications = atom(false);

export const ShowOptionsProfile = atom(false);

export const userAtom = atomWithStorage<IUserAtom | null>('user', null);

export const isTrialExpiredAtom = atom((get) => {
  const user = get(userAtom);
  const isLogged = get(isLoggedAtom);

  if (user === null || isLogged === null) return 'loading';

  if (!isLogged || !user) return 'not_logged';

  const createdAt = user.createdAt;
  if (!createdAt) return 'no_createdAt';

  const expirationDate = dayjs(createdAt).add(2, 'day');
  const now = dayjs();
  const isExpired = now.isAfter(expirationDate);

  if (user.paymentStatus === 'unpaid' && !isExpired) return 'trial_active';
  if (user.paymentStatus === 'paid') return 'paid';
  if (user.paymentStatus === 'unpaid' && isExpired) return 'expired';  

  return 'trial_active';
});


