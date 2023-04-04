let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')

sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})

Toast.fire({
    icon: 'success',
    title: 'کاربر با موفقیت اضافه شد',
})