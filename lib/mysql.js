var mysql = require('mysql')
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
})

let query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          resolve( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  
  }
  
let createTable = function( sql ) {
    return query( sql, [] )
}

let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     nickname VARCHAR(100) NOT NULL,
     mobile VARCHAR(20) NOT NULL,
     password VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    ) DEFAULT CHARSET=UTF8;`

// 建表
createTable(users)


// 注册用户
let insertData =  ( value ) => {
    let _sql = "insert into users set nickname=?,password=?,mobile=?,moment=?;"
    return query( _sql, value )
}
// 通过名字查找用户
let findDataByName =  ( name ) => {
    let _sql = `select * from users where nickname="${name}";`
    return query( _sql)
}
// 通过名字或者手机号码查找用户
let findDataByNameAndMobile = (name) => {
    let _sql = `select * from users where nickname="${name}" OR mobile="${name}" `
    return query( _sql)
}

module.exports = {
    query,
    createTable,
    insertData,
    findDataByName,
    findDataByNameAndMobile
}