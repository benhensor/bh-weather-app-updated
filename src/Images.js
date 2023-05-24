function loadImage(path) {
  return require(`../public/assets/${path}`);
}

export default loadImage;