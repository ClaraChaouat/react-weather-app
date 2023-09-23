module.exports = {
  // ...
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  // ...
};
