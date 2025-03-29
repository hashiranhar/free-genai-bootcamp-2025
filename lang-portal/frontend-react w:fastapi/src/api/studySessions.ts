import { useQuery } from 'react-query';
import axios from './client';

export const useStudySessions = (page: number) =>
    useQuery(['studySessions', page], async () => {
      const { data } = await axios.get(`/study_sessions?page=${page}`);
      return {
        sessions: data.sessions,
        hasMore: data.has_more,
      };
    }); 

  export const useStudySessionDetail = (id: string | number) =>
    useQuery(['studySessionDetail', id], async () => {
      const { data } = await axios.get(`/study_sessions/${id}`);
      return data;
    });
  
  export const useSessionWords = (id: string | number) =>
    useQuery(['sessionWords', id], async () => {
      const { data } = await axios.get(`/study_sessions/${id}/words`);
      return data;
    });
  