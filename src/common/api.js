import $ from 'jquery'

const Const = {
  ApiHost: 'https://nr.nebulas.io/nd/'
  // ApiHost: 'http://172.16.15.195:8000/nd/'
}

const Platform = {
  Neb: 'nebulas',
  Eth: 'eth'
}

// ApiResult -----------------------------------------------------------------------------------------------------------

function ApiResult (code, data, msg) {
  this.code = code
  this.data = data
  this.msg = msg
}

ApiResult.fromResp = function (data, status, msg) {
  if (status) {
    return new ApiResult(data.code, data.data, data.msg)
  } else {
    return new ApiResult(-1, null, msg)
  }
}

ApiResult.prototype.success = function () {
  return this.code === 0
}

// Api -----------------------------------------------------------------------------------------------------------------

function Api () {
}

function createApiCallback (callback) {
  return function (data, status, msg) {
    callback(ApiResult.fromResp(data, status, msg))
  }
}

function createApiUrl () {
  let r = Const.ApiHost
  for (let i in arguments) {
    r += arguments[i] + '/'
  }
  return r
}

function apiDoReq (url, data, callback) {
  $.ajax({
    url: url,
    success: function (data, status) {
      callback(data, true, '')
    },
    error: function (xhr, msg, ex) {
      callback(null, false, msg)
    }
  })
}

Api.getAddressInfo = function (address, callback) {
  // address = address.toLowerCase()
  // let platform = address.startsWith('0x') ? Platform.Eth : Platform.Neb
  let platform = Platform.Neb
  let url = createApiUrl('address_info', platform, address)
  apiDoReq(url, null, createApiCallback(callback))
}

Api.getNrAndMarketValues = function (platform, begin, end, callback) {
  let url = createApiUrl('nr_and_market_value', platform, begin, end)
  apiDoReq(url, null, createApiCallback(callback))
}

Api.getDailyHighScore = function (platform, date, num, callback) {
  let url = createApiUrl('daily_high_score', platform, date, num)
  apiDoReq(url, null, createApiCallback(callback))
}

Api.getRandomAddresses = function (platform, callback) {
  let url = createApiUrl('random_addresses', platform)
  apiDoReq(url, null, createApiCallback(callback))
}

// export --------------------------------------------------------------------------------------------------------------

export {
  Platform, ApiResult, Api
}
