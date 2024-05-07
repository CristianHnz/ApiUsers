import { Router } from 'express'
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/users.js'

const router = Router()

router.get("/", async (request, response) => {
    const users = await getUsers()
    return response.status(200).send(users)
})

router.get("/:id", async (request, response) => {
    const user = await getUser(request.params.id)
    return response.status(200).send(user)
})

router.post("/", async (request, response) => {
    const params = {
        userid: request.body.userid,
        username: request.body.username,
        useremail: request.body.useremail,
        userage: request.body.userage,
        usergender: request.body.usergender,
        userphone: request.body.userphone,
        usercpf: request.body.usercpf,
        userrg: request.body.userrg
    }
    if (!isValidEmail(params.useremail)) {
        return response.status(400).send("Email inválido");
    }

    if (!isValidCPF(params.usercpf)) {
        return response.status(400).send("CPF inválido");
    }
    const user = await createUser(params)
    return response.status(201).send(user)
})

router.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id)
    
    return response.status(204).send()
})

router.put("/:id", async (request, response) => {

    const user = await updateUser(request.params.id, {
        userid: request.body.userid,
        username: request.body.username,
        useremail: request.body.useremail,
        userage: request.body.userage,
        usergender: request.body.usergender,
        userphone: request.body.userphone,
        usercpf: request.body.usercpf,
        userrg: request.body.userrg
    })
    if (!isValidEmail( request.body.useremail)) {
        return response.status(400).send("Email inválido");
    }

    if (!isValidCPF(request.body.usercpf)) {
        return response.status(400).send("CPF inválido");
    }
    return response.status(200).send(user)
})

function isValidEmail(email) {
    // Expressão regular para verificar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '' || cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false; 
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;   
}

export default router