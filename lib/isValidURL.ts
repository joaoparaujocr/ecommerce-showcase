export const isValidUrl = (url: string): boolean => {
  const regex = /^(http|https):\/\//;

  return regex.test(url);
};