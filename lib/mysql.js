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
     time VARCHAR(100) NOT NULL,
     unixtime int(10) NOT NULL,
     PRIMARY KEY ( id )
    )  ENGINE=InnoDB DEFAULT CHARSET=utf8;`
let writer_menu_article = 
    `CREATE TABLE if not exists writer_menu_article (
      id int(11) unsigned NOT NULL AUTO_INCREMENT,
      uid int(11) NOT NULL,
      menu_name varchar(50) NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `
let writer_article = 
    `CREATE TABLE if not exists writer_article (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,
    uid int(11) NOT NULL,
    title varchar(100) NOT NULL DEFAULT '',
    content text,
    time VARCHAR(100) NOT NULL,
    unixtime int(10) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`    
// 建表
createTable(users)
createTable(writer_menu_article)
createTable(writer_article)


// 注册用户
let insertData =  ( value ) => {
    let _sql = "insert into users set nickname=?,password=?,mobile=?,time=?,unixtime=?;"
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
// 查找是否有这个文集名字
let findDataByWriterMenuName = ( uid , name ) => {
    let _sql = `select * from writer_menu_article where uid="${uid}" AND menu_name="${name}"`
    return query( _sql)
}
// 创建文集
let createWriterMenu = ( value ) => {
    let _sql = "insert into writer_menu_article set uid=?,menu_name=?;"
    return query( _sql, value )
}
// 查询用户所有文集
let userFindDataByWriter = ( uid ) => {
  let _sql = `select * from writer_menu_article where uid="${uid}"`
  return query( _sql)
}
// 创建文章
let createWriterArticle = ( value ) => {
  let _sql = "insert into writer_article set uid=?,title=?,content=?,time=?,unixtime=?;"
  return query( _sql, value )
}
// 查询某个子集下面的所有文章列表
let findDataByWriterArticleList = ( uid , writer_id ) => {
  let _sql = `select * from writer_article where uid="${uid}" ORDER BY id DESC`
  return query( _sql)
}
// 创建默认的两个子集
let createByWriterArticleMenu = (value) => {
  let _sql = "insert into writer_menu_article set uid=?,menu_name=?;"
  return query( _sql, value )
}

module.exports = {
    query,
    createTable,
    insertData,
    findDataByName,
    findDataByNameAndMobile,
    findDataByWriterMenuName,
    createWriterMenu,
    userFindDataByWriter,
    createWriterArticle,
    findDataByWriterArticleList,
    createByWriterArticleMenu
}