import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  UUIDV4,
} from 'sequelize';

import database from '../database';
import { paranoid, updatedAt } from './modelOptions';
import Image from './Image';

const tableName = 'users';

interface UserModel {
  id: string;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdBy: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  deletedAt: string;
  deletedBy: string;
}

class User extends Model<Partial<UserModel>> {
  // One User has many Image(s)
  public addImage!: HasManyAddAssociationMixin<Image, string>;

  public getImages!: HasManyGetAssociationsMixin<Image>;

  public hasImage!: HasManyHasAssociationMixin<Image, string>;

  public countImages!: HasManyCountAssociationsMixin;

  public readonly images?: Image[];

  public static associations: {
    images: Association<User, Image>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      field: 'id',
    },
    role: {
      type: DataTypes.TEXT,
      field: 'role',
    },
    userName: {
      type: DataTypes.TEXT,
      field: 'user_name',
    },
    firstName: {
      type: DataTypes.TEXT,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.TEXT,
      field: 'last_name',
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      field: 'email',
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password',
    },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    lastUpdatedBy: {
      type: DataTypes.UUID,
      field: 'last_updated_by',
    },
    lastUpdatedAt: {
      type: DataTypes.DATE,
      field: 'last_updated_at',
    },
    deletedBy: {
      type: DataTypes.UUID,
      field: 'deleted_by',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  },
  {
    tableName,
    sequelize: database,
    paranoid,
    updatedAt,
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password'],
        },
      },
    },
  },
);

export default User;
