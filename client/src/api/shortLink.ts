import api from '@/utils/api';
import { Analytics } from './statistics';

export interface CreateShortLinkDto {
  originalUrl: string;
  alias?: string;
  expiresAt?: string;
}

export interface ShortLinkInfo {
  id: number;
  alias: string;
  originalUrl: string;
  createdAt: string;
  expiresAt?: string;
  statistics?: Analytics[];
}

export async function createShortLink(data: CreateShortLinkDto) {
  const response = await api.post('/shorten', data);
  return response.data;
}

export async function getShortLinkInfo(alias: string): Promise<ShortLinkInfo> {
  const response = await api.get(`/info/${alias}`);
  return response.data;
}

export async function deleteShortLink(alias: string): Promise<{ message: string }> {
  const response = await api.delete(`/delete/${alias}`);
  return response.data;
}
