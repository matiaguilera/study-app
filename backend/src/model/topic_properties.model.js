import DataTypes from 'sequelize'
import sequelize from '../connection.js'

const TopicPropertiesModel = sequelize.define(
  'TopicProperties',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    property_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    property_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'topic_properties',
    timestamps: false,
  }
)

export default TopicPropertiesModel
