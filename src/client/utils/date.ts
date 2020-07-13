import dayjs from 'dayjs';

export const formatDate = (d: string) => dayjs(d).format('MM/DD/YYYY');
