import api from '@/utils/api';

export interface Statistic {
  message: string;
  id: number;
}

export interface Analytics {
  count: number;
  ips: string[];
}

export async function createStatistic(alias: string): Promise<Statistic> {
  const response = await api.post(`/analytics/${alias}`);
  return response.data;
}

export async function getAnalytics(alias: string): Promise<Analytics> {
  const response = await api.get(`/analytics/${alias}`);
  return response.data;
}
