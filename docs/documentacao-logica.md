# Lógica de desenvolvimento e algoritmo narrado

Este documento detalha o processo de raciocínio, a desconstrução do problema e o algoritmo passo a passo utilizado para construir a **CLI Conta Palavras**. Ele serve como um registro de arquitetura e um guia de estudos para projetos futuros.

---

## 1. O problema geral (Visão macro)

### O que precisamos resolver?

Temos um arquivo de texto bruto (como um artigo ou livro) e precisamos saber quais são as palavras mais utilizadas nele. O programa deve receber o caminho desse arquivo pelo terminal, extrair as palavras (ignorando pontuações e palavras com menos de 3 letras), contar as repetições, ordenar da maior para a menor e, por fim, salvar esse relatório em um novo arquivo de texto, exibindo um resumo amigável no terminal.

---

## 2. Desconstruindo o problema (Visão micro e perguntas)

Para transformar esse grande problema em código, precisamos dividi-lo em partes menores e independentes:

### Entrada de dados (Input):

- Como o usuário vai informar qual arquivo ele quer ler?
  - **Solução**: Pelo terminal, usando argumentos de linha de comando. Usaremos a biblioteca **Commander.js** para capturar a `flag -t (origem)` e `-d (destino)`.

### Leitura do disco (I/O - Input/Output):

- Como o Node.js pega esse caminho e lê o texto que está lá dentro?
  - **Solução**: Usando o módulo nativo `node:fs/promises` com a função `readFile`.

## Regra de negócio (Processamento):

- Como separo as palavras da pontuação (vírgulas, pontos)?
  - **Solução**: Usando expressões regulares (Regex). O padrão `\p{L}` vai capturar apenas as letras, ignorando todo o resto.
- Como eu conto e agrupo isso?
  - **Solução**: Transformo o texto em um `Array de palavras`, uso o método `reduce` para agrupar e contar, e aplico um filtro para ignorar palavras com menos de 3 caracteres `(length < 3)`. Depois, uso o `sort` para ordenar os números em ordem decrescente.

### Saída de dados (Output):

- Como eu transformo esse resultado (que é um `objeto/array` no JavaScript) de volta em texto e salvo no computador?
  - **Solução**: Usarei um `.map().join('\n')` para transformar os dados em uma lista de `strings`.Depois, uso o `mkdir` para garantir que a pasta exista e o `writeFile` para gravar no disco.

### Tratamento de exceções (Resiliência):

- E se o usuário passar um arquivo que não existe? E se faltar permissão?
  - **Solução**: Englobo tudo num bloco `try/catch` e crio um tratador de erros global que mapeia códigos de erro nativos `(ENOENT)` para mensagens amigáveis em português, utilizando a biblioteca **Chalk** para colorir e destacar alertas no terminal.

---

## 3. O algoritmo narrado (Passo a passo lógico)

Abaixo, o fluxo exato que a aplicação segue do momento em que o usuário aperta `Enter` até a finalização do processo:

1. Início da execução

2. O sistema lê o terminal e extrai as flags **(Caminho de origem e caminho de destino).**

3. SE o caminho de origem não for informado:
   - O sistema exibe o menu de ajuda através do `outputHelp()` (que apenas imprime, sem encerrar o processo) e encerra explicitamente com `process.exit(1)`, sinalizando que essa execução terminou em erro de uso, não em sucesso.
4. Tenta fazer (Try):
   - Transforma o caminho de origem em um caminho absoluto no computador.
   - Abre o arquivo e guarda todo o conteúdo (texto) na memória.
   - Pega esse texto e o transforma em minúsculas.
   - Extrai apenas as letras (palavras), descartando números, espaços e pontuações.
   - Para cada palavra encontrada:
     1. SE a palavra tiver 3 ou mais letras:
        - Verifica se ela já existe na lista de contagem.
        - Se existir, soma +1. Se não existir, adiciona com o valor 1.
   - Ordena a lista final, colocando as palavras com maior contagem no topo.
   - Formata a lista para um formato de texto legível (ex: Palavra: "x" | Repetições: y).
   - Verifica se a pasta do caminho de destino existe. SE NÃO, cria a pasta.
   - Cria o arquivo final e escreve o texto formatado nele.
   - Imprime no terminal uma mensagem de sucesso (verde) e as 5 palavras mais repetidas.
5. Caso dê ERRO (Catch):
   - O sistema captura o erro.
   - Verifica a informação do erro (Código do Node.js).
   - Traduz o erro para o usuário (Ex: "O arquivo não foi encontrado").
   - SE o sistema estiver em modo de Desenvolvimento `(NODE_ENV=development)`:
     - Imprime a rota técnica do erro `(Stack Trace)`.
   - Encerra o programa marcando falha `process.exit(1)`.

6. Fim da execução

---

## 4. Mapeamento arquitetural (Onde cada coisa vive)

**Decisão arquitetural - Ponto único de tratamento de erro**:

Nenhuma camada de infraestrutura `(fs-read-file.js, fs-write-file.js)` trata erros diretamente nem encerra o processo. Toda função de I/O deixa o erro subir (propagar) naturalmente até o catch do `bootstrap()` em `cli.js` , que é o único ponto de tratamento de erro de toda a aplicação. Essa decisão garante que qualquer nova fonte de erro adicionada no futuro (rede, parsing, etc.) seja automaticamente coberta pelo mesmo tratamento, sem precisar duplicar lógica de erro em múltiplos módulos.

**Com base no algoritmo acima, o código foi dividido respeitando o Clean Architecture (Arquitetura Limpa):**

- **A orquestração** (Passos 1, 4 e 6): Ficam no `cli.js` (Ponto de entrada). É também o único lugar que decide o destino final de um erro, via `handleCliError`.
- **A leitura do terminal** (Passo 2 e 3): Fica no `utils/commander-config.js` (Infraestrutura).
- **A manipulação de arquivos** (Leitura e escrita): Ficam no `utils/fs-read-file.js` e `utils/fs-write-file.js` (Infraestrutura). Essas funções não tratam erros - apenas os propagam para quem as chamou.
- **A Regra de negócio** (O filtro e a contagem): Fica no `core/word-counter.js` (Domínio). Retorna dados em inglês `({ word, count }})`, já que é código interno, a tradução para português, acontece apenas na fronteira com o usuário, dentro do `cli.js`.
- **A barreira de segurança** (Passo 5): Fica no `utils/error-handler.js` (Tratamento global).
