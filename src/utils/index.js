export const isBrowser = () => typeof window !== 'undefined';

export const getInitials = (name) =>
  name
    .split(' ')
    .map((name) => name[0])
    .join('');
