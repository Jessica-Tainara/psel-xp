const { Client } = require('../models');

const { generateJWTToken } = require('../utils/JWTtoken');

authentication = async ({ email, password }) => {
    if (!email || !password) {
        return { status: 400, message: 'Some required fields are missing' };
    }

    const user2 = await Client.findOne({
        attributes: ['fullName', 'email'],
        where: { email, password },
    });

    if (!user2) {
        return { status: 400, message: 'Invalid fields' };
    }

    const token = generateJWTToken(user2.dataValues);
    console.log(token);

    return token;
};

module.exports = {
    authentication,
};