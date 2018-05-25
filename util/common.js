let Promise=require('bluebird')
let requestUtil = require('./requestUtil');

function INIT_CASE_PRIVATE_DATA(data, d, callback) {
    data.nIndex = d;
    data.cb = callback;
}

let g_Cases=[];
function REGISTER(func){
    g_Cases.push(func);
}

function RUN() {
    let i=0;
    let data = [];
    g_Cases.forEach(function(item){
        i++;
        data.push(i);
    });

    Promise.each(data, (item, index) => g_Cases[index](item)).then(function (res) {
        console.log('All Cases Over');
    });
}

function MAKE_CASE(data, checkFunc){
    let TC_end = function (d) {
        checkFunc(d);
        d.cb(0,d.nIndex+1);
    }

    let TC = Promise.promisify( function(d,callback){
        INIT_CASE_PRIVATE_DATA(data,d,callback);
        requestUtil.sendRequest(data)
            .then(TC_end)
            .catch(function(err){
                console.log('err2' + err);
            });
    });

    REGISTER(TC);
}


//exports.DONE = DONE;
//exports.INIT_CASE_PARAM = INIT_CASE_PARAM;
//exports.REGISTER = REGISTER;
exports.RUN = RUN;
exports.MAKE_CASE = MAKE_CASE;
//exports.INIT_CASE_PRIVATE_DATA = INIT_CASE_PRIVATE_DATA;
