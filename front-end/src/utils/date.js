import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getRelativeTime(isoTime) {
  if (!isoTime) return null;
  return dayjs(isoTime).fromNow();
}
