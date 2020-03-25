export const dateYmd = (date: Date): string => {
  const formattedDate = date.toDateString();
  const [, month, day, year] = formattedDate.split(' ');
  return `${year}-${month}-${day}`;
};
