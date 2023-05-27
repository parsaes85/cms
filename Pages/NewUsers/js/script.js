let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')
const submitBtn = $.getElementById('submit-btn')
const userFirstnameInput = $.getElementById('user-firstname-input')
const userLastnameInput = $.getElementById('user-lastname-input')
const userEmailInput = $.getElementById('user-email-input')
const userPasswordInput = $.getElementById('user-password-input')
const userRadio = $.getElementById('user-radio')
const fileInputContainer = $.getElementById('file-input-container')
const fileInput = $.querySelector('#file-input-container input')
const allInputs = $.querySelectorAll('input[type=text], input[type=password]')
const form = $.querySelector('form')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

let numberOfValidateInputs = 0
let imgSrc = null

const addNewUser = async () => {
    const newUserObj = {
        firstname: userFirstnameInput.value,
        lastname: userLastnameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value,
        token: crypto.randomUUID()
    }

    let res = await fetch(`${mainUrl}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserObj)
    })
    let data = await res.text()

    emptyInputsValue()
    showSuccessToast('کاربر')
} 

const addNewAdmin = async () => {
    const newAdminObj = {
        firstname: userFirstnameInput.value,
        lastname: userLastnameInput.value,
        email: userEmailInput.value,
        password: userPasswordInput.value,
        token: crypto.randomUUID(),
        img: imgSrc
    }

    let res = await fetch(`${mainUrl}/admins`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAdminObj)
    })
    let data = await res.text()

    emptyInputsValue()
    showSuccessToast('ادمین')
} 

const emptyInputsValue = () => {
    userFirstnameInput.value = ''
    userLastnameInput.value = ''
    userEmailInput.value = ''
    userPasswordInput.value = ''
}

const validateInputs = () => {
    allInputs.forEach(input => {
        if(input.value) {
            numberOfValidateInputs+=1
            input.nextElementSibling.classList.add('hidden')
        } else {
            input.nextElementSibling.classList.remove('hidden')
        }
    })
}

const showSuccessToast = (role) => {
    Toast.fire({
        icon: 'success',
        title: `${role} با موفقیت اضافه شد`,
    })
}

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    validateInputs()

    if(numberOfValidateInputs === 4) {
        if(userRadio.checked) {
            addNewUser()
        } else {
            addNewAdmin()
        } 
    }

    numberOfValidateInputs = 0
})
form.addEventListener('change', () => {
    if(!userRadio.checked) {
        fileInputContainer.classList.remove('hidden')
    } else if (userRadio.checked) {
        fileInputContainer.classList.add('hidden')
    }
})
fileInput.addEventListener('change', (e) => {
    imgSrc = URL.createObjectURL(e.target.files[0])
})
sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})