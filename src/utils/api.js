import * as util from './util.js'
import LRUCache from './lru.js'
var HOST = 'https://wxapp.wepiao.com'
var NOOP = function(error) {
  console.error(error);
}

var cache = new LRUCache()

// data = { cityId, }
function fetchMovies(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/movie/list',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP
  })
}

function fetchComingMovies(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/movie/movie_will',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP
  })
}

function fetchMovieDetail(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/movie/info',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application.json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP,
  })
}

/*
 *  data = {
 *      movieId,
 *      cityId, // required
 *      page, // default 1
 *      num, // default 10
 *      date,
 *  }
 */
function fetchCinemas(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/cinema/search_list',
    data: data,
    method: 'GET',
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP
  })
}

function fetchCinemaDetail(data, success, fail) {
  wx.request({
    url: HOST + '/data/v5/cinemas/cities/' + data.cityid + '/sched_city_cinema_' + data.cityid + '_' + data.cinemaid + '.json',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP
  })
}

/*
 *  data = {
 *    cinameId,
 *    roomId,
 *    movieId,
 *  }
 */
function fetchSeats(data, success, fail) {
  let { cinemaId, roomId } = data
  wx.request({
    url: HOST + '/data/v5/cinemas/' + cinemaId % 1000 + '/detail_seat_cinema_room_' + cinemaId + '_' + roomId + '.json',
    method: 'GET',
    data: data,
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: function(res) {
      if(!res.data.ret) {
        success(res.data.data.info);
      } else {
        fail && fail(res.data.msg);
      }
    },
    fail: fail
  })
}

function fetchCityList(success, fail) {
  wx.request({
    url: HOST + '/cgi/city/list',
    method: 'GET',
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: success || NOOP,
    fail: fail || NOOP
  })
}


function fetchAvailableSeats(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/ticket/qry_available_seats',
    data: data,
    method: 'GET',
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: function(res) {
      if (!res.data.ret) {
        success(res.data)
      } else {
        fail && fail(res.data.msg)
        console.error(res)
      }
    },
    fail: fail || NOOP
  })
}

function lockSeat(data, success, fail) {
  wx.request({
    url: HOST + '/cgi/wx/lock_seat_wx?bisServerId=' + data.bisServerId + '&_=' + Date.now(),
    data: data,
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Request-Id': util.guid(),
    },
    success: function(res) {
      if (!res.data.ret) {
        success(res.data.seatinfo)
      } else {
        fail && fail(res.data.msg)
      }
    },
    fail: fail || NOOP
  })
}

function fetchCity(success, fail) {
  wx.request({
    url: HOST + '/cgi/locate/ip',
    method: 'GET',
    header: {
      'Accept': 'application/json',
      'X-Request-Id': util.guid(),
    },
    success: function(res) {
      success(res.data)
    },
    fail: fail
  })
}

const PAGE_SIZE = 10;

export {
  fetchMovies,
  fetchComingMovies,
  fetchMovieDetail,
  fetchCinemas,
  fetchCinemaDetail,
  fetchSeats,
  fetchAvailableSeats,
  fetchCity,
  fetchCityList,
  lockSeat,
  PAGE_SIZE
}
