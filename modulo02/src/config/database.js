module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    imestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
