const Blog = require('./blog')
const User = require('./user')
const List = require('./list')

Blog.belongsTo(User)
User.hasMany(Blog)

Blog.belongsToMany(User, { through: List })
User.belongsToMany(Blog, { through: List })

module.exports = {
  Blog,
  User,
  List,
}
