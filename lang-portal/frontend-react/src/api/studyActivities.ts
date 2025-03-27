import { useQuery } from 'react-query';
import axios from './client';

export const useStudyActivities = () =>
  useQuery(['studyActivities'], async () => {
    const { data } = await axios.get('/study_activities');
    return data;
  });

  export const useStudyActivity = (id: string | number) =>
    useQuery(['studyActivity', id], async () => {
      const { data } = await axios.get(`/study_activities/${id}`);
      return data;
    });
  
  export const useActivitySessions = (id: string | number) =>
    useQuery(['activitySessions', id], async () => {
      const { data } = await axios.get(`/study_activities/${id}/study_sessions`);
      return data;
    });
  

    export const useLaunchActivity = () =>
        useMutation(async (payload: { activity_id: number; group_id: number }) => {
          const { data } = await axios.post('/study_activities', payload);
          return data;
        });
      