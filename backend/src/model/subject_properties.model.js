import DataTypes from 'sequelize'
import sequelize from '../connection.js'

const SubjectPropertiesModel = sequelize.define(
  'SubjectProperties',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    theme_id: {
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
    tableName: 'themes_properties',
    timestamps: false,
  }
)

export default SubjectPropertiesModel
