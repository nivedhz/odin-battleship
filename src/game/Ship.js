export const Ship = () => {
  return {
    length: 0,
    hitNo: 0,
    sunkStatus: false,
    hit() {
      this.hitNo++;
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
