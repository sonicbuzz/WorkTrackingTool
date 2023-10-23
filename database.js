const sql = require('mssql');

const dbconfig = {
    server: "localhost\\MSSQLSERVER",
    database: "70-461",
    user: "Sonicbuzz",
    password: "123456",
    port: 1433,
    encrypt: false, // Disable encryption (not recommended for production)
};

async function getEmp() {
    try {
        const pool = await new sql.ConnectionPool(dbconfig).connect();
        const result = await pool.request().query("select * from tblEmployee where EmployeeNumber =1");
        console.log(result.recordset);
        pool.close();
    } catch (err) {
        console.log(err);
}
}
getEmp();