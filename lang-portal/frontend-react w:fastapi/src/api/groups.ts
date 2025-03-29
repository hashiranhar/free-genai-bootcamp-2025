import { useQuery } from 'react-query';
import axios from './client';

export const useGroups = () =>
  useQuery(['groups'], async () => {
    const { data } = await axios.get('/groups');
    return data;
  });

export const useGroupList = () =>
  useQuery(['groupList'], async () => {
    const { data } = await axios.get('/groups');
    return data.groups;
  });

export const useGroupDetail = (id: string | number) =>
  useQuery(['groupDetail', id], async () => {
    const { data } = await axios.get(`/groups/${id}`);
    return data;
  });

export const useGroupWords = (id: string | number) =>
  useQuery(['groupWords', id], async () => {
    const { data } = await axios.get(`/groups/${id}/words`);
    return data.words; // ✅ fixed
  });

export const useGroupSessions = (id: string | number) =>
  useQuery(['groupSessions', id], async () => {
    const { data } = await axios.get(`/groups/${id}/study_sessions`);
    return data.study_sessions; // ✅ fixed
  });
