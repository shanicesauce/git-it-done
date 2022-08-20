var issueContainerEl = document.querySelector("#issues-container")
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        // request was successful
        if (response.ok){
            response.json().then(function(data){
                // pass response data to dom function
                displayIssues(data);
                // check if api has paginated issues
                if (response.headers.get("Link")){
                    displayWarning(repo);
                }
            })
        }
        else {
            alert ("There was a problem with your request")
        }
    });
};

getRepoIssues("facebook/react");

var displayIssues = function(issues){
    if (issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++){
        // create a link element to take users to the issue on github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target","_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issuesEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        issuesEl.appendChild(typeEl);
        issueContainerEl.appendChild(issuesEl);
    }
}

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl =document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
}