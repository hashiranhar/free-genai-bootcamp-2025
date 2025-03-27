import { useQuery } from 'react-query';
import axios from './client';

export const useWords = (page: number) =>
  useQuery(['words', page], async () => {
    const { data } = await axios.get(`/words?page=${page}`);
    return data;
  });

  export const useWordDetail = (id: string | number) =>
    useQuery(['wordDetail', id], async () => {
      const { data } = await axios.get(`/words/${id}`);
      return data;
    });
  