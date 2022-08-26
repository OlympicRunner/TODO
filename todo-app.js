
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
    
    function createTodoApp(container, title = 'Список дел', todoBeforeList) {

        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList()

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)
        
        function createItem(newValue, todoAfterItem) {
            
            let todoItem = createTodoItem(newValue)

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success')
            })

            

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove()
                }
            })
            todoList.append(todoItem.item)

            if (todoAfterItem !== undefined) {
                if (todoAfterItem.done == true) {
                    todoItem.item.classList.add('list-group-item-success')
                }  
            }

            let checkDone = todoItem.item.classList.contains('list-group-item-success')
            
            let nthSave = {name: newValue, done: checkDone}
            saveStorage.push(nthSave)
            console.log(saveStorage)
            // localStorage.setItem(nthSave)
            // console.log(localStorage.getItem())
            //////  а вот дальше будем действовать от savestorage , брать обьекты оттуда и кидать в localstorage, при этом переводя в строку, и задавая имя в виде индекса в localStorage.setItem('test', 1). И при обновлении страницы мы достаем из localstorage , переводим обратно в обьект и проводим как изначльынй список

            
        }


        function addObjects () {
            let todoBeforeListMode = [...todoBeforeList, ...saveStorage]
            for (let todoAfterItem of todoBeforeListMode) {
                createItem(todoAfterItem.name, todoAfterItem)
            }
        }
        addObjects ()

        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault()

            if(!todoItemForm.input.value) {
                return;  
            } 

            let newValue = todoItemForm.input.value

            createItem(newValue)
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
    // localStorage['codStorage'] = JSON.stringify(saveStorage);
    

    window.createTodoApp = createTodoApp


    document.addEventListener('DOMContentLoaded', function () {
        todoDisabledBtn()
        // createTodoApp(container, title = 'asd', saveStorage)
    })
})();



