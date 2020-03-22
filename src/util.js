export const formatDate = dateTime => {
  const d = new Date(dateTime);

  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDay()}`;
};
