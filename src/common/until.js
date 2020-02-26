export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp);

    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target.getTime();
}
// 判断一个日期是不是今天 return (new Date().toDateString() === new Date(str).toDateString());

//  function isToday(date){

//    var today = new Date();

//    today.setHours(0);

//    today.setMinutes(0);

//    today.setSeconds(0);

//    today.setMilliseconds(0);

//    var offset=date.getTime()-today.getTime()

//    return offset>=0&&offset<=1000*60*60*24

// }
