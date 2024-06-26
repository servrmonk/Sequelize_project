module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'sqllegasypassword24',
    DB:'node_sequelize_api_db',
    dialect:'mysql', //it can be postgress or mysql etc and pool have  some information 
    logging:false,
    pool:{
        max:5,min:0,acquire:30000,idle:10000
    }

}