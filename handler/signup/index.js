import connection from '../../db/connection';
import _get from 'lodash/get';

const doSignup = (req, res) => {
    const parsedBody = req.body || {};
    console.log("parsedBody", parsedBody)
    const isEperienced = _get(parsedBody, 'isEperienced', {}) || {};
    const signupFirstTab = _get(parsedBody, 'signupFirstTab', {}) || {};
    const signupSecondTab = _get(parsedBody, 'signupSecondTab', {}) || {};
    const signupThirdTab = _get(parsedBody, 'signupThirdTab', {}) || {};
    const signupFourthTab = _get(parsedBody, 'signupFourthTab', {}) || {};
    const signupMandatory = _get(parsedBody, 'signupMandatory', {}) || {};
    const id = Date.now().toString();
    const email = _get(signupFirstTab, 'email', 'badcodercpp@gmail.com') || 'badcodercpp@gmail.com';
    const password = _get(signupFirstTab, 'passsword', 'bjs@123') || 'bjs@123';
    const name = _get(signupMandatory, 'name', 'bad coder') || 'bad coder';
    const mobileNo  = _get(signupMandatory, 'mobile', '9836648105') || '9836648105';
    const location = _get(signupFirstTab, 'location', 'bangalore') || 'bangalore';
    const resume = _get(signupFirstTab, 'resume', '') || ''
    connection.connect()
    connection.query(`INSERT INTO BJS_SIGNUP(id, name, email_id, password, mobile_no, location, resume) VALUES(${id}, ${name}, ${email}, ${password}, ${mobileNo}, ${location}, ${resume})`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
    connection.end();
    console.log("req body", parsedBody);
    res.send("done");
}

export default doSignup;