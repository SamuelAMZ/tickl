const trimData = (targetData, lengthSize) => {
  // trim too long data strings
  if (targetData) {
    if (targetData.length >= lengthSize) {
      return targetData.slice(0, lengthSize) + "...";
    } else {
      return targetData;
    }
  }
};

export default trimData;
