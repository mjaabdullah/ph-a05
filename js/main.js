const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClosed = document.getElementById('btn-closed');
const allBtns = [btnAll, btnOpen, btnClosed];



const issuesTotal = document.getElementById('issues');
const issuesCardsContainer = document.getElementById('issues-cards');

const loadingSpinner = document.getElementById('loading-spinner');

function toggleActiveBtn(btn) {
    if (btn) {
        currentBtnId = btn.id; 
    allBtns.forEach((b) => {
        b.classList.remove('btn-primary');
       
    });
    
    document.getElementById(currentBtnId).classList.add('btn-primary');

    if(currentBtnId == 'btn-all') {
      getIssues('all');
    } else if(currentBtnId == 'btn-open') {
      getIssues('open');
    } else if(currentBtnId == 'btn-closed') {
      getIssues('closed');
    }

}
}
const getIssues = async (order) => {
    issuesCardsContainer.innerHTML = '';
    loadingSpinner.classList.remove('hidden');
    let response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
      
    let data = await response.json();
        
    
    if(order == 'all') {
      renderIssuesCards(data.data);
      issuesTotal.textContent = data.data.length;
    } else if(order == 'open') {
      let openIssues = data.data.filter((issue) => issue.status == 'open');
      issuesTotal.textContent = openIssues.length;
      renderIssuesCards(openIssues);
    } else if(order == 'closed') {
      let  closedIssues = data.data.filter((issue) => issue.status == 'closed');
      issuesTotal.textContent = closedIssues.length;
      renderIssuesCards(closedIssues);
    }
}
getIssues('all');

function renderIssuesCards(issues) {
  
  issues.forEach((issue) => {
    const card = makeIssuesCard(issue);
    issuesCardsContainer.appendChild(card);
  });
  loadingSpinner.classList.add('hidden');
    
}

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

function makeIssuesCard(issue) {
    
    const card = document.createElement('div');
    card.classList.add('h-full');
    card.innerHTML = `
     
    
    `
    return card;
}