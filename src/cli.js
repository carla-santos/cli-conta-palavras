import chalk from 'chalk';
import { commanderConfig } from './utils/commander-config.js';
import { readTextFile } from './utils/fs-read-file.js';
import { countWords } from './core/word-counter.js';
import { handleCliError } from './utils/handle-cli-error.js';

async function bootstrap() {
  try {
    const options = commanderConfig();
    const sourcePath = options.texto;
    const destinationPath = options.destino;

    console.log(chalk.blue.bold('\nIniciando processamento do arquivo...\n'));

    const fileContent = await readTextFile(sourcePath);
    const wordCountResult = countWords(fileContent);

    // Mostra um pequeno preview no console para o usuário
    console.table(wordCountResult.slice(0, 10));
    console.log(chalk.gray('... e muito mais no arquivo gerado!'));
  } catch (error) {
    handleCliError(error);
  }
}

bootstrap();
