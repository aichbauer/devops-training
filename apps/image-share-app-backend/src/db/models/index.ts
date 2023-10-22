import User from './User';
import Image from './Image';

const initAssociations = () => {
  // User - UserAllergene relation -> 1:n
  User.hasMany(Image, {
    as: 'userAllergenes',
    foreignKey: {
      name: 'userId',
      field: 'user_id',
    },
  });
  Image.belongsTo(User, {
    as: 'userImages',
    foreignKey: {
      name: 'userId',
      field: 'user_id',
    },
  });
};

export { User, Image, initAssociations };
