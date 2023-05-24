let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')
const tableBody = $.getElementById('table-body')
const editModal = $.getElementById('edit-modal')
const usersList = $.getElementById('users-list')
const closeEditModalBtn = $.getElementById('close-edit-modal-btn')
const userFirstnameInput = $.getElementById('user-firstname-input')
const userLastnameInput = $.getElementById('user-lastname-input')
const userEmailInput = $.getElementById('user-email-input')
const userPasswordInput = $.getElementById('user-password-input')
const editBtn = $.getElementById('edit-btn')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

let globalUserId = null

const getAllUsers = async () => {
    let res = await fetch(`${mainUrl}/users`)
    let data = await res.json()

    showAllUsers(data)
}

const deleteUser = async () => {
    let res = await fetch(`${mainUrl}/users/${globalUserId}`, {
        method: "DELETE"
    })
    let data = await res.text()

    await getAllUsers()
    showSuccessToast('حذف')
}

const editUser = async () => {
    let editedUserObj = {
        firstname: userFirstnameInput.value,
        lastname: userLastnameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value
    }

    let res = await fetch(`${mainUrl}/users/${globalUserId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedUserObj)
    })
    let data = await res.text()

    await getAllUsers()
    hideEditModal()
    showSuccessToast('ویرایش')
}

const showAllUsers = async (users) => {
    tableBody.innerHTML = ''

    users.forEach(user => {
        tableBody.insertAdjacentHTML('beforeend', `
        <tr class="align-middle">
            <td class="text-center py-2">${user.id}</td>
            <td class="text-center py-2">${user.firstname}</td>
            <td class="text-center py-2">${user.lastname}</td>
            <td class="text-center py-2">${user.email}</td>
            <td class="text-center py-2">${user.password}</td>
            <td class="text-center py-2">
                <button type="button" onclick='showEditModal(${JSON.stringify(user)})' class="bg-blue-600 py-2 px-4 rounded-md text-white text-sm">
                    ویرایش
                </button>
            </td>
            <td class="text-center py-2">
                <button type="button" onclick='showDeleteModal(${user.id})' class="bg-red-600 py-2 px-4 rounded-md text-white text-sm">
                    حذف
                </button>
            </td>
        </tr>
        `)
    })
}

const showDeleteModal = (userId) => {
    Swal.fire({
        title: 'آیا کاربر حذف شود؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله, حذف شود!',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUser()
        }
    })

    globalUserId = userId
}

const showEditModal = (user) => {
    editModal.classList.remove('hidden')
    usersList.classList.add('hidden')

    userFirstnameInput.value = user.firstname
    userLastnameInput.value = user.lastname
    userEmailInput.value = user.email
    userPasswordInput.value = user.password

    globalUserId = user.id
}
const hideEditModal = () => {
    editModal.classList.add('hidden')
    usersList.classList.remove('hidden')
}

const showSuccessToast = (method) => {
    Toast.fire({
        icon: 'success',
        title: `کاربر با موفقیت ${method} شد`,
    })
}

window.addEventListener('load', getAllUsers)
closeEditModalBtn.addEventListener('click', hideEditModal)
editBtn.addEventListener('click', e => {
    e.preventDefault()
    editUser()
})
sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})