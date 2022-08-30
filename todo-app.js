
(function () {
    let saveStorage = []   /// тут хранятся данные о пунктах списка
    
    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }

    function createTodoItemForm() {
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')
        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = 'Введите название нового дела'
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary')
        button.disabled = true
        button.textContent = 'Добавить дело'
    
        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)
    
        return {
            form,
            input,
            button,
        }
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li')
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        item.textContent = name

        buttonGroup.classList.add('btn-group', 'btn-group-sm')
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово'
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить'

        buttonGroup.append(doneButton)
        buttonGroup.append(deleteButton)
        item.append(buttonGroup)

        return {
            item,
            doneButton,
            deleteButton
        }
    }




    
    
    function createTodoApp(container, title = 'Список дел', todoBeforeList = []) {   
        // let todoBeforeList = [{''}]
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList()

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        function updateStorage () {
            let getItem = JSON.parse(localStorage.getItem(title))
    
            if (getItem !== null) {
                saveStorage = getItem
                localStorage.removeItem(title)
            }
    
    
            // console.log(saveStorage)
        }
    
        function recoverStorage () {
            localStorage.setItem(title, JSON.stringify(saveStorage)) //////  обновляет saveStorage в localStorage каждый раз при использовании функции
            // console.log('внесены изменения')
        }

        updateStorage ()
        
        function createItem(newValue, todoAfterItem) {
            
            let todoItem = createTodoItem(newValue)

            let saveStorageKey = String(todoItem.item.textContent).substring(0, String(todoItem.item.textContent).length - 13)

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success')

                let doneStatus = todoItem.item.classList.contains('list-group-item-success')

                let i = -1

                for (let elem of saveStorage) {
                    i++
                    if (Object.values(elem).includes(saveStorageKey)) {
                        saveStorage[i].done = doneStatus 
                        recoverStorage ()
                    }
                }
                
            })

            
            
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove() /// и найти нужно его в saveStorage и удалить 
                    let l = 0
                    for (let findStor of saveStorage) {
                        
                        if (findStor.name !== saveStorageKey) {
                            l++
                        } else {
                            break;
                        }
                    }
                    saveStorage.splice(l, 1)
                }
                recoverStorage ()
            })
            todoList.append(todoItem.item)

            if (todoAfterItem !== undefined) {
                if (todoAfterItem.done == true) {
                    todoItem.item.classList.add('list-group-item-success')
                }  
            }

            let checkDone = todoItem.item.classList.contains('list-group-item-success')
            
            let nthSave = {name: newValue, done: checkDone}

            /////проверка на наличие такого елемента в saveStorage
            let j = 0
            for (let itm of saveStorage) {
                if (itm.name == nthSave.name) {
                    j++
                }
            }
            if (j < 1) {
                saveStorage.push(nthSave)
            }
            recoverStorage ()
        }
        

        function drawingObjects () {

            for (let todoAfterItem of saveStorage) {
                createItem(todoAfterItem.name, todoAfterItem)
            }

            for (let beforeItem of todoBeforeList) {
                if ((saveStorage.find(item => item.name == beforeItem.name)) == undefined) {
                    createItem(beforeItem.name, beforeItem)
                }
            }
        }
        drawingObjects ()

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault()

            if(!todoItemForm.input.value) {
                return;  
            } 

            let newValue = todoItemForm.input.value

            if (saveStorage.find(item => item.name == newValue)) {
                alert('Такие БуКвЫ уже были')
            } else {
                createItem(newValue)
            }

            
            todoItemForm.input.value = ''
        })
      
        
    }
    

    function todoDisabledBtn () {
        let input = document.querySelector('input')
        let button = document.querySelector('.btn')

        input.addEventListener('input', function () {
            if (input.value === '') {
                button.disabled = true
            } else {
                button.disabled = false
            }
        })
    }




    window.createTodoApp = createTodoApp


    document.addEventListener('DOMContentLoaded', function () {

        todoDisabledBtn()
    })


})();



