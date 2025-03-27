import { useQuery } from 'react-query';
import axios from './client';

export const useLastStudySession = () =>
  useQuery(['lastStudySession'], async () => {
    const { data } = await axios.get('/dashboard/last_study_session');
    return data;
  });

export const useStudyProgress = () =>
  useQuery(['studyProgress'], async () => {
    const { data } = await axios.get('/dashboard/study_progress');
    return data;
  });

export const useQuickStats = () =>
  useQuery(['quickStats'], async () => {
    const { data } = await axios.get('/dashboard/quick_stats');
    return data;
  });
