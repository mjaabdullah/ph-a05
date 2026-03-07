const btnAll = document.getElementById('btn-all');
const btnOpen = document.getElementById('btn-open');
const btnClosed = document.getElementById('btn-closed');
const allBtns = [btnAll, btnOpen, btnClosed];

function toggleActiveBtn(btn) {
    if (btn) {
        currentBtnId = btn.id; 
    allBtns.forEach((b) => {
        b.classList.remove('btn-primary');
       
    });
    document.getElementById(currentBtnId).classList.add('btn-primary');
    }
}
