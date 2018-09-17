module.exports = {
 database: process.env.DATADASE || 'mongodb://localhost:27017/hmongtraveling',
 port: process.env.PORT || 3000,
 secret: process.env.SECRET || 'hmongtravelling223344556677889900',
 jwt_key:process.env.JWT_KEY || 'hmongtravelling223344jwts'
}