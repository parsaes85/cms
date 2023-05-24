const $ = document
const emailInput = $.getElementById('email-input')
const passwordInput = $.getElementById('password-input')
const signInBtn = $.getElementById('signIn-btn')
const allInputs = $.querySelectorAll('input[type=text], input[type=password]')
const adminsContainer = $.getElementById('admins-container')
const adminsInfoBtn = $.getElementById('admins-info-btn')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

let numberOfValidateInputs = 0

const signInAdmin = async () => {
    const adminInfo = {
        email: emailInput.value,
        password: passwordInput.value
    }

    let res = await fetch(`${mainUrl}/admins/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adminInfo)
    })
    let data = await res.json()

    if(data !== 'admin not found') {
        localStorage.setItem('user-token',data.mainAdmin.token)
        location.pathname = data.pathName
    } else {
        showErrorToast()
    }
}

const getAllAdmins = async () => {
    let res = await fetch(`${mainUrl}/admins`)
    let data = await res.json()

    showAllAdmins(data)
}

const showAllAdmins = (admins) => {
    admins.forEach(admin => {
        adminsContainer.insertAdjacentHTML('beforeend', `
        <div class="p-2 border-b-2">
            <div class="flex gap-1">
                <h1>email:</h1>
                <p class="text-gray-500">${admin.email}</p>
            </div>
            <div class="flex gap-1">
                <h1>password:</h1>
                <p class="text-gray-500">${admin.password}</p>
            </div>
        </div>
        `)
    })
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

const showErrorToast = () => {
    Toast.fire({
        icon: 'error',
        title: `مشخصات ادمین اشتباه است`,
    })
}


window.addEventListener('load', getAllAdmins)
signInBtn.addEventListener('click', e => {
    e.preventDefault()
    validateInputs()

    if(numberOfValidateInputs === 2) signInAdmin() 

    numberOfValidateInputs = 0
})
adminsInfoBtn.addEventListener('click', e => {
    adminsContainer.classList.remove('hidden')
})
window.addEventListener('click', e => {
    if(e.target.tagName !== "H1") adminsContainer.classList.add('hidden')
})