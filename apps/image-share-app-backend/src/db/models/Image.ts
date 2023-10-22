import { DataTypes, Model, UUIDV4 } from 'sequelize';

import database from '../database';
import { paranoid, updatedAt } from './modelOptions';

const tableName = 'images';

interface ImageModel {
  id: string;
  path: string;
  userId: string;
  createdBy: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  deletedAt: string;
  deletedBy: string;
}

class Image extends Model<Partial<ImageModel>> {}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      field: 'id',
    },
    path: {
      type: DataTypes.TEXT,
      field: 'path',
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
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
  },
);

export default Image;
