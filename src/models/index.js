const Blog = require('./blog')
const List = require('./list')
const Session = require('./session')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)

Blog.belongsToMany(User, { through: List, as: 'reading_list' })
User.belongsToMany(Blog, { through: List, as: 'readings' })

module.exports = {
  Blog,
  List,
  Session,
  User,
}
