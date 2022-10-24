import { Product } from '@models/product.model';

const searchItemsByText = (searchTerm: string, products: Product[]) => {
  if (!searchTerm) {
    return products;
  }

  const list = new Array<Product>();
  const words = searchTerm.toLowerCase().split(' ');

  for (let index = 0, length = products.length; index < length; index++) {
    const product = products[index];
    const isMatched = matchWordList(product.name, words);
    if (isMatched) {
      list.push(product);
    }
  }

  return list;
};

const matchWordList = (productTitle: string, words: string[]) => {
  let matched = false;

  for (let index = 0, length = words.length; index < length; index++) {
    const word = words[index];
    const isContainWord = productTitle.toLowerCase().indexOf(word) !== -1;
    matched = isContainWord;
    if (!isContainWord) {
      break;
    }
  }
  return matched;
};

export default searchItemsByText;
