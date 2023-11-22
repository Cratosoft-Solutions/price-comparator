import Fuse from 'fuse.js';



export const tokenizeSearch = async (keyword, resultArray) => {
    console.log(keyword, resultArray);
    const fuse = new Fuse(resultArray, {
        keys: ['productName'],
        threshold: 0.9,
        distance:2,
        minMatchCharLength:3,
        tokenize: true, 
        tokenSeparator: /[\s,]+/
      });

    const searchResults = fuse.search(keyword);
    const sortedResults = searchResults.sort((a, b) => a.score - b.score).map((result) => result.item)

    console.log("Ingresaron",resultArray.length);
    console.log("Salieron",sortedResults.length);


  return sortedResults;
}