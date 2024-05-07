import User from '../models/user.js'

export const getUsers = async () => {
    const users = await User.find()
    return users
}

export const getUser = async (id) => {
    const user = User.findById(id)
    return user
}

export const createUser = async (params) => {
    const user = new User({
        userid: params.userid,
        username: params.username,
        useremail: params.useremail,
        userage: params.userage,
        usergender: params.usergender,
        userphone: params.userphone,
        usercpf: params.usercpf,
        userrg: params.userrg
    })

    await user.save()
    return user
}

export const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, {
        userid: params.userid,
        username: params.username,
        useremail: params.useremail,
        userage: params.userage,
        usergender: params.usergender,
        userphone: params.userphone,
        usercpf: params.usercpf,
        userrg: params.userrg
    }, {
        new: true
    })
    return user
}

