let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')
const submitBtn = $.getElementById('submit-btn')
const productTitleInput = $.getElementById('product-title-input')
const productPriceInput = $.getElementById('product-price-input')
const productCountInput = $.getElementById('product-count-input')
const availableRadio = $.getElementById('available-radio')
const allInputs = $.querySelectorAll('input[type=text]')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

let numberOfValidateInputs = 0

const addNewProduct = async () => {
    let newProductObj = {
        title: productTitleInput.value,
        price: productPriceInput.value,
        count: productCountInput.value,
        isAvailable: Number(availableRadio.checked)
    }

    let res = await fetch(`${mainUrl}/products`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProductObj)
    }) 
    let data = await res.text()

    emptyInputsValue()
    showSuccessToast()
}

const emptyInputsValue = () => {
    productTitleInput.value = ''
    productPriceInput.value = ''
    productCountInput.value = ''
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
        title: 'محصول با موفقیت اضافه شد',
    })
}

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    validateInputs()

    if(numberOfValidateInputs === 3) addNewProduct()
    numberOfValidateInputs = 0
})
sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})