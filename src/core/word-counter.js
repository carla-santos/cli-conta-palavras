import { stopWords } from '../utils/stop-words.js';

/**
 * Regra de negócio: Analisa um texto, extrai as palavras,
 * ignora palavras com menos de 3 caracteres e conta as repetições.
 * * @param {string} text - O texto cru vindo do arquivo.
 * @returns {Array} Um array de objetos com a palavra e o número de ocorrências, ordenado.
 */

export function countWords(text) {
  const regexLetters = /[\p{L}]+/gu;
  const rawWords = text.toLowerCase().match(regexLetters) ?? [];

  const frequencyWords = rawWords.reduce((acc, word) => {
    if (word.length >= 3 && !stopWords.has(word)) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});

  // Transformamos o objeto em um Array para podermos ordenar do maior para o menor
  const frequencyWordsArray = Object.entries(frequencyWords).map(([word, count]) => ({
    word,
    count,
  }));

  frequencyWordsArray.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.word.localeCompare(b.word);
  });

  return frequencyWordsArray;
}
