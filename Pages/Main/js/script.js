let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')

sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.remove('-right-96')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.add('-right-96')
})