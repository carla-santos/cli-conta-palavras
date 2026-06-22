import chalk from 'chalk';
import { commanderConfig } from './utils/commander-config.js';
import { readTextFile } from './utils/fs-read-file.js';
import { handleCliError } from './utils/handle-cli-error.js';

async function bootstrap() {
  try {
    const options = commanderConfig();
    const sourcePath = options.texto;
    const destinationPath = options.destino;

    console.log(chalk.blue.bold('\nIniciando processamento do arquivo...\n'));

    const fileContent = await readTextFile(sourcePath);
    console.log(fileContent);
  } catch (error) {
    handleCliError(error);
  }
}

bootstrap();
