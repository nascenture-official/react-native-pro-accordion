// bob.config.js
module.exports = {
  source: "./src",
  output: "./lib",
  targets: [
    [
      "module",
      {
        esm: true,
      },
    ],
    [
      "commonjs",
      {
        esm: false,
      },
    ],
  ],
};
