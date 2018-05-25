const querystring=require('querystring'); 
let requestUtil = require('../../util/requestUtil'); 
let Promise=require('bluebird')
let assertUtil=require('../../util/assert');
let Common=require('../../util/common');
let Config=require('./config');


let test_item_in={
    type:1,
    genre:1,
    endDate:'2018/02/08',
    days:1,
    nowId:90,
    nowName:'Alan',
    content:'I need a leave for vacation...',
    beginType:1,
    endType:2,
    beginDate:'2018/02/08'
};

let test_item_out={
    type:1,
    genre:1,
    endDate:'2018-02-08 00:00:00',
    days:1,
    nowId:90,
    nowName:'Alan',
    content:'I need a leave for vacation...',
    beginType:1,
    endType:2,
    beginDate:'2018-02-08 00:00:00'
};

let saveItemId=''

let params_save = querystring.stringify(test_item_in);

let data_save = {
    input: {
        params: params_save,
        options: {
            hostname: Config.HOST,
            port: Config.PORT,
            path: '/kht3Server/work/leave/save.do',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(params_save)
            }
        }
    },
    output:{

    }

};

let params_list = querystring.stringify({          //方法;将一个对象序列转化成字符串
    me:0,
    year:2018,
    month:5
});

let data_list = {
    input:{
        params: params_list,
        options: {
            hostname: Config.HOST,
            port: Config.PORT,
            path: '/kht3Server/work/leave/list.do',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length': Buffer.byteLength(params_list)
            }
        }
    },

    output: {

    }

};


let params_delete = querystring.stringify({ 
    ids:'25',
});

let data_delete = {
    input: {
        params: '',
        options: {
            hostname: Config.HOST,
            port: Config.PORT,
            path: '/kht3Server/work/leave/delete.do',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
    },
    output:{

    }
};
///////////////// CASE START //////////////

//////// CASE 1 save a leave item
function saveLeave_check(d){
    assertUtil.Assert(''+d.output.resp.success, 'true',d);
}

//////// CASE 2 list leave items
function listLeave_check(d){
	// Find in list to check the leave Item is insert correctly.
    assertUtil.AssertArray(d.output.resp.data.content, test_item_out, d)
	
	// Recorded the leave Item Id for next case to delete.
    saveItemId = test_item_out.outData.leaveId;
	
	
    data_delete.input.params = querystring.stringify({'ids':saveItemId});
}

//////// CASE 2 delete leave item
function deleteLeave_check(d){
    assertUtil.Assert('' + d.output.resp.success, 'true', d);
}

Common.MAKE_CASE(data_save, saveLeave_check);
Common.MAKE_CASE(data_list, listLeave_check);
Common.MAKE_CASE(data_delete, deleteLeave_check);


