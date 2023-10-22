export const userRoles = {
  user: 'user',
  admin: 'admin',
};

export const allRoles = Object.entries(userRoles).map((entries) => entries[1]);
export const adminRole = allRoles.filter((item) => item === 'admin');
