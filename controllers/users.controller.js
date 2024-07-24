const User = require("../models/user");

class UsersController {
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUser(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw Error("User not found!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async editUser(user) {
    const { id, name, username, email, password, role } = user;
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw Error("User not found!");
      }
      const updatedUser = await user.update(user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersController;
