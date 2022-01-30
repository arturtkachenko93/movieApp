function textClipping(str) {
  return `${str.replace(/^(.{160}[^\s]*).*/, '$1')} ...`;
}

export default textClipping;
