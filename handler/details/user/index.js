import connection from '../../../db/connection';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import { applyUnock } from './unlock/applyUnlock';
import { identity } from '../../../utils/identity';
const jwt = require('jsonwebtoken');

const doGetUserDetails = (req, res) => {
    const decoded = _get(req, 'decoded', {}) || {};
    console.log("decoded", decoded)
    const { id }  = decoded;
    if (!_isEmpty(id)) {
        //connection.connect()
        connection.query(`SELECT id, fName, lName, phone, email FROM BJS_SIGNUP WHERE id='${id}' `, function (error, results, fields) {
            if (!error) {
                const data = _head(JSON.parse(JSON.stringify(results)));
                const id = _get(data, 'id');
                const fName = _get(data, 'fName');
                const lName = _get(data, 'lName');
                const phone = _get(data, 'phone');
                const email = _get(data, 'email');
                const resp = {
                    id, 
                    fName, 
                    lName, 
                    phone, 
                    email, 
                }

                const unlockedResp = applyUnock(resp, hash, iv);

                const respData = identity(unlockedResp);
                const useragent = _get(req, 'useragent', {}) || {};
                const respWithUserAgent = { ...respData, ...useragent };
                const token = jwt.sign(respWithUserAgent, 'kashish');
                const respAuth = {
                    success: true,
                    message: 'Authentication successful!',
                    token,
                    data: resp,
                };
                res.status(200);
                res.send(respAuth);
            } else {
                res.status(500);
                res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
                res.send(`something went wrong trace - ${error}`);
            }
        });
        //connection.end();
    } else {
        res.status(500);
        res.statusMessage = JSON.stringify({error: `something went wrong trace - ${error}`});
        res.send(`something went wrong trace - ${error}`);
    }
}

export default doGetUserDetails;