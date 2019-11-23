import connection from '../../db/connection';

const doLogin = (req, res) => {
    const parsedBody = req.body;
    connection.connect()
    connection.query('SELECT * FROM BJS_LOGIN', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    connection.end();
    console.log("req body", parsedBody);
    res.send("done");
}

export default doLogin;