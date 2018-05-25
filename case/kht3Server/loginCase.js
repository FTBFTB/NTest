const querystring=require('querystring');  
let requestUtil = require('../../util/requestUtil');
let Promise=require('bluebird')
let assertUtil=require('../../util/assert');
let Common=require('../../util/common');
let Config=require('./config');

let params = querystring.stringify({
    account:'autotest',
    password:'e10adc3949ba59abbe56e057f20f883e',//'e10adc3949ba59abbe56e057f20f883e'
});

let data = {
    input: {
        params: params,
        options: {
            hostname: Config.HOST,
            port: Config.PORT,
            path: '/kht3Server/web_login.do',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(params)
            }
        }
    },
    output:{

    }

};

let params_fail = querystring.stringify({ 
    account:'autotest2',
    password:'e10adc3949ba59abbe56e057f20f883e',
});

let data_fail = {
    input:{
        params: params_fail,
        options: {
            hostname: Config.HOST,
            port: Config.PORT,
            path: '/kht3Server/web_login.do',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(params_fail)
            }
        }
    },

    output: {

    }

};

///////////////// CASE START //////////////
// For Every Case, define 2 items;
// 1.  _Data_ sent to Server
// 2.  _CheckFunction _ to check result

//////// CASE 1
function loginCaseSuccess_check(d){
    assertUtil.Assert(''+d.output.resp.success, 'true',d);
}

//////// CASE 2
function loginCaseFailed_check(d){
    assertUtil.Assert(''+d.output.resp.success, 'false',d);
}


Common.MAKE_CASE(data, loginCaseSuccess_check);
Common.MAKE_CASE(data_fail, loginCaseFailed_check);



