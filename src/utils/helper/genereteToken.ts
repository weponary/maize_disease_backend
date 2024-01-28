const genrateToken = () => {
  const token = Date.now().toString(36);
  return token;
};

export default genrateToken;
