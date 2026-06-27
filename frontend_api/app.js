
const frm = document.getElementById('form-ferramenta')
const lista = document.getElementById('tabela-estoque')
const h1 = document.querySelector('h1')
const busca = document.getElementById('busca')

class Ferramenta {
  constructor(nome, marca, codigo) {
    this.nome = nome
    this.marca = marca
    this.codigo = codigo
  }
}

// Classe de Interface
class UI {
  static async mostrarFerramentas() {
    const ferramentas = await Store.pegaFerramentas()
    lista.innerHTML = ''
    ferramentas.forEach((ferramenta) => UI.addFerramenta(ferramenta))
    UI.contador()
  }

  //adiciona ferramenta
  static addFerramenta(ferramenta) {
    const linha = document.createElement('tr')

    linha.innerHTML = `
      <td class="nome-celula">${ferramenta.nome}</td>
      <td>${ferramenta.marca}</td>
      <td class="codigo-celula">${ferramenta.codigo}</td>
      <td><button class="del">X</button></td>
    `

    lista.appendChild(linha)
  }

  //contagem de ferramnetas em estoque
  static contador() {
    const total = lista.querySelectorAll('tr').length
    const h3 = document.querySelector('h3')
    h3.innerText = `${total}`
  }

  //alerta
  static mostrarAlerta(mensagem, className) {
    const div = document.createElement('div')
    const container = document.getElementById('form-section')
    div.className = className
    div.appendChild(document.createTextNode(mensagem))

    if (className === 'deletar') {
      div.style.background = 'red'
    } else if (className === 'sucesso') {
      div.style.background = 'green'
    }
    container.insertBefore(div, frm)

    setTimeout(() => {
      div.classList.add('fade-out')
      setTimeout(() => {
        div.remove()
      }, 400)
    }, 2500)
  }

  //deletar
  static async deletarItem(e) {
    if (e.target.classList.contains('del')) {
      const linha = e.target.closest('tr')
      const nome = linha.querySelector('.nome-celula').textContent
      const codigo = linha.querySelector('.codigo-celula').textContent

      await Store.deletarFerramenta(codigo)
      linha.remove()

      UI.mostrarAlerta(`${nome} removida do estoque`, 'deletar')
      UI.contador()
    }
  }

  //filtro 
  static filtroFerramenta(e) {
    var texto = e.target.value.toLowerCase().trim()
    var linhas = lista.querySelectorAll('tr')

    linhas.forEach((linha) => {
      var nomeFiltro = linha.querySelector('.nome-celula').textContent.toLowerCase()

      if (nomeFiltro.includes(texto)) {
        linha.style.display = ''
      } else {
        linha.style.display = 'none'
      }
    })
  }
}
// Classe LocalStorage
class Store {

  static async pegaFerramentas() {
    try {
      const resposta = await fetch('http://127.0.0.1:8000/ferramentas')
      if (!resposta.ok) throw new Error('Erro ao buscar ferramentas')
      return await resposta.json()
    } catch (erro) {
      console.error(erro)
      return []
    }
  }

  static async contarFerramentas() {
    const ferramentas = await Store.pegaFerramentas()
    return ferramentas.length
  }

  static async addFerramenta(ferramenta) {
    try {
      const resposta = await fetch('http://127.0.0.1:8000/ferramentas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ferramenta)
      })
      const dados = await resposta.json()

      if (!resposta.ok) {
        throw new Error(dados.detail || 'Erro ao adicionar ferramenta')
      }
      return { sucesso: true, dados }
    } catch (erro) {
      return { sucesso: false, erro: erro.message }
    }
  }

  static async deletarFerramenta(codigo) {
    try {
      const resposta = await fetch(`http://127.0.0.1:8000/ferramentas/${codigo}`, {
        method: 'DELETE'
      })
      if (!resposta.ok) throw new Error('Erro ao deletar ferramenta')
      return true
    } catch (erro) {
      console.error(erro)
      return false
    }
  }
}

// --- EVENTOS DO APP ---

// Evento: Carregar as ferramentas salvas ao abrir a página
document.addEventListener('DOMContentLoaded', UI.mostrarFerramentas)

// Evento: Filtrar ferramentas
busca.addEventListener('keyup', UI.filtroFerramenta)

// Evento: Adicionar ferramenta pelo formulário
frm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const nome = frm.nome.value
  const marca = frm.marca.value
  const codigo = frm.codigo.value

  const nova_ferramenta = new Ferramenta(nome, marca, codigo)

  // 1. Envia para o FastAPI e aguarda a resposta do SQLite
  const resultado = await Store.addFerramenta(nova_ferramenta)

  if (resultado.sucesso) {
    // 2. Adiciona o elemento visual na tabela primeiro
    UI.addFerramenta(nova_ferramenta)
    
    // 3. Atualiza o contador síncrono lendo a tabela atualizada
    UI.contador()
    
    // 4. Dispara o alerta (agora com o DOM totalmente atualizado e em paz)
    UI.mostrarAlerta(`${nova_ferramenta.nome} adicionada com sucesso!`, 'sucesso')
    
    frm.reset()
  } else {
    UI.mostrarAlerta(`Erro: ${resultado.erro}`, 'deletar')
  }
})

// Evento: Deletar item da tabela
lista.addEventListener('click', async (e) => {
  if (e.target.classList.contains('del')) {
    const linha = e.target.closest('tr')
    const nome = linha.querySelector('.nome-celula').textContent
    const codigo = linha.querySelector('.codigo-celula').textContent

    // 1. Aguarda deletar no banco de dados SQLite primeiro
    await Store.deletarFerramenta(codigo)
    
    // 2. Remove a linha do HTML imediatamente
    linha.remove()
    
    // 3. Atualiza o número do contador na tela baseado nas linhas restantes
    UI.contador()
    
    // 4. Mostra o alerta depois que a linha já sumiu da tela
    UI.mostrarAlerta(`${nome} removida do estoque`, 'deletar')
  }
})