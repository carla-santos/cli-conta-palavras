import chalk from 'chalk';

/**
 * Tratador central de erros da aplicação CLI.
 * Avalia o tipo de erro, mapeia mensagens amigáveis e controla a exibição da Stack Trace.
 * @param {Error} error - O objeto de erro capturado no bloco catch.
 */

export function handleCliError(error) {
  const fsErrorMessages = {
    ENOENT: `O arquivo não foi encontrado.\n\nCaminho: "${error.path || 'Desconhecido'}"`,
    EACCES: 'Permissão negada! A aplicação não tem autorização para acessar este arquivo.',
    EISDIR: `O caminho informado aponta para uma pasta, mas a aplicação esperava um arquivo. \n\nCaminho: "${error.path || 'Desconhecido'}"`,
  };

  let userMessage = 'Ocorreu um erro inesperado na aplicação.';

  // Se o erro tiver um código (como os erros do Node.js) e estiver no mapa de mensagens, retorna a mensagem.
  if (error.code && fsErrorMessages[error.code]) {
    userMessage = fsErrorMessages[error.code];
  } else if (error.message) {
    userMessage = error.message;
  }

  // Exibição para o usuário final (para o console).
  console.error(chalk.red.bold('Falha na execução:\n'));
  console.error(chalk.red(userMessage));

  // Exibição para o desenvolvedor (Stack trace baseada em variável de ambiente)
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.gray('\n--- Detalhes técnicos (Stack trace) ---\n'));
    console.error(chalk.gray(error.cause ? error.cause.stack : error.stack));
  }

  process.exit(1);
}
