import { Command } from 'commander';
import chalk from 'chalk';

/**
 * Configura a interface de linha de comando e extrai os argumentos passados pelo usuário.
 * @returns {Object} Um objeto contendo as opções { texto, destino }.
 */

export function commanderConfig() {
  const program = new Command();

  program
    .version('1.0.0')
    .name('cli-conta-palavras')
    .description('CLI para processar textos e contar a repetição de palavras')
    .option('-t, --texto <string>', 'Caminho do arquivo de texto de origem a ser lido')
    .option(
      '-d, --destino <string>',
      'caminho da pasta onde salvar o arquivo de resultados',
      './resultados/contador-palavras.txt',
    );

  program.parse();
  const options = program.opts();

  if (!options.texto) {
    console.error(
      chalk.red.bold('\nÉ necessário informar o caminho do arquivo de texto de origem.\n'),
    );
    console.log(chalk.yellow('Por favor, informe o caminho usando a flag -t ou --texto.\n'));
    program.outputHelp();
    process.exit(1);
  }

  return options;
}
