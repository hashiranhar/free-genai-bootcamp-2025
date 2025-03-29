import { useMutation } from 'react-query';
import axios from './client';

export const useResetHistory = () =>
  useMutation(() => axios.post('/reset_history'));

export const useFullReset = () =>
  useMutation(() => axios.post('/full_reset'));
