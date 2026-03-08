
const searchBtn = document.getElementById('search-btn');

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
  issuesCardsContainer.innerHTML = '';
  issues.forEach((issue) => {
    const card = makeIssuesCard(issue);
    issuesCardsContainer.appendChild(card);
  });
  loadingSpinner.classList.add('hidden');
    
}

const searchIssues = async (searchText) => {
  let response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);   
  let data = await response.json();

  let searchResults = data.data;
  renderIssuesCards(searchResults);
  issuesTotal.textContent = searchResults.length;
}

searchBtn.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.trim().toLowerCase();

  searchIssues(searchText);

});
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
const labelStyleMap = {
  "bug": {
    badge: "badge-error badge-outline",
    icon: "fa-solid fa-bug",
  },
  "help wanted": {
    badge: "badge-warning badge-outline",
    icon: "fa-solid fa-handshake-angle",
  },
  "enhancement": {
    badge: "badge-success badge-outline",
    icon: "fa-solid fa-wand-magic-sparkles",
  },
  "good first issue": {
    badge: "badge-secondary badge-outline",
    icon: "fa-solid fa-star",
  },
  "documentation": {
    badge: "badge-info badge-outline",
    icon: "fa-solid fa-book",
  },
};

function renderLabelBadge(label) {
  const key = String(label).trim().toLowerCase();
  const style = labelStyleMap[key] || {
    badge: "badge-ghost badge-outline",
    icon: "fa-solid fa-tag",
  };

  return `
    <span class="badge ${style.badge} gap-2 font-semibold">
      <i class="${style.icon} text-xs" aria-hidden="true"></i>
      ${String(label).toUpperCase()}
    </span>
  `;
}




const getSingleIssue = async (id) => {
  let response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    
    let data = await response.json();

    modalContent(data.data);
}

 
function modalContent(issue) {
  console.log(issue);

  const myModal = document.getElementById('my_modal_1');
  myModal.innerHTML = `
  <div class="modal-box">
    <div class="space-y-3">
      <h2 class="font-bold text-2xl ">${issue.title}</h2>
      <div class="text-xs flex items-center justify-start flex-wrap">
        <span class="text-white rounded-full py-1 px-3 ${issue.status == 'open' ? 'bg-green-600' : 'bg-[#A855F7]'}">${issue.status.toUpperCase()}</span>
        <span class="mx-2 h-1 w-1 rounded-full bg-gray-500 "></span>
        <span  class="text-gray-500">Opened by ${issue.author}</span>
        <span class="mx-2 h-1 w-1 rounded-full bg-gray-500 "></span>
        <span class="text-gray-500">${new Date(issue.createdAt).toLocaleDateString("en-GB")}</span>
      </div>
      <div class="flex gap-2 flex-wrap">
        
         ${issue.labels.map(label => renderLabelBadge(label)).join("")}
      </div>
      <p class="text-gray-600">
        ${issue.description}
      </p>


      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div>
          <p class=" text-gray-600">Assignee:</p>
          <h4 class="font-semibold">${issue.assignee}</h4>
        </div>
        <div>
          <p class="text-gray-600">Priority:</p>
          <span class="py-1 px-3 rounded-full ${issue.priority == 'high' ? 'bg-error text-white' : issue.priority == 'medium' ? 'bg-warning text-white' : 'bg-gray-200 text-gray-600'} ">
        ${issue.priority.toUpperCase()}</span>
        </div>
      </div>

    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
  `;
  
  myModal.showModal();

}


function makeIssuesCard(issue) {
    
    const card = document.createElement('div');
    card.classList.add('h-full');
    card.innerHTML = `
     
    <div onclick="getSingleIssue(${issue.id})" class="card bg-base-100 shadow-md border-t-4 h-full ${issue.status == 'open' ? 'border-success' : 'border-[#A855F7]'} text-sm">

    <div class="card-body gap-3 p-2">

    <!-- top section -->
    <div class="flex justify-between items-center">
      
    ${issue.status == 'open' ? `<img src="./assets/Open-Status.png" alt="Open Status" />` : `<img src="./assets/Closed- Status .png" alt="Closed Status" />`} 
      
        
      <div class="badge font-semibold text-sm ${issue.priority == 'high' ? 'badge-error badge-outline' : issue.priority == 'medium' ? 'badge-warning badge-outline' : 'bg-gray-200 text-gray-600'} ">
        ${issue.priority.toUpperCase()}
      </div>

    </div>

    <!-- Card title -->
    <h2 class="card-title font-semibold text-sm">
      ${issue.title}
    </h2>

    <!-- Card description -->
    <p class="text-xs text-base-content/70">
      ${issue.description}
    </p>

    <!-- Card tags -->
    <div class="flex gap-2 flex-wrap">
        

        ${issue.labels.map(label => renderLabelBadge(label)).join("")}

    </div>

  </div>

  <!-- Card footer -->
  <div class="border-t px-6 py-3 text-xs text-base-content/60">
    <p>#${issue.id} by ${issue.author}</p>
    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
  </div>

</div>
        
    `
    return card;
}