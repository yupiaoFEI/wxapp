export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


export function square ( x ) {
	return x * x;
}

// This function gets included
export function cube ( x ) {
	// rewrite this as `square( x ) * x`
	// and see what happens!
	return x * x * x;
}
