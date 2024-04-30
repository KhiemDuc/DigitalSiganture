module.exports = (...props) => {
  try {
    props.forEach((element) => {
      if (element === null || element === undefined) throw new Error("Null");
    });
  } catch (err) {
    return false;
  }
  return true;
};
