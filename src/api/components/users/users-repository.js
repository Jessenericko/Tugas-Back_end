const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
/* Get user detail
* @param {string} password - User PASWORD
 * @returns {Promise}
*/
async function getPassword(password) {
  return User.find({ password: password });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Get user detail
 * @param {string} email - User email
 * @returns {Promise}
 */
async function mailCheck(email) {
  return User.findOne({ email: email });
}

/**
 * Get Pass detail
 * @param {string} Password - User Password
 * @returns {Promise}
 */
async function passCheck(id, newpass) {
  await User.findByIdAndUpdate(id, { password: newpass });
}

/**
 * Get user detail (email)
 * @param {string} email - User email
 * @returns {Promise}
 */
async function getEmail(email) {
  return User.findOne({ email: email });
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  getEmail,
  getPassword,
  createUser,
  updateUser,
  deleteUser,
  mailCheck,
  passCheck,
};
