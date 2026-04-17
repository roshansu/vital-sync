
export const setUserData = (data)=>{
    console.log(data)
    localStorage.setItem('userData', JSON.stringify(data))
}

export const getUserData = ()=>{
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    return storedUser
}

export const clearUserData = ()=>{
    localStorage.clear()
    window.location.href = '/'
}