export const jwtSecret = process.env.JWT_SECRET!; // use min 512 bit seret
export const issuer = process.env.JWT_ISSUER || 'devops-test';
export const audience = process.env.JWT_AUDIENCE || 'image-share-app';
export const language = process.env.JWT_LANGUAGE || 'en-US';
