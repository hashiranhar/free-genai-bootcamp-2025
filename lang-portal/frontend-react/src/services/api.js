import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getDashboardData = async () => {
  const lastStudySession = await axios.get(`${API_BASE_URL}/dashboard/last_study_session`);
  const studyProgress = await axios.get(`${API_BASE_URL}/dashboard/study_progress`);
  const quickStats = await axios.get(`${API_BASE_URL}/dashboard/quick_stats`);
  return { lastStudySession: lastStudySession.data, studyProgress: studyProgress.data, quickStats: quickStats.data };
};

export const getStudyActivities = async () => {
  const response = await axios.get(`${API_BASE_URL}/study_activities`);
  return response.data;
};

export const getStudyActivityDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/study_activities/${id}`);
  return response.data;
};

export const getWords = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/words`, { params: { skip: (page - 1) * 100, limit: 100 } });
  return response.data;
};

export const getWordDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/words/${id}`);
  return response.data;
};

export const getGroups = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/groups`, { params: { skip: (page - 1) * 100, limit: 100 } });
  return response.data;
};

export const getGroupDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/groups/${id}`);
  return response.data;
};

export const getStudySessions = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/study_sessions`, { params: { skip: (page - 1) * 100, limit: 100 } });
  return response.data;
};

export const getStudySessionDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/study_sessions/${id}`);
  return response.data;
};
