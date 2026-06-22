/**
 * Gera um relatório textual a partir da lista de palavras.
 * @param {Array<{word: string, count: number}>} wordList
 * @returns {string}
 */

export function generateTextReport(wordList) {
  const totalUniqueWords = wordList.length;
  const totalOccurrences = wordList.reduce((total, item) => total + item.count, 0);

  const mostFrequentWord = wordList[0];

  return [
    '==================================================',
    '    Relatório de contagem de palavras',
    '==================================================',
    '',
    'Estatísticas gerais',
    '--------------------------------------------------',
    `Total de palavras encontradas: ${totalOccurrences}`,
    `Total de palavras únicas: ${totalUniqueWords}`,
    `Palavra mais frequente: ${
      mostFrequentWord
        ? `${mostFrequentWord.word} (${mostFrequentWord.count} ocorrências)`
        : 'Nenhuma'
    }`,
    '',
    'Top palavras mais frequentes',
    '--------------------------------------------------',
    '',
    ...wordList.map(
      (item, index) =>
        `${String(index + 1).padStart(2, '0')}. ${item.word.padEnd(20)} ${item.count} ocorrências`,
    ),
    '',
    '--------------------------------------------------',
    'Relatório gerado automaticamente pela CLI.',
  ].join('\n');
}
