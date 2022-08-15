var getUserRepos = function(user){
    //github api url formated
    var apiURl= "https://api.github.com/users/" + user + "/repos";
    //request to the url 
    fetch(apiURl).then (function(response){
        response.json().then(function(data) {
        console.log(data);
        });
});

}

getUserRepos("shanicesauce");