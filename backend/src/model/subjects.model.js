import DataTypes from 'sequelize'
import sequelize from '../connection.js'

const SubjectsModel = sequelize.define(
  'Themes',
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'themes',
    timestamps: false,
  }
)

export default SubjectsModel
