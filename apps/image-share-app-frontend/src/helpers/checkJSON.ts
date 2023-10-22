export const checkJSON = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

export default checkJSON;
