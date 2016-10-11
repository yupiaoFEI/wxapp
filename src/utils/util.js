const pattern = /(\d{4})(\d{2})(\d{2})/;
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//如果需要返回年份，需要再getDateString的第二个参数传true
//年份的返回格式是:2016.09.30 不带年份的返回格式是09月30日
function getDateString(data, year) {
  var nowData = getNowData()
  var dateString = data;
  let datachange = year ? '$1.$2.$3' : '$1-$2-$3'
  var formatedDate = dateString.replace(pattern, datachange);
  return year ? formatedDate :  DateDiff(formatedDate, nowData, dateString)
}
//对比data与当前日期相差的天数
function  DateDiff(sDate1,  sDate2, dateString){    //sDate1和sDate2是2006-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    var datadetial = dateString.replace(pattern, '$2月$3日');
    var week
    switch (iDays){
       case 0: week="今天"+datadetial; break;
       case 1: week="明天"+datadetial; break;
       case 2: week="后天"+datadetial; break;
       default: week=datadetial;
    }
    return  week
}
//获取格式当前日期，并且格式为2016-01-22
function getNowData(){
  var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const pagesize = 10;

export {
  guid,
  formatTime,
  getDateString,
  pagesize
}
