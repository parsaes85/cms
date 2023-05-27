const adminProfileName = document.getElementById('admin-profile-name')
const adminInfo = document.getElementById('admin-info')

const getMainAdmin = ( async () => {
    let adminToken = localStorage.getItem('user-token')

    let res = await fetch(`${mainUrl}/admins/main`, {
        method: "GET",
        headers: {
            authorization: adminToken 
        }
    })
    let data = await res.json()

    if(adminInfo) {
        adminInfo.innerHTML = `${data[0].firstname} ${data[0].lastname}`
    }
    adminProfileName.innerHTML = `${data[0].firstname} ${data[0].lastname}`
    // adminProfileImg.src = data[0].img
})();