const getAttractionId = (ref) => {
  const url = new URL(ref);
  const path = url.pathname;
  const idSearch = /(\d{8})/;
  const [attractionId] = path.match(idSearch);
  return attractionId;
};

export default getAttractionId;
