const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const { passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

async function changePass(id, passwordlama, passwordbaru, comfrimpass) {
  if (passwordbaru != comfrimpass) {
    throw new Error('salah :v');
  }
  const user = await usersRepository.getUser(id);
  const elig = await passwordMatched(passwordlama, user.password); //cek pasword lama ama baru
  if (!elig) {
    throw new Error('Password Yang sudah lama salah :v !');
  }
  const hashedPassword = await hashPassword(passwordbaru);
  await usersRepository.passCheck(id, hashedPassword);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Get user detail
 * @param {string} email - User ID
 * @returns {Promise}
 */
async function getemail(email) {
  const User = await usersRepository.getEmail(email);

  //email
  if (!User) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get password detail
 * @param {string} password - Password
 * @returns {Promise}
 */
async function getcekPassword(password) {
  const cekPassword = await usersRepository.getPassword(password);

  //password
  if (cekPassword) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get user detail
 * @param {string} email - User ID
 * @returns {Promise}
 */
async function mailChecks(email) {
  const User = await usersRepository.mailCheck(email);

  //email
  if (!User) {
    return true;
  } else {
    return false;
  }
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getemail,
  getcekPassword,
  mailChecks,
  changePass,
};
