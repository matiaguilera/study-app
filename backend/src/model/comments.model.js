import { DataTypes } from 'sequelize'
import sequelize from '../connection.js'

const CommentsModel = sequelize.define(
  'Comments',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    create_date: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    theme_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'comments',
    timestamps: false,
  }
)

export default CommentsModel
