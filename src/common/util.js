// Date ----------------------------------------------------------------------------------------------------------------

const DATE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3)
    // 'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      let value = (RegExp.$1 === 'MMM') ? DATE_MONTHS[this.getMonth()] : ((RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      fmt = fmt.replace(RegExp.$1, value)
    }
  }
  return fmt
}

Date.from = function (fmt, str) {
  let o = {
    year: 'y+',
    month: 'M+',
    day: 'd+',
    hour: 'h+',
    minutes: 'm+',
    seconds: 's+'
  }
  for (let k in o) {
    let reg = new RegExp('(' + o[k] + ')')
    if (reg.test(fmt)) {
      let begin = fmt.search(reg)
      let len = RegExp.$1.length
      o[k] = parseInt(str.substr(begin, len))
    } else {
      o[k] = 0
    }
  }
  return new Date(o.year, o.month - 1, o.day, o.hour, o.minutes, o.seconds)
}

// String --------------------------------------------------------------------------------------------------------------

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0
    return this.indexOf(searchString, position) === position
  }
}

String.prototype.trimChar = function (c) {
  return this.trimStartChar(c).trimEndChar(c)
}

String.prototype.trimStartChar = function (c) {
  let n = 0
  for (let i = 0; i < this.length - 1; ++i) {
    if (this.charAt(i) === c) {
      n++
    } else {
      break
    }
  }
  return this.substr(n)
}

String.prototype.trimEndChar = function (c) {
  let n = 0
  for (let i = this.length - 1; i >= 0; --i) {
    if (this.charAt(i) === c) {
      n++
    } else {
      break
    }
  }
  return this.substr(0, this.length - n)
}

String.prototype.nr_float_value = function () {
  let f = parseFloat(this)
  if (f > 1) {
    f = Math.floor(f)
  } else {
    f = parseFloat(f.toFixed(1))
    if (f < 0.1) {
      f = 0
    }
  }
  return f
}

String.prototype.nr_value = function () {
  let f = this.nr_float_value()
  let a = f.toString().split('.')
  let n = a[0].length % 3
  let s = a[0].substr(0, n)
  s += ','
  for (let i = n; i < a[0].length; i += 3) {
    s += a[0].substr(i, 3) + ','
  }
  s = s.trimChar(',')
  if (a.length > 1) {
    s += '.' + a[1].trimEndChar('0')
  }
  return s
}
