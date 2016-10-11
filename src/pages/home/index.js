//index.js
const app = getApp()
import * as Api from '../../utils/api';

Page({
  data: {
    items: [],
    itemsComing: [],
    cityId: '10',
    loading: true,
    hasMore: true,
    hasComingMore: true,
    cityCurrent: '',
    page: 0,
    pageComing: 0,
    status: true,
    Tabs_now_begin: 'Tabs_now_begin',
    itemsEmpty: false
  },
  buyMovie(event) {
    let movie_id = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../cinemas/index?movie_id=' + movie_id
    })
  },
  onLoad: function(e) {
    var that = this
    Api.fetchCity(function(res) {
      let city_id = 'cityId' in e ? e.cityId : res.data.id
      let city_name = 'cityName' in e ? e.cityName : res.data.name
      app.globalData.city = { name: city_name, id: city_id }
      that.setData({
        cityCurrent: city_name,
        cityId: city_id
      })
      wx.setStorageSync('city', { city_id: city_id || 10, city_name: city_name })
      // fetch movies list by city
      that.loadMore(function(res) {
        if (res.data.total_page === 0) {
          that.setData({
            itemsEmpty: true,
            loading: false
          })
        } else {
          that.setData({
            items: [...that.data.items, ...res.data.list],
            loading: false,
          })
        }
      })
    })

    wx.getSystemInfo({
      success: function(res) {
        app.globalData.systemInfo = res
      },
      fail: function() {}
    })
  },
  loadMore: function(callback) {
    let that = this;
    let page = that.data.items.length / Api.PAGE_SIZE + 1
    Api.fetchMovies({ cityId: that.data.cityId, page: page }, callback)
    that.setData({
      page: page,
      loadingBottom: false
    })
  },
  now: function() {
    if (this.data.status) return
    const that = this
    that.loadMore(function(res) {
      that.setData({
        items: [...that.data.items, ...res.data.list],
        status: 'true',
        loading: false,
        pageComing: 1,
        itemsComing: [],
        hasMore: true
      })
    })
  },
  coming: function(e) {
    if (!this.data.status) return
    this.setData({
      Tabs_now_begin: ''
    })
    const that = this
    that.loadMoreComing(function(res) {
      let filterMovieList = !that.data.itemsComing.length ? res.data.data.list.filter(item => item.date_status === 0).splice(0, 10) : []
      that.setData({
        itemsComing: [...that.data.itemsComing, ...filterMovieList],
        status: false,
        page: 0,
        items: [],
        hasMore: true
      })

    })
  },
  loadMoreComing: function(callback) {
    let that = this;
    let pageComing = that.data.itemsComing.length / Api.PAGE_SIZE + 1
    that.setData({
      pageComing: pageComing,
      hasComingMore: pageComing == 1 ? true : false,
      loadingBottom: false
    })

    Api.fetchComingMovies({ cityId: that.data.cityId, stata: '5' }, callback)
  },
  refresh: function(e) {
    let that = this
    if (e.currentTarget.dataset.status == 'true') {
      this.loadMore(function(res) {
        if (that.data.loadingBottom) return
        if (that.data.items.length % 10 > 0) {
          that.setData({
            hasMore: false
          })
        } else {
          that.setData({
            items: [...that.data.items, ...res.data.list],
            hasMore: true,
            loadingBottom: true
          })
        }
      })
    } else {
      this.loadMoreComing(function(res) {
        if (that.data.loadingBottom) return
        if (that.data.itemsComing.length % 10 > 0) {
          that.setData({
            hasMore: false
          })
        } else {
          let filterMovieList = res.data.data.list.filter(item => item.date_status === 0).splice(that.data.itemsComing.length, 10)
          that.setData({
            itemsComing: [...that.data.itemsComing, ...filterMovieList],
            loadingBottom: true
          })
        }
      })
    }
  },
  routeCitylist: function() {
    wx.navigateTo({
      url: '../citylist/index'
    })
  }
})
