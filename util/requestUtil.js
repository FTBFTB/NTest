var http=require('http');
const querystring=require('querystring');
var Promise=require('bluebird')

let COOKIE = '';
var sr= function(d, callback){
    var session="";
    if (d.input.options.method.toUpperCase() == 'GET')
        d.input.options.path += "?" + d.input.params

    // for login-state-needed cases
    d.input.options.headers['Cookie'] = COOKIE;
    var req=http.request(d.input.options,function (res) {
        var resp="";
        session = res.headers['set-cookie'];
        res.setEncoding('utf8');
        res.on('data',function(chunk){
            resp += chunk.trim();
        });
        res.on('end',function(){
            var obj = eval('('+resp+')');
            d.output.session = session;
            if (session != undefined)
                COOKIE = session.toString();
            d.output.resp = obj;
            callback(0, d);
        });
    });

    if (d.input.options.method == 'POST'){ req.write(d.input.params); }
    req.end();
};

var sendRequest = Promise.promisify(sr);

exports.sr = sr;
exports.sendRequest = sendRequest;
exports.COOKIE = COOKIE;
