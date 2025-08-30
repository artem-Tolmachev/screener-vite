export function formatDate(time: number) {
  const diffMs = Date.now() - time;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const days = Math.floor(diffMinutes / (60 * 24));
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
  const minutes = diffMinutes % 60;

  const parts = [];

  if (days > 0) parts.push(`${days}д`);
  if (hours > 0) parts.push(`${hours}ч`);
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes}мин`);

  return parts.join(' ');
}
