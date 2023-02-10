export const birthdateMask = (value) => {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([0-9]{2})([0-9]{2})([0-9]{4}).*/, "$1/$2/$3");
};
