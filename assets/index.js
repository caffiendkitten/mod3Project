const URL = "http://localhost:3000/users"

function getUsers(){
    fetch (URL)
    .then(resp => resp.json())
    .then(json => displayUsers(json))
}

function displayUsers(userObj){
    console.log(userObj)
}















getUsers()
