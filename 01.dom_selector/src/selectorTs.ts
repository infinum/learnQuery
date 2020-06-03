// eslint-disable-next-line @typescript-eslint/no-unused-vars
const domSelector = (selectors: string) => {
  if ((/[^A-Za-z0-9.#\-\s]/.test(selectors)) && !selectors) {
    throw new Error('Selector contains faulty characters');
  }
  return Array.from(document.querySelectorAll(selectors));
};
