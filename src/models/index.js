const Blog = require('./blog')
const User = require('./user')
const List = require('./list')

Blog.belongsTo(User)
User.hasMany(Blog)

Blog.belongsToMany(User, { through: List, as: 'reading_list' })
User.belongsToMany(Blog, { through: List, as: 'readings' })

module.exports = {
  Blog,
  User,
  List,
}
