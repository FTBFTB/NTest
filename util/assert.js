
function LOG(success,obj){
    success ? console.log(obj.nIndex + ':' + getExecFunction() + ' OK') : console.log(obj.nIndex + ':' + getExecFunction() + ' FAIL');
    if (success == false)
        console.log(obj);
}

var getExecFunction =function () {
    let names = new Error().stack.match(/at (.*?) /g);
    //var names = new Error().stack;
    var name = names[3].replace('at ', '').trim();
    return name;
}

var Assert=function (result,target,obj) {
    LOG(result === target,obj);
    //result === target ? console.log(obj.nIndex + ':' + getExecFunction() + ' OK') : console.log(obj.nIndex + ':' + getExecFunction() + ' FAIL');
}

// If all _property_ of target exists in resuls and are equal，return true
function EqualItem(result,target) {
    let isEqual=true;
    let hasKey=false;
    for (let k in target){
        for (let k2 in result){
            if (k===k2){
                hasKey = true;
                if (result[k2] !== target[k]){
                    isEqual = false;
                }
                break;
            }
        }
    }

    if (hasKey && isEqual) {
        target.outData =  result;
        return true;
    }

    return false;
}

var AssertJSON = function(result,target,obj){
    LOG(EqualItem(result,target),obj);
    //EqualItem(result,target) ? console.log(obj.nIndex + ':' + getExecFunction() + ' OK') : console.log(obj.nIndex + ':' + getExecFunction() + ' FAIL');
}

var Assert2=function (result1,target1,result2, target2,obj) {
    LOG(result1 === target1 && result2 === target2,obj);
    //(result1 === target1 && result1 === target1) ? console.log(obj.nIndex + ':' + getExecFunction() + ' OK') : console.log(obj.nIndex + ':' + getExecFunction() + ' FAIL');
}

// For Array
var AssertArray=function (resultArray,item,obj) {
    let i=0;
    let found = false;
    for(i=0;i<resultArray.length;i++) {
        if (EqualItem(resultArray[i], item)){
            found = true;
            break;
        }
        // let isEqual=true;
        // let hasKey=false;
        // for (let k in item){
        //     for (let k2 in resultArray[i]){
        //         if (k===k2){
        //             hasKey = true;
        //             if (resultArray[i][k2] !== item[k]){
        //                 isEqual = false;
        //             }
        //             break;
        //         }
        //     }
        // }
        //
        // if (hasKey && isEqual) {
        //     item.outData =  resultArray[i];
        //     found = true;
        //     break;
        // }
        //
        // if (found) break;
    }

    LOG(found,obj);
    //found ? console.log(obj.nIndex + ':' + getExecFunction() + ' OK') : console.log(obj.nIndex + ':' + getExecFunction() + ' FAIL');
}

exports.Assert = Assert
exports.Assert2 = Assert2
exports.AssertJSON = AssertJSON
exports.AssertArray = AssertArray
