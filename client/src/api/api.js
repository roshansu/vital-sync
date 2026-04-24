import { getUserData } from "../lib/setLocalData"


// const baseApi = 'https://vital-sync-ve9t.vercel.app'
const baseApi = 'http://localhost:5000'

export const userAuth = async(route, data)=>{
    try{
        const res = await fetch(`${baseApi}/api${route}`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await res.json()
        console.log(response)
        return response
    }catch(err){
        console.log(err)
    }
}

const userData = getUserData()

export const userLogout = async(route)=>{
    try{
        const res = await fetch(`${baseApi}/api${route}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${userData.token}`,
            },
        })

        const response = await res.json()
        console.log(response)
        return response
    }catch(err){
        console.log(err)
    }   
}