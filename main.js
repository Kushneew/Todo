'use strict'
// DOM Elements

const inputField = document.querySelector(".todo-input")
const buttonWrite = document.querySelector('.app-confirm')
const buttonDelete = document.querySelector('.app-delete')
const todoItemsContainer = document.querySelector('.todo-container')
const todoInput = document.querySelector('.todo-input')
// DOM Elements
// Initialization ZERO TODOS

todoInput.setAttribute('placeholder', 'Write your first todo here...')
// buttonDelete.style.display = 'none'

// Initialization
// Variables
let deleteMode = false
let choiceId = -1
let todoItemsData = []

// Variables
// EventListeners
window.addEventListener('load', loadToDoMemory)
inputField.addEventListener("input", () => {
    inputField.style.height = 'auto'
    inputField.style.height = inputField.scrollHeight + "px"
})
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        buttonWrite.dispatchEvent(new Event('click'))
    }
})
buttonWrite.addEventListener('click', () => {
    addToDoItem()
})

buttonDelete.addEventListener('click', () => {
    deleteMode = !deleteMode
    buttonDelete.classList.toggle('app-delete-active')

})

// EventListeners
// Functions

function loadToDoMemory(){
    const todoList = JSON.parse(localStorage.getItem('todo') || [])
    todoItemsData = todoList
    renderToDoElements()
}

function saveToDoMemory(){
    localStorage.setItem('todo', JSON.stringify(todoItemsData))
}

function addToDoItem() {
    const text = inputField.value
    if(!text.trim()) return
    else {
        todoItemsData.push(text)
        saveToDoMemory()
        renderToDoElements()
    }
    inputField.value = '';
    inputField.dispatchEvent(new Event('input'))
}

function renderToDoElements(){
    const todoItems = []
    todoItemsContainer.innerHTML = ''
    todoItemsData.map((data, index) => {
        const text = data.trim()
        const todoElement = document.createElement("li")
        todoElement.addEventListener('click', () => {
            const idText = todoElement.childNodes[0].childNodes[0]['innerHTML']
            choiceId = idText
            interactiveAction()
        })
        todoElement.classList.add('todo-item')
        todoElement.innerHTML =
            '<span class="item-id">' +
            `<span class="id-number">${index + 1}</span>` +
                '</span>' +
            `<span class="item-text">${text}</span>`
        todoItems.push(todoElement)
    })
    todoItems.map(item => {
        todoItemsContainer.appendChild(item)
    })
}

function interactiveAction(){
    if(deleteMode && choiceId !== -1){
        deleteItemElementById(choiceId)
        choiceId = -1
    }
    saveToDoMemory()
}

function deleteItemElementById(id){
    todoItemsData[id - 1] = ''
    todoItemsData = todoItemsData.filter(item => item !== '')
    renderToDoElements()
}
// Functions