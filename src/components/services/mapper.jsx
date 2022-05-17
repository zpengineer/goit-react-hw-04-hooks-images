export const mapper = images => {
  return images.map(
    ({ id, largeImageURL: largeImg, webformatURL: smallImg, tags }) => ({
      id,
      largeImg,
      smallImg,
      tags,
    })
  );
};
