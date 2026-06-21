const Ship = (name, length) => {
  return {
    name,
    length,
    hitNo: 0,
    sunkStatus: false,
    hit() {
      if (!this.isSunk()) {
        this.hitNo++;
        this.isSunk();
      } else return;
    },
    isSunk() {
      if (this.hitNo >= this.length) {
        this.sunkStatus = true;
        return true;
      }
      return false;
    },
  };
};
export default Ship;
