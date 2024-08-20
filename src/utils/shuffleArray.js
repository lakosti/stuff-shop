function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Функція для вибору кількох випадкових об'єктів з масиву
function getRandomObjects(array, numberOfObjects) {
  const shuffled = shuffleArray([...array]);
  return shuffled.slice(0, numberOfObjects);
}

export default getRandomObjects;

// // Отримання 5 випадкових об'єктів з productsList
// const randomObjects = getRandomObjects(products, 6);
// const randomObjectsFiltered = getRandomObjects(filtered, 6);
