module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      rating: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
    }
    // { timestamp: false } this will stop showing created at updated at
  );
  return Review;
};
