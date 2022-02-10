const User = require("./User");
const Link = require("./Link");
const Profile = require("./Profile");


// create associations
User.hasMany(Link, {
    foreignKey: 'user_id'
  });

  Link.belongsTo(User, {
    foreignKey: 'user_id',
  });

  User.hasMany(Profile, {
    foreignKey: 'user_id'
  });

  Profile.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Link, Profile };