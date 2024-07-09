export const formatTitle = (title: string) => {
  const formatted = title.replace(" ", "-").toLocaleLowerCase();
  return formatted;
};

export const restoreTitle = (title: string) => {
  const restored = title.replace("-", " ").toLocaleLowerCase();
  return restored;
};
