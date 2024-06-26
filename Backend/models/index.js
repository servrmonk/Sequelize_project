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

// 1 to Many Relations implementations
db.products.hasMany(db.reviews,{
  foreignKey:'product_id' ,
  as:'review' //product table or product model now knows that there is review table as well 
})

db.reviews.belongsTo(db.products,{
  foreignKey:'product_id', //this should be same key in both 
  as:'product'

})
 //review doesn't have the information that is product_id

module.exports = db;
