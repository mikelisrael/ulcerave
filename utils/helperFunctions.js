export const getTitle = (title) => {
  //  capitalize first letter
  title = title.charAt(0).toUpperCase() + title.slice(1);
  return (document.title = `${title} • Ulcerave`);
};
