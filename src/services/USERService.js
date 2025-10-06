import db from '../models/index.js';

let createNewUser = async (data) => {
    try {
        let user = await db.User.create({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        console.log('Create user successfully');
        return user;
    } catch (error) {
        console.log('Error to create account',error);
        return null;
    }
}

let getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user);
            }  else {
                resolve([]);
            }
        }catch (error) {
            reject(error);
        }
    })
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject)=> {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.username = data.username;
                user.email = data.email;
                user.password = data.password;
                user.status = data.status;
                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
            console.log('Error to update user!', error);
        }
    })
}

let deteleUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user =await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
            console.log('Error to delete user!', error);
        }
    })
}

let checkLogin = async (email, password) => {
    try {
        let user = await db.User.findOne({ where: { email}, raw: true, });
        if (user && user.password === password) {
            return user;
        }
        return null;
    }catch (error) {
        console.log('Error to login!', error);
        return null;
    }
}

export default {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deteleUserById: deteleUserById,
    checkLogin: checkLogin,

}