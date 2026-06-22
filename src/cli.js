import chalk from 'chalk';
import { commanderConfig } from './utils/commander-config.js';
import { readTextFile } from './utils/fs-read-file.js';
import { countWords } from './core/word-counter.js';
import { createTextFile } from './utils/fs-write-file.js';
import { handleCliError } from './utils/handle-cli-error.js';

async function bootstrap() {
  try {
    const options = commanderConfig();

    // Extraímos os caminhos de origem e destino
    const sourcePath = options.texto;
    const destinationPath = options.destino;

    console.log(chalk.blue.bold('\nIniciando processamento do arquivo...\n'));

    // Lê o conteúdo do arquivo de texto
    const fileContent = await readTextFile(sourcePath);

    // Conta as palavras e exibe o resultado
    const wordCountResult = countWords(fileContent);

    console.log(chalk.yellow('Gravando resultados em um novo arquivo... \n'));

    // Cria um arquivo de texto com os resultados da contagem
    await createTextFile(wordCountResult, destinationPath);

    // Exibe mensagem de sucesso
    console.log(chalk.green.bold(`Sucesso! Arquivo salvo em: ${destinationPath}\n`));

    // Mostra um pequeno preview no console para o usuário
    console.table(wordCountResult.slice(0, 10));
    console.log(chalk.gray('... e muito mais no arquivo gerado!'));
  } catch (error) {
    handleCliError(error);
  }
}

bootstrap();
