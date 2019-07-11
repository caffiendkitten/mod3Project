const userURL = "http://localhost:3000/users"
const taskListURL = "http://localhost:3000/tasklists"
const taskURL = "http://localhost:3000/tasks"
const navbar = document.getElementById("navbar")

const form = document.getElementsByClassName("form-group")
const mainContainer = document.getElementById('main')

 function main(){

getUsers();
getTasks();
getTasklists();

        function getUsers(){
            fetch (userURL)
            .then(resp => resp.json())
            .then(json => displayUsers(json))
        }
        function getTasklists(){
            fetch (taskListURL)
            .then(resp => resp.json())
            .then(json => showTaskLists(json))
        }
        function getTasks(){
            fetch (taskURL)
            .then(resp => resp.json())
            .then(json => displayTasks(json))
        }

        function displayUsers(usersObj){
            for(let i =0; i < usersObj.length;i++){
                displayUser(usersObj[i])
            }
        }
        function displayUser(userObj){
            // console.log(userObj)
            const welcomeUser = document.getElementById("usersTasks")
            // console.log("hit")
            if (userObj.id === 1){
                // console.log("hi")
            }
            if (userObj.id === 2){
                // console.log("hi")
            }
            if (userObj.id === 3){
                // console.log("hi")
            }
            if (userObj.id === 4){
                // console.log("hi")
            }
        }

        function displayTasks(taskObj){
            for(let i =0; i < taskObj.length;i++){
                // console.log(taskObj[i])
            }
        }

        function displayTasklist(tasklistObj){
            for(let i =0; i < tasklistObj.length;i++){
                // console.log(tasklistObj[i])
            }
        }


        function showTaskLists(tasklists) {
            const showList = document.getElementById("showList")

            for(let i =0; i < tasklists.length;i++){
                // console.log(tasklists[i])
                let aTag = document.createElement("a")
                aTag.setAttribute("data-toggle", "modal" )
                aTag.setAttribute("data-target", "modal")

                aTag.addEventListener("click", () => {
                    while(mainContainer.firstChild){
                        mainContainer.removeChild(mainContainer.firstChild)
                    }
                    displayModal(tasklists[i]);
                    //call input formInput
                    //show project list
                })
                aTag.textContent = tasklists[i].title
                showList.appendChild(aTag)
            }
        }

        function displayModal(tasklists){
            const form = document.createElement('form')
            form.setAttribute("class", "form-group")
            const formInput = document.createElement('input')
            const formSubmitButton = document.createElement('button')
            formSubmitButton.innerText = "Add a Task"


            let tasks = tasklists.tasks
            const displayBox = document.createElement('div')
            displayBox.classList.add("task-show-popup")
            displayBox.setAttribute("id", "task-show-popup")
            const taskUl = document.createElement("ul")
            for(let i = 0; i < tasks.length; i++){
                let taskLi = document.createElement('li')
                taskLi.textContent = tasks[i].item
                taskUl.appendChild(taskLi)

                let removeButton = document.createElement("button")
                removeButton.addEventListener("click", () =>{
                    taskLi.setAttribute("class", "hidden")
                    deleteItem(taskLi, tasks[i]);
                })
                removeButton.textContent = "Remove me from your silly game"
                removeButton.setAttribute("id", "removeBtn")
                taskLi.appendChild(removeButton)
            }
            form.appendChild(formInput)
            form.appendChild(formSubmitButton)
            displayBox.appendChild(form)

            displayBox.appendChild(taskUl)
            mainContainer.appendChild(displayBox)

            form.addEventListener('submit', ()=>{
                event.preventDefault()
                // console.log(formInput.value)
                addToList(tasks, formInput.value)
                // console.log("hello")
            })
        }

        function deleteItem(taskLi, task){
            //deletestuff
            console.log(task)
            fetch(`${taskURL}/${task.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: task.id
                })
            })
            .then(getTasks)
        }



        function addToList(task, formInput){
            const displayBox = document.getElementById("task-show-popup")
            const newItem = document.createElement('li')
            newItem.innerText = formInput
            displayBox.appendChild(newItem)
            // console.log(formInput)
            addTasktoDb(task, formInput)

            //save to database
        }

        function addTasktoDb(task, formInput){
            // console.log(task[0].tasklist_id)
            // debugger;
            fetch(taskURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    item: formInput,
                    tasklist_id: task[0].tasklist_id

                })
            })
            .then(res =>res.json())
            .then(json => console.log(json))
        }
}








main();
