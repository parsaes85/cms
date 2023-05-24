const $ = document
const firstnameInput = $.getElementById('firstname-input')
const lastnameInput = $.getElementById('lastname-input')
const emailInput = $.getElementById('email-input')
const passwordInput = $.getElementById('password-input')
const submitBtn = $.getElementById('submit-btn')
const allInputs = $.querySelectorAll('input[type=text], input[type=password]')

const mainUrl = 'https://cms-backend.iran.liara.run/api'
let numberOfValidateInputs = 0

const addNewUser = async () => {
    let newUserObj = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
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
    showSuccessToast()
}

const emptyInputsValue = () => {
    firstnameInput.value = ''
    lastnameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''
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

const showSuccessToast = () => {
    Toast.fire({
        icon: 'success',
        title: `ثبت نام با موفقیت انجام شد`,
    })
}

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    validateInputs()

    if(numberOfValidateInputs === 4) addNewUser()

    numberOfValidateInputs = 0
})