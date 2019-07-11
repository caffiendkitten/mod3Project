const userURL = "http://localhost:3000/users"
const taskListURL = "http://localhost:3000/tasklists"
const taskURL = "http://localhost:3000/tasks"
const navbar = document.getElementById("navbar")

const form = document.getElementsByClassName("form-group")
const mainContainer = document.getElementById('main')

 function main(){

getUsers();
getTasklists();

//fetch User list
        function getUsers(){
            fetch (userURL)
            .then(resp => resp.json())
            .then(json => displayUsers(json))
        }

//fetch TaskLists and their listed Items
        function getTasklists(){
            fetch (taskListURL)
            .then(resp => resp.json())
            .then(json => showTaskLists(json))
        }

        ///Get individual tasks
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

        //Display User --NOT FUNCTIONAL
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


        function showTaskLists(tasklists) {
            const showList = document.getElementById("showList")
            const deleteBtn = document.getElementById("deleteProject")
            deleteBtn.addEventListener("click", ()=> {
                deleteList(tasklists)
                // console.log("I wanna go to sleep!!")
            })
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
            // const taskListId = document.createElement("input")
            // taskListId.setAttribute("class", "hidden")
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
            taskUl.setAttribute("id", "taskUl")
            for(let i = 0; i < tasks.length; i++){
                let taskLi = document.createElement('li')
                taskLi.textContent = tasks[i].item
                taskUl.appendChild(taskLi)

                let removeButton = document.createElement("button")
                removeButton.addEventListener("click", () =>{
                    taskLi.setAttribute("class", "hidden")
                    deleteItem(taskLi, tasks[i]);
                })
                removeButton.textContent = "Remove me"
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
                addToList(tasks, formInput.value, tasklists.id)
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



        function addToList(task, formInput, taskListId){
            const displayBox = document.getElementById("task-show-popup")
            const newItem = document.createElement('li')
            const boxUl = document.getElementById("taskUl")
            newItem.innerText = formInput

            boxUl.appendChild(newItem)
            // console.log(formInput)
            addTasktoDb(task, formInput, taskListId)

            //save to database
        }

        function addTasktoDb(task, formInput, taskListId){
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
                    tasklist_id: taskListId

                })
            })
            .then(res =>res.json())
            .then(json => console.log(json))
        }

        const newProject = document.getElementById("newProject")
        newProject.addEventListener("click", () =>{
            createNewProject()
        })
        function createNewProject(){
            // console.log("hit new proejct")
            const newProjectForm = document.createElement("form")
            const newPFInput = document.createElement("input")
            const newPFButton = document.createElement("button")
            newPFButton.innerText = "New Project"

            newProjectForm.appendChild(newPFInput)
            newProjectForm.appendChild(newPFButton)
            mainContainer.appendChild(newProjectForm)
            newProjectForm.addEventListener('submit', ()=>{
                event.preventDefault()
                saveProject(newPFInput.value)
            })
        }
        function saveProject(projectTitle){
            console.log(projectTitle)
            fetch(taskListURL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    title: projectTitle,
                    user_id: 1
                })
            })
            .then(res => res.json())
            .then(json => showTaskLists(json))
        }



//Get TaskLists
        function deleteList(tasklists){
            const card = document.createElement("div")
            console.log(tasklists)

            let projectList = document.createElement("ul")
            for(let i = 0; i < tasklists.length; i ++){
                let project = document.createElement("li")
                console.log("I'm hungary")
                let deleteBtn = document.createElement("button")
                deleteBtn.setAttribute("class", "danger")
                deleteBtn.innerText = "Delete This Project"
                deleteBtn.addEventListener("click", ()=>{
                    deleteProject(tasklists[i])
                })
                project.textContent = tasklists[i].title
                project.appendChild(deleteBtn)
                projectList.appendChild(project)
                card.appendChild(projectList)
            }

            mainContainer.appendChild(card)
        }
            function deleteProject(tasklist) {
                // console.log(tasklist.id)
                fetch(`${taskListURL}/${tasklist.id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        tasklist_id: tasklist.id
                    })

                })

            }
}


main();
