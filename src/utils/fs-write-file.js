import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

/**
 * Cria um arquivo de texto com os resultados da contagem.
 * @param {Array} wordList - Array de objetos com as palavras e repetições.
 * @param {string} destinationPath - Caminho onde o arquivo será salvo.
 */

export async function createTextFile(wordList, destinationPath = './contador-palavras.txt') {
  // O writeFile exige uma string. Transformamos o array em uma string.
  const formattedText = wordList
    .map((item) => `Palavra: '${item.word}' | Repetições: ${item.count}`)
    .join('\n');

  // Criamos a pasta de destino caso não exista
  await mkdir(dirname(destinationPath), { recursive: true });

  // Escrevemos o conteúdo no arquivo
  await writeFile(destinationPath, formattedText, { encoding: 'utf8' });
}
