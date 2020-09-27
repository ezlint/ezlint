module.exports = {
  '*.{ts,js,tsx,jsx,css,json,md}': ['prettier --write'],
  '*.{ts,js,tsx,jsx}': ['eslint --format=pretty --fix'],
};
