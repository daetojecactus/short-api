import dayjs from 'dayjs';

export const formatDate = (createdAt: string) => dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss');
