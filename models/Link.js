const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Link extends Model {}

// create fields/columns for Post model
Link.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      
      link_url_facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      link_url_twitter: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      link_url_linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      link_url_github: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      link_url_intagram: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      link_url_youtube: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'link'
    }
  );
  module.exports = Link;