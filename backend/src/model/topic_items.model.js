import DataTypes from 'sequelize'
import sequelize from '../connection.js'

const TopicItemsModel = sequelize.define(
  'TopicItems',
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
    create_date: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'topic_items',
    timestamps: false,
  }
)

export default TopicItemsModel
