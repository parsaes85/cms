let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')
const adminInfo = $.getElementById('admin-info')
const tableBody = $.getElementById('table-body')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

const getMainUser = async () => {
    let adminToken = localStorage.getItem('user-token')

    let res = await fetch(`${mainUrl}/admins/main`, {
        method: "GET",
        headers: {
            authorization: adminToken 
        }
    })
    let data = await res.json()

    adminInfo.innerHTML = `${data[0].firstname} ${data[0].lastname}`
}

const getAllUsers = async () => {
    let res = await fetch(`${mainUrl}/users`)
    let data = await res.json()

    filterAndShowUser(data)
}

const filterAndShowUser = (users) => {
    let filteredUser = users.filter(user => {
        let userSignedInTime = new Date(`${user.CREATED_AT}`).getTime()
        let now = new Date().getTime()

        return now - userSignedInTime < 86400000
    })

    filteredUser.forEach(user => {
        tableBody.insertAdjacentHTML('beforeend' ,`
        <tr class="align-middle">
            <td class="text-center py-2">${user.id}</td>
            <td class="text-center py-2">${user.firstname}</td>
            <td class="text-center py-2">${user.lastname}</td>
            <td class="text-center py-2">${user.email}</td>
            <td class="text-center py-2">${user.password}</td>
        </tr>
        `)
    })
}

sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})
window.addEventListener('load', () => {
    getMainUser()
    getAllUsers()
})