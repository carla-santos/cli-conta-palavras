import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Lê um arquivo de texto e retorna seu conteúdo como string.
 * @param {string} relativePath - Caminho relativo para o arquivo a ser lido.
 * @returns {Promise<string>} conteúdo do arquivo em UTF-8.
 */

export async function readTextFile(relativePath) {
  const absolutePath = resolve(relativePath);
  return await readFile(absolutePath, { encoding: 'utf-8' });
}
