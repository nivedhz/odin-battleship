export const Ship = () => {
  return {
    name: "",
    length: 0,
    hitNo: 0,
    sunkStatus: false,
    hit() {
      this.hitNo++;
      this.isSunk();
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
