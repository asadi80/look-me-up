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
      // Facebook Link //
      link_url_facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // Twitter //
      link_url_twitter: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // LinkedIn //
      link_url_linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // GitHub Link //
      link_url_github: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // Instagram // 
      link_url_instagram: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // Youtube //
      link_url_youtube: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isURL: true
        }
      },
      // Blank URL link, to add a custom link or website or social media profile , 2/15/2022//
      link_url_custom: {
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