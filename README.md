# 🛠️ Controle de Estoque - Marcenaria (Full-Stack)

Uma aplicação web desenvolvida para o gerenciamento de ferramentas em uma oficina de marcenaria. O projeto começou como uma aplicação Front-end utilizando `localStorage` e evoluiu para uma arquitetura Full-Stack com API REST e banco de dados SQLite, permitindo persistência dos dados e validações no servidor.

---

<img width="990" height="911" alt="Captura de tela" src="https://github.com/user-attachments/assets/07ad733c-f976-47d2-be6b-550bdfb5db51" />

### 🌐 Demonstração Web

Você pode testar a versão Front-end, que utiliza `localStorage`, diretamente pelo navegador:

👉 **https://michael-clicker.github.io/Controle-estoque-marcenaria/frontend_localStorage/**

---
## 🚀 Funcionalidades

- **Cadastro de Ferramentas:** Adicione novas ferramentas ao estoque.
- **Listagem de Ferramentas:** Visualize todas as ferramentas cadastradas.
- **Remoção de Ferramentas:** Exclua itens do estoque.
- **API REST:** Comunicação entre Front-end e Back-end por meio de requisições HTTP (`fetch`).
- **Persistência de Dados:** Armazenamento das informações em um banco de dados SQLite.
- **Validação de Código de Patrimônio:** Impede o cadastro de ferramentas com códigos duplicados, realizando validações tanto no cliente quanto no servidor.
- **Pesquisa em Tempo Real:** Filtra as ferramentas conforme o usuário digita.
- **Contador Automático:** Atualiza automaticamente a quantidade total de ferramentas cadastradas.

---

## 🎨 Interface

A interface foi desenvolvida para oferecer uma experiência simples e intuitiva, priorizando legibilidade e feedback visual durante as operações.

Entre os recursos implementados estão:

- Alertas temporários para operações de sucesso, erro e remoção.
- Animações suaves utilizando CSS.
- Efeitos de interação em botões e linhas da tabela.
- Uso de HTML semântico e variáveis CSS para facilitar a manutenção do código.

---

## 📁 Estrutura do Projeto

```text
controle-de-estoque/
│
├── backend/                  # API desenvolvida com FastAPI
│   ├── main.py               # Rotas da aplicação
│   ├── database.py           # Configuração do banco de dados
│   └── requirements.txt
│
├── frontend_api/             # Interface integrada à API
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── frontend_localStorage/    # Versão utilizando localStorage
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

### Back-end

- Python 3
- FastAPI
- Uvicorn (ASGI Server)
- SQLAlchemy (ORM)

### Banco de Dados

- SQLite

### Front-end

- HTML5
- CSS3
- JavaScript (ES6+)

---

## 🧠 Aprendizado e Evolução Técnica

Este foi meu primeiro projeto em que integrei um front-end com uma API desenvolvida em Python com banco de dados relacional. Durante o desenvolvimento pude praticar conceitos de arquitetura cliente-servidor, organização de código e comunicação assíncrona.

### Organização do Código

#### Front-end

O JavaScript foi organizado em classes com responsabilidades bem definidas:

- **Ferramenta:** representa os dados da aplicação.
- **UI:** gerencia a interface e a manipulação do DOM.
- **Store:** realiza a comunicação assíncrona com a API.

#### Back-end

A API foi estruturada separando a configuração do banco de dados, os modelos e as rotas da aplicação, tornando o código mais organizado e de fácil manutenção.

### Desafios Enfrentados

#### Sincronia do DOM

Foi necessário ajustar o fluxo assíncrono da aplicação para garantir que a interface fosse atualizada corretamente após operações de cadastro e remoção, evitando inconsistências na renderização.

#### Configuração do Ambiente

Durante o desenvolvimento configurei ambientes virtuais com `venv`, organizei as dependências do projeto e resolvi problemas relacionados ao recarregamento automático do servidor durante operações de escrita no banco de dados.

---

## 🔧 Como Executar o Projeto

---

### 💻 Executando Localmente

#### 1. Clone o repositório

```bash
git clone https://github.com/michaelteixeira/controle-de-estoque.git
cd controle-de-estoque/backend
```

#### 2. Crie um ambiente virtual

```bash
python -m venv venv
```

#### 3. Ative o ambiente virtual

**Windows (PowerShell)**

```powershell
.\venv\Scripts\activate
```

#### 4. Instale as dependências

```bash
pip install -r requirements.txt
```

#### 5. Inicie a API

```bash
uvicorn main:app --reload
```

A API estará disponível em:

```text
http://127.0.0.1:8000
```

#### 6. Execute o Front-end

Abra o arquivo:

```text
frontend_api/index.html
```

Você pode abrir o arquivo diretamente no navegador ou utilizar uma extensão como **Live Server** durante o desenvolvimento.
