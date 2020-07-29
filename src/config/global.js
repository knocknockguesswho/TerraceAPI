const config = {
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB
    },
    jwtSecretKey: process.env.JWT_SECRET,
    jwtSecretKeyRefresh: process.env.JWT_SECRET_REFRESH
};

module.exports = config;