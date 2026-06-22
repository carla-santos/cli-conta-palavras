import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { generateTextReport } from './report-generator.js';

/**
 * Cria um arquivo de texto com os resultados da contagem.
 * @param {Array} wordList - Array de objetos com as palavras e repetições.
 * @param {string} destinationPath - Caminho onde o arquivo será salvo.
 */

export async function createTextFile(wordList, destinationPath = './contador-palavras.txt') {
  const reportContent = generateTextReport(wordList);

  // Criamos a pasta de destino caso não exista
  await mkdir(dirname(destinationPath), { recursive: true });

  // Escrevemos o conteúdo no arquivo
  await writeFile(destinationPath, reportContent, { encoding: 'utf8' });
}
