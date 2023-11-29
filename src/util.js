export const formatDate = dateTime => {
  const d = new Date(Number(dateTime));

  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
};
