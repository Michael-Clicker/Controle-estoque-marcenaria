# 🛠️ Controle de Estoque - Marcenaria

Uma aplicação web responsiva do tipo SPA (Single Page Application) desenvolvida para o gerenciamento e controle de ferramentas em uma oficina de marcenaria. O projeto resolve problemas comuns de organização, evitando a perda de equipamentos e o cadastro duplicado de códigos de patrimônio ou números de série.

---

<img width="990" height="911" alt="Captura de tela 2026-06-10 195747" src="https://github.com/user-attachments/assets/07ad733c-f976-47d2-be6b-550bdfb5db51" />


## 🚀 Funcionalidades 

* **CRUD Completo de Ferramentas:** Adicione, visualize e remova itens do estoque de forma instantânea.
* **Persistência de Dados (Local Storage):** Os dados não são perdidos ao atualizar ou fechar o navegador.
* **Validação de Código de Série Único:** O sistema impede o cadastro de duas ferramentas com o mesmo código de patrimônio, emitindo um alerta visual de erro.
* **Filtro em Tempo Real:** Barra de pesquisa dinâmica com evento `keyup` que filtra as ferramentas pelo nome à medida que o usuário digita.
* **Contador Dinâmico:** Um indicador que exibe na tela a quantidade total de ferramentas em estoque em tempo real.

---

## 🎨 Identidade Visual e Interface

O design foi totalmente planejado para remeter a um ambiente de gerenciamento técnico, proporcionando uma experiência de uso limpa, profissional e de alto contraste.

* Feedback visual através de alertas temporizados de sucesso (verde) e remoção/erro (vermelho).
* Efeitos de transição sutis (`hover` nas linhas da tabela e efeito físico de clique nos botões).
* Uso de ícones semânticos através da biblioteca **Font Awesome**.

---

## 💻 Tecnologias Utilizadas

* **HTML5:** Estruturação semântica do formulário e tabelas de dados.
* **CSS3:** Estilização moderna, uso de variáveis globais (`:root`) para consistência de cores e animações de transição (`@keyframes`).
* **JavaScript Moderno (ES6+):**  Programação Orientada a Objetos (Classes e Métodos Estáticos) e manipulação de DOM.

---
# 🧠 Aprendizado e Evolução Técnica

Este projeto serviu para consolidar conceitos essenciais de desenvolvimento front-end moderno:

## Separação de Responsabilidades

Organização do código JavaScript em classes distintas para:

- Gerenciar os dados (**Ferramenta**);
- Controlar a interface (**UI**);
- Isolar a persistência (**Store**).

## Tratamento de Regras de Negócio

Implementação de lógicas de validação em tempo de execução para garantir a integridade dos dados, simulando o comportamento de um banco de dados real.

## 🔧 Como Executar o Projeto

Está disponivel em: https://michael-clicker.github.io/Controle-estoque-marcenaria/
