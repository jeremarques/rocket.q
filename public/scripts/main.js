import Modal from './modal.js'

const modal = Modal()

function changeContentModal(title, description, contentButton) {
  modalTitle.innerHTML = title
  modalDescription.innerHTML = description
  modalButton.innerHTML = contentButton
}

// Pega todos os botões com classe ckeck
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => handleClick(event, false))
})

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal .button-change')

function handleClick(event, check = true) {
  event.preventDefault()
  const text = check ? "Marcar como lida" : "Excluir"
  const slug = check ? "check" : "delete"
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = check ? `Tem certeza que você deseja ${text.toLowerCase()} essa pergunta?` : `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = check ? "Sim, marcar como lida" : "Sim, excluir"
  
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
  modal.open()

}

