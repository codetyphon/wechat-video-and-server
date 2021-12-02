// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    ad: false,
    full: false,
    opacity: 1
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  show_ad_video() {
    this.setData({
      ad: true
    })
  },
  timeupdate(x) {
    const {
      detail: {
        currentTime,
        duration
      },
      target: {
        dataset: {
          id
        }
      }
    } = x
    const p = ((currentTime / duration) * 100).toFixed(2) + "%"
    this.setData({
      p: p
    })
    if (this.data.ad && p === "100.00%") {
      this.setData({
        full: true
      })
      const _self = this
      const t = setInterval(() => {
        _self.setData({
          opacity: _self.data.opacity - 0.02
        })
        if (_self.data.opacity <= 0) {
          clearInterval(t)
          _self.setData({
            ad: false,
            opacity: 1
          })
        }
      }, 100);

    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})