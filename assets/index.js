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
                console.log(tasklists[i])
                let li = document.createElement("li")
                li.setAttribute("data-toggle", "modal" )
                li.setAttribute("data-target", "modal")
                li.addEventListener("click", () => {
                    displayModal(tasklists[i]);
                })
                li.textContent = tasklists[i].title
                showList.appendChild(li)
            }


        }
        function displayModal(tasklists){

            let tasks = tasklists.tasks
            const displayBox = document.createElement('div')
            displayBox.classList.add("task-show-popup")
            // displayBox.setAttribute("id", "modal")
            const taskUl = document.createElement("ul")
            for(let i = 0; i < tasks.length; i++){
                let taskLi = document.createElement('li')
                taskLi.textContent = tasks[i].item
                taskUl.appendChild(taskLi)

                let removeButton = document.createElement("button")
                removeButton.addEventListener("click", () =>{
                    deleteItem(taskLi, tasks[i]);
                })
                removeButton.textContent = "Remove me from your silly game"
                removeButton.setAttribute("id", "removeBtn")
                taskLi.appendChild(removeButton)
            }
            // while(displayBox.firstChild){
            //     displayBox.removeChild(displayBox.firstChild)
            // }

            displayBox.appendChild(taskUl)
            mainContainer.appendChild(displayBox)





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

}


main();
