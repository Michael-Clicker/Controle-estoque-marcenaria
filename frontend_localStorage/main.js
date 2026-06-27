
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
  static mostrarFerramentas() {
    const ferramentas = Store.pegaFerramentas()
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
  const total = Store.contarFerramentas()
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
  static deletarItem(e) {
    if (e.target.classList.contains('del')) {
      const linha = e.target.closest('tr')
      const nome = linha.querySelector('.nome-celula').textContent
      const codigo = linha.querySelector('.codigo-celula').textContent
      
      Store.deletarFerramenta(codigo)
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
  
  static pegaFerramentas() {
    let ferramentas
    if (localStorage.getItem('ferramentas') === null) {
      ferramentas = []
    } else {
      ferramentas = JSON.parse(localStorage.getItem('ferramentas'))
    }
    return ferramentas
  } 
 
  static contarFerramentas() {
    const ferramentas = Store.pegaFerramentas()
    return ferramentas.length
  }

  static addFerramenta(ferramenta) {
    const ferramentas = Store.pegaFerramentas()
    ferramentas.push(ferramenta)
    localStorage.setItem('ferramentas', JSON.stringify(ferramentas))
  }

  static deletarFerramenta(codigo) {
    const ferramentas = Store.pegaFerramentas()

    ferramentas.forEach((ferramenta, index) => {
      if (ferramenta.codigo === codigo) {
        ferramentas.splice(index, 1)
      }
    })
    localStorage.setItem('ferramentas', JSON.stringify(ferramentas))
  }
}

// --- EVENTOS DO APP ---

// Evento: Carregar as ferramentas salvas ao abrir a página
document.addEventListener('DOMContentLoaded', UI.mostrarFerramentas)

//Evento: filtrar ferramentas
busca.addEventListener('keyup', UI.filtroFerramenta)

// Evento: Adicionar ferramenta pelo formulário
frm.addEventListener('submit', (e) => {
  e.preventDefault()

  const nome = frm.nome.value
  const marca = frm.marca.value
  const codigo = frm.codigo.value

  //validação de codigo
  const ferramentasExistentes = Store.pegaFerramentas()
  const codigoJaExiste = ferramentasExistentes.some((ferramenta) => ferramenta.codigo === codigo)
  if (codigoJaExiste) {
    UI.mostrarAlerta(`Erro: O código "${codigo}" já está cadastrado no estoque!`, 'deletar')
    return 
  }
  
  // nova ferramenta

  const nova_ferramenta = new Ferramenta(nome, marca, codigo)
  // Atualiza a tela e salva no LocalStorage
  UI.addFerramenta(nova_ferramenta)
  Store.addFerramenta(nova_ferramenta)

  UI.mostrarAlerta(`${nova_ferramenta.nome} adicionada com sucesso!`, 'sucesso')
  UI.contador()
  frm.reset()
})

lista.addEventListener('click', UI.deletarItem)