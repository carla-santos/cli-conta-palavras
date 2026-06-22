import chalk from 'chalk';
import { commanderConfig } from './utils/commander-config.js';

async function bootstrap() {
  try {
    const options = commanderConfig();
    const sourcePath = options.texto;
    const destinationPath = options.destino;

    console.log(chalk.blue.bold('\nIniciando processamento do arquivo...'));
  } catch (error) {}
}

bootstrap();
