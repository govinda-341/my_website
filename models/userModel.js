const bcrypt = require('bcryptjs');

let users = [];

module.exports = {
    users,
    createUser: async (username, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: users.length + 1, username, email, password: hashedPassword };
        users.push(user);
        return user;
    },
    findUserByEmail: (email) => users.find(u => u.email === email)
};
