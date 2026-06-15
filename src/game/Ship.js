export const Ship = () => {
  return {
    length,
    hitNo,
    sunkStatus,
    hit() {
      this.hitNo++;
    },
    isSunk() {
      if (this.hitNo >= this.length) {
        this.sunkStatus = true;
        return true;
      }
    },
  };
};
