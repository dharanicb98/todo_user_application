const User = require('../models/user');

const getAllUsers = async  () => {
   try {
      const users = await User.find();
      return users;
   }
   catch (e) {
      throw new Error(`db error ${e.message}`);
   }
}

const createUser = async  (body) => {
    try {
      const newUser = new User(body);
      await newUser.save();
      return newUser;
    }
    catch (e) {
      throw new Error(`db error ${e.message}`);
    }
}

const updateUser = async (id, body) => {
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, body, { new: true });
      return updatedUser;
    }
    catch (e) {
      throw new Error(`db error ${e.message}`);
   }
}

const deleteUser = async (id) => {
   try {
      const deletedUser = await User.findOneAndDelete({ _id: id });
      return deletedUser;
   }
   catch (e) {
       throw new Error(`db error ${e.message}`);
   }
}

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
