const todoRepo = require('../repo/userRepo')

const getAllUsers = async  () => {
   const todo = await todoRepo.getAllUsers();
   return todo;
}
const createUser = async  ( body) => {
   const todo = await todoRepo.createUser( body);
   return todo
}

const updateUser  = async ( id, body) => {
    const todo = await todoRepo.updateUser(id, body);
    return todo;
}

const deleteUser  = async ( id) => {
   const todo = await todoRepo.deleteUser( id);
   return todo;
}


module.exports.getAllUsers =  getAllUsers
module.exports.createUser =  createUser
module.exports.updateUser =  updateUser
module.exports.deleteUser =  deleteUser