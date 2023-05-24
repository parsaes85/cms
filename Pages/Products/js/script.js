let $ = document
const sidebarCloseBtn = $.querySelector('.sidebar-close-btn')
const sidebarOpenBtn = $.querySelector('.sidebar-open-btn')
const sidebar = $.getElementById('sidebar')
const tableBody = $.getElementById('table-body')
const editModal = $.getElementById('edit-modal')
const productsList = $.getElementById('products-list')
const closeEditModalBtn = $.getElementById('close-edit-modal-btn')
const productTitle = $.getElementById('product-title')
const productPrice = $.getElementById('product-price')
const productCount = $.getElementById('product-count')
const productAvailableRadio = $.getElementById('product-available-radio')
const productUnavailableRadio = $.getElementById('product-unavailable-radio')
const editBtn = $.getElementById('edit-btn')
const allInputs = $.querySelectorAll('input[type=text]')

const mainUrl = 'https://cms-backend.iran.liara.run/api'

let globalProductId = null
let numberOfValidateInputs = 0

const getAllProducts = async () => {
    let res = await fetch(`${mainUrl}/products`)
    let data = await res.json()

    showAllProducts(data)
}

const deleteProduct = async () => {
    let res = await fetch(`${mainUrl}/products/${globalProductId}`, {
        method: "DELETE"
    })
    let data = await res.text()

    await getAllProducts()
    await showSuccessToast('حذف')
}

const editProduct = async () => {
    let editedProductObj = {
        title: productTitle.value,
        price: productPrice.value,
        count: productCount.value,
        isAvailable: productAvailableRadio.checked ? 1 : 0
    }

    let res = await fetch(`${mainUrl}/products/${globalProductId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedProductObj)
    })
    let data = await res.text()

    await getAllProducts()
    closeEditModal()
    showSuccessToast('ویرایش')
}

const showAllProducts = (products) => {
    tableBody.innerHTML = ''

    products.forEach(product => {
        tableBody.insertAdjacentHTML('beforeend', `
        <tr class="align-middle">
            <td class="text-center py-2">${product.id}</td>
            <td class="text-center py-2">${product.title}</td>
            <td class="text-center py-2">${product.count}</td>
            <td class="text-center py-2">${product.isAvailable? 'موجود':'ناموجود'}</td>
            <td class="text-center py-2">${product.price} تومان</td>
            <td class="text-center py-2">
                <button type="button" onclick='showEditModal(${JSON.stringify(product)})' class="bg-blue-600 py-2 px-4 rounded-md text-white text-sm">
                    ویرایش
                </button>
            </td>
            <td class="text-center py-2">
                <button type="button" onclick='showDeleteModal(${product.id})' class="bg-red-600 py-2 px-4 rounded-md text-white text-sm">
                    حذف
                </button>
            </td>
        </tr>
        `)
    })
}

const showDeleteModal = (productId) => {
    Swal.fire({
        title: 'آیا محصول حذف شود؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله, حذف شود!',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct()
        }
    })
    
    globalProductId = productId
}

const showEditModal = (product) => {
    editModal.classList.remove('hidden')
    productsList.classList.add('hidden')

    globalProductId = product.id

    productTitle.value = product.title
    productPrice.value = product.price
    productCount.value = product.count
    product.isAvailable ? productAvailableRadio.checked = true : productUnavailableRadio.checked = true
}
const closeEditModal = () => {
    editModal.classList.add('hidden')
    productsList.classList.remove('hidden')
}

const showSuccessToast = (method) => {
    Toast.fire({
        icon: 'success',
        title: `محصول با موفقیت ${method} شد`,
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

window.addEventListener('load', getAllProducts)
closeEditModalBtn.addEventListener('click', closeEditModal)
editBtn.addEventListener('click', e => {
    e.preventDefault()
    validateInputs()

    if(numberOfValidateInputs === 3) editProduct()
    numberOfValidateInputs = 0
})
sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.replace('-right-96', 'right-0')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.replace('right-0', '-right-96')
})

