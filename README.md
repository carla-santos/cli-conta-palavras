# 🚀 CLI Conta Palavras

Uma poderosa ferramenta de linha de comando (CLI) desenvolvida em **Node.js**. Este projeto realiza a leitura de arquivos de texto, processa o conteúdo ignorando pontuações e palavras curtas (menores que 3 letras), e exibe um relatório detalhado com o nível de repetição de cada palavra, podendo exportar o resultado automaticamente para um novo arquivo.

---

## 📖 Descrição do Projeto

Este repositório foi criado inicialmente para fins de estudo, baseado no curso **JavaScript com Node.js: Criando sua primeira biblioteca de Node.js** da Alura.

No entanto, o código foi totalmente reescrito e refatorado adotando padrões de Arquitetura de Software utilizados no mercado, incluindo:

- ✅ **Clean Architecture**: Separação clara entre regras de negócio (`core`) e infraestrutura/leitura de disco (`utils`).
- ✅ **Tratamento Global de Erros**: Captura falhas nativas (como `ENOENT` e `EACCES`) e devolve mensagens amigáveis aos usuários, reservando detalhes técnicos (_Stack Traces_) apenas para o ambiente de desenvolvimento.

🧠 Quer entender como a CLI foi construída passo a passo? Confira a [documentação da lógica e algoritmo narrado](https://github.com/carla-santos/cli-conta-palavras/blob/main/docs/documentacao-logica.md).  

---

## 🛠️ Tecnologias e Bibliotecas atuais

Além das APIs nativas do Node.js (como `node:fs/promises` para manipulação assíncrona de arquivos e `node:path`), o projeto utiliza as seguintes bibliotecas modernas para entregar uma experiência de terminal profissional:

- **[commander](https://www.npmjs.com/package/commander)**: Criação da interface de linha de comando, tratamento de flags (parâmetros) e geração automática do menu de ajuda (`--help`).
- **[Chalk](https://www.npmjs.com/package/chalk)** - Estilização e coloração das mensagens no terminal, melhorando a UX e o feedback visual de erros e sucessos.
- **[Cross-env](https://www.npmjs.com/package/cross-env)**: Padronização da injeção de variáveis de ambiente (`NODE_ENV`), garantindo que os scripts funcionem perfeitamente em qualquer sistema operacional (Windows, macOS ou Linux).

### 🔧 Melhorias técnicas planejadas

**TypeScript**
- Migração gradual do código JavaScript para TypeScript
- Tipagem estática das estruturas de dados
- Maior segurança durante o desenvolvimento
- Melhor suporte de IDEs e autocompletar
- Redução de erros em tempo de execução
- Qualidade de Código
- Cobertura de testes automatizados
- Integração contínua (CI)
- Padronização com ESLint e Prettier

---

## ⚙️ Como Instalar e Executar

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### Passo a passo da instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/carla-santos/cli-conta-palavras.git
```

#### 2. Acesse a pasta do projeto

```bash
cd cli-conta-palavras
```

#### 3. Instale as dependências

```bash
npm install
```

---

## 🚀 Uso da CLI (Produção)

Para executar o projeto, utilize o comando `npm start` seguido de `--` (para repassar os argumentos ao Node.js) e as flags necessárias:

```bash
npm start -- -t ./arquivos/seu-texto.txt
```

### Parâmetros disponíveis

| Flag              | Descrição                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `-t`, `--texto`   | **Obrigatório.** Caminho do arquivo de texto de origem a ser processado.                                           |
| `-d`, `--destino` | **Opcional.** Caminho e nome do arquivo onde o resultado será salvo. Padrão: `./resultados/contador-palavras.txt`. |

### Exemplo com destino customizado

```bash
npm start -- -t ./arquivos/meu-texto.txt -d ./meus-relatorios/resultado.txt
```

---

## 👨‍💻 Ambiente de Desenvolvimento e Testes

Para facilitar a vida dos desenvolvedores, foram configurados scripts no `package.json` que injetam automaticamente a variável `NODE_ENV=development`.

Isso ativa a exibição de _Stack Traces_ (rastros técnicos de erro) essenciais para debug.

### Rodar com sucesso (Modo Dev)

Processa um arquivo de teste pré-configurado:

```bash
npm run dev
```

### Rodar simulação de erro (Modo Dev)

Tenta ler um arquivo inexistente para testar a captura de erros do sistema e a exibição do _Stack Trace_:

```bash
npm run dev:error
```

---

## 📂 Arquitetura do Projeto

```bash
📦 cli-conta-palavras
┣ 📂 arquivos
┃ ┗ 📜 # Textos de exemplo para testes
┣ 📂 resultados
┃ ┗ 📜 # Pasta gerada automaticamente com os relatórios
┣ 📂 src
┃ ┣ 📂 core
┃ ┃ ┗ 📜 word-counter.js
┃ ┃    ┗ # Regra de negócio pura (Contagem via Regex e Reduce)
┃ ┣ 📂 utils
┃ ┃ ┣ 📜 commander-config.js
┃ ┃ ┃   ┗ # Configuração do Commander.js
┃ ┃ ┣ 📜 handle-cli-error.js
┃ ┃ ┃   ┗ # Tratamento centralizado de exceções
┃ ┃ ┣ 📜 fs-read-file.js
┃ ┃ ┃   ┗ # Infraestrutura: Leitura de arquivos (fs)
┃ ┃ ┗ 📜 fs-write-file.js
┃ ┃     ┗ # Infraestrutura: Escrita de arquivos e criação de diretórios
┃ ┃ ┣ 📜 report-generator.js
┃ ┃ ┃   ┗ # Cria um relatório textual
┃ ┃ ┣ 📜 stop-words.js
┃ ┃ ┃   ┗ # Lista de palavras para eliminar da contagem
┃ ┗ 📜 cli.js
┃     ┗ # Entry point (Ponto de entrada) da aplicação
┣ 📜 package.json
┗ 📜 README.md
```
---

## ✨ Funcionalidades

### Disponíveis atualmente

- Leitura de arquivos `.txt`
- Normalização automática do texto (remoção de pontuações e caracteres especiais)
- Contagem de frequência de palavras
- Ordenação por número de ocorrências (maior → menor)
- Desconsideração de palavras com menos de 3 caracteres
- Filtro de palavras irrelevantes (stop words)
- Geração de relatórios em formato texto (.txt)
- Criação automática de diretórios de saída
- Interface CLI amigável
- Tratamento robusto de erros
- Compatibilidade multiplataforma (Windows, Linux e macOS)

### 🚧 Planejamento para próximas versões

- Exportação dos resultados em formato JSON
- Configuração personalizada de stop words via terminal
- Carregamento de listas de palavras ignoradas a partir de arquivos externos
- Exportação para múltiplos formatos (JSON, CSV e HTML)
- Limitação configurável do número de resultados exibidos
  
---

## Releases

✅ [v1.0.0 — Versão inicial](https://github.com/carla-santos/cli-conta-palavras/releases/tag/v1.0.0)

---


## 💜 Autor

Desenvolvido com 💜 por **Carla Santos**

Desenvolvido por <a href="https://github.com/carla-santos" target="_blank">Carla Santos</a>
