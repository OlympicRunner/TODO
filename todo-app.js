
(function () {
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
    
    
    function createTodoApp(container, title = 'Список дел') {



        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList()

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)
        
        

        todoItemForm.form.addEventListener('submit', function(e) {

            // button.disabled = false

            e.preventDefault()


            if(!todoItemForm.input.value) {
                return;  
            } 


            let todoItem = createTodoItem(todoItemForm.input.value) 

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success')
            })

            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove()
                }
            })

            todoList.append(todoItem.item)


            todoItemForm.input.value = ''

            document.querySelector('.btn').disabled = true
        })
        
    }

    window.createTodoApp = createTodoApp


    document.addEventListener('DOMContentLoaded', function () {
        let input = document.querySelector('input')
        let button = document.querySelector('.btn')

        input.addEventListener('input', function () {
            if (input.value === '') {
                button.disabled = true
            } else {
                button.disabled = false
            }
        })
    })
})();



