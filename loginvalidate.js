import sql from 'mssql';

const dbconfig = {
    server: "localhost\\MSSQLSERVER",
    database: "70-461",
    user: "Sonicbuzz",
    password: "123456",
    port: 1433,
    encrypt: false, // Disable encryption (not recommended for production)
};

async function uservalid(user,pwd) {
    try {
        const pool = await new sql.ConnectionPool(dbconfig).connect();
        const result = await pool.request().input('username',sql.NVarChar,user).query("select password from UserCredentials where username =@username");
        if (result.recordset.length === 1) {
            const dbPassword = result.recordset[0].password;
            if (pwd === dbPassword) {
                pool.close();
                return 1;
            } else {
                pool.close();
                return 0;
            }
        } else {
            pool.close();
            return 'User not found.'; // User does not exist in the database
        }
    } catch (err) {
        console.log(err);
        return -1; // Return -1 to indicate an error
}
}
export default uservalid;