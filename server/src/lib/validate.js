import validator from 'validator'

const validate = (data)=>{
    const mandatoryField = ["email", "password", "firstName", "lastName", "phone"]
    const isAllowed = mandatoryField.every((field)=> Object.keys(data).includes(field))

    if(!isAllowed){
        throw new Error("Field required")
    }

    if(!validator.isEmail(data.email)){
        throw new Error("Invalid email")
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak password")
    }
}

export default validate