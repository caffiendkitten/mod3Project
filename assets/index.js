const userURL = "http://localhost:3000/users"
const taskListURL = "http://localhost:3000/tasklists"
const taskURL = "http://localhost:3000/tasks"
const navbar = document.getElementsByClassName("topnav")

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

//============= BEGIN display Users Drop down
        function displayUsers(usersObj){
            const welcomeUser = document.getElementById("myDropdown")

            for(let i =0; i < usersObj.length;i++){
                let a2Tag = document.createElement("a")
                a2Tag.textContent = usersObj[i].name
                welcomeUser.appendChild(a2Tag)
            }

            // console.log("users",usersObj)
        }
//============= END display Users Drop down




//============= BEGIN display Project List
        function showTaskLists(tasklists) {
            // console.log(tasklists)
            // while(navbar.firstChild){
            //     navbar.removeChild(navbar.firstChild)
            // }
            const showList = document.getElementById("showList")
            while(showList.children.length > 0) {
                showList.children[0].remove();
            }
            const deleteBtn = document.getElementById("deleteProject")
            deleteBtn.addEventListener("click", ()=> {
                deleteList(tasklists)
                 // console.log("I wanna go to sleep!!")

            })
            for(let i =0; i < tasklists.length;i++){
                // console.log(tasklists[i])
                let aTag = document.createElement("a")
                aTag.setAttribute("class", "dropdown" )
                // aTag.setAttribute("class", "fa fa-caret-down")

                aTag.addEventListener("click", () => {
                    while(mainContainer.firstChild){
                        mainContainer.removeChild(mainContainer.firstChild)
                    }
                    displayTasks(tasklists[i]);
                    //call input formInput
                    //show project list
                })
                aTag.textContent = tasklists[i].title
                showList.appendChild(aTag)
            }
        }

//============= BEGIN display each task within the Project List
        function displayTasks(tasklists){
            // const taskListId = document.createElement("input")
            // taskListId.setAttribute("class", "hidden")
            const form = document.createElement('form')
            form.setAttribute("class", "form-group")
            form.setAttribute("id", "form-group")
            const formInput = document.createElement('input')
            const formSubmitButton = document.createElement('button')
            formSubmitButton.innerText = "Add a Task"

            // console.log(tasklists.tasks)
            let stuff = tasklists.tasks
            // console.log("stuff",stuff)
            const displayBox = document.createElement('div')
            displayBox.classList.add("task-show-popup")
            displayBox.setAttribute("id", "task-show-popup")
            const taskUl = document.createElement("ul")
            taskUl.setAttribute("id", "taskUl")
            for(let i = 0; i < stuff.length; i++){
                let taskLi = document.createElement('li')
                taskLi.textContent = stuff[i].item
                // console.log(stuff[i])
                taskUl.appendChild(taskLi)

                let removeButton = document.createElement("button")
                removeButton.addEventListener("click", () =>{
                    taskLi.setAttribute("class", "hidden")
                    deleteItem(taskLi, stuff[i]);
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
                addToList(stuff, formInput.value, tasklists.id)
                // console.log("hello")
                document.getElementById("form-group").reset();
            })
        }

        function deleteItem(taskLi, task){
            //deletestuff
            // console.log(task)
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
            // .then(res =>res.json())
            // .then(json => console.log(json))
        }

        const newProject = document.getElementById("newProject")
        newProject.addEventListener("click", () =>{
            while(mainContainer.firstChild){
                mainContainer.removeChild(mainContainer.firstChild)}
            createNewProject()
        })
        function createNewProject(){
            // console.log("hit new proejct")
            const newProjectForm = document.createElement("form")
            newProjectForm.setAttribute("id", "projectForm")
            const newPFInput = document.createElement("input")
            const newPFButton = document.createElement("button")
            newPFButton.innerText = "New Project"

            newProjectForm.appendChild(newPFInput)
            newProjectForm.appendChild(newPFButton)
            mainContainer.appendChild(newProjectForm)
            newProjectForm.addEventListener('submit', ()=>{
                event.preventDefault()
                saveProject(newPFInput.value)
                document.getElementById("projectForm").reset();
            })
        }
        function saveProject(projectTitle){
            // console.log(projectTitle)
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
            .then(json => getTasklists())
        }



//Get TaskLists
        function deleteList(tasklists){
            while(mainContainer.firstChild){
                mainContainer.removeChild(mainContainer.firstChild)}
            const card = document.createElement("div")
            // console.log(tasklists)

            let projectList = document.createElement("ul")
            for(let i = 0; i < tasklists.length; i ++){
                let project = document.createElement("li")
                // console.log("I'm hungary")
                let deleteBtn = document.createElement("button")
                deleteBtn.setAttribute("class", "danger")
                deleteBtn.innerText = "Delete This Project"
                deleteBtn.addEventListener("click", ()=>{

                    deleteProject(tasklists[i])
                    while(mainContainer.firstChild){
                        mainContainer.removeChild(mainContainer.firstChild)}
                    // debugger;

                    project.classList.add("hidden")
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

                }).then(() => getTasklists())
                // getTasklists(); //repopulates nav bar
            }
}


main();
