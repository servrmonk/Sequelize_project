const dbConfig = require("../config/dbConfig"); //importing the info of  dbconfig
const { Sequelize, DataTypes } = require("sequelize");

// Creating the instance of the sequelize constructor
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, //if error will come it will override all the error using aliases it is optional but best practice
  logging:dbConfig.logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
// Authenticate using sequelize.authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated succesfully ");
  })
  .catch((err) => console.log("Error ", err));

//initialize empty object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel")(sequelize, DataTypes); //thisis the tablename of the database
db.reviews = require("./reviewModel")(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(()=>{
    console.log('yes re-sync done!');
})

module.exports = db;
