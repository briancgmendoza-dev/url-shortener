import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from '../sequelize/initialize-connection'

interface UrlAttributes {
  id: number;
  original_url: string;
  shortened_url: string;
  created_at: Date;
  expires_at: Date | null;
  utm_parameters: string | null;
  is_active: boolean;
}

interface UrlCreationAttributes extends Optional<UrlAttributes, 'id' | 'created_at'> {}

class Url extends Model<UrlAttributes, UrlCreationAttributes> implements UrlAttributes {
  public id!: number;
  public original_url!: string;
  public shortened_url!: string;
  public created_at!: Date;
  public expires_at!: Date | null;
  public utm_parameters!: string | null;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    original_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shortened_url: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    utm_parameters: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    sequelize: sequelize,
    modelName: 'Url',
    tableName: 'urls',
    timestamps: false
  }
)

export default Url
