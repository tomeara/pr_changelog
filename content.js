 // content.js

function writeChangelog(heading, body) {
  const prTextArea = document.getElementById('pull_request_body')
  prTextArea.innerHTML = heading + body
};

function getMergedPRs() {
  const commits = Array.from(document.getElementsByClassName('commit-message'))
  return commits.filter(function (commit){
    return commit.innerText.match(/Merge pull request #/)
  }).map(function (commit){
    let PRNumber = commit.innerText.match(/#\d*/)[0] + ' '
    let PRTitle  = commit.getElementsByTagName('pre')[0].innerText + ' ' +
                   String.fromCharCode(13)
    return '- ' + PRNumber + PRTitle
  }).reduce(function (prev, curr){
    return prev + curr
  })
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "create_changelog" ) {
      let heading = '## Changelog:' + String.fromCharCode(13)
      let body    = getMergedPRs()
      writeChangelog(heading, body)
    }
  }
);
