import Pool from './base/pool'

let instance
let index = 'hero', indeximg = 18
  , bulletimg = 19, bulletimg2 = 20,care = 8,ball = 1,fire = 4
let img

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

  }

/**
 * 游戏开始更新主函数
 */
  reset() {
    this.score      = 0     //分数
    this.bullets    = []    
    this.skills     = []    //技能
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
    this.lock = false         // 用来识别追踪导弹的目标
    this.ballistic = ball      //弹道
    this.fire = fire          //火力
    this.career = care       //速度
    this.index = index       //玩家型号
    this.indeximg = indeximg
    this.bulletimg = bulletimg
    this.bulletimg2 = bulletimg2
    this.aim = false         // 追踪弹自动瞄准
    this.boos = true         // 控制敌机生成
  //  this.imgurl = img
  }

/**
 * 用于保存玩家上次的选择
 * 游戏首次启动时调用一次
 */
  wjindex() {
      this.frame = 0 //运行帧
      this.perlayx = 0          //  用来记录玩家位置
      this.lockx = 0            // 记录追踪的敌机 x坐标
      this.locky = 0            // 记录追踪的敌机 y坐标
      this.locks = this.getplaykg('locks')                // 子弹数量

      this.scores=this.getplaykg('scores')               //  用于记录玩家总积分
      this.maxscore = this.getplaykg('maxscore')          //  用于记录玩家啊的最高分
      this.index_life = this.getplaykg('index_life')       // 用于记录 玩家复活币数量
      this.maxscore || (this.maxscore = 0, this.locks = 500,this.scores=0)   //  用于记录玩家啊的最高分 
      this.getplaykg('hero_dec') || this.setplaykg('hero_dec', true)
      
      this.getStor()            // 读取用户缓存中的数据  覆盖初初始数据
      this.reset()
  //    this.getCloudS()
  }

  /**
   * 写入缓存
   */
  setplaykg(key, data) {
    wx.setStorageSync(key, data)
  }

  /**
   * 读出缓存信息
   */
  getplaykg(key){
    return wx.getStorageSync(key)
  }


/**
 * 玩家战机选择更新函数
 */
  zjindex(xh, img, zd,zd2, sd, dd,fe) {
    index = xh 
    indeximg = img
    bulletimg = zd 
    bulletimg2 = zd2 
    care = sd
    ball = dd
    fire = fe 
    this.setStor(xh, img, zd,zd2, sd, dd,fe)
  }


  /**
   * 将用户战机选择写入到缓存
   */
  setStor(xh, img, zd,zd2, sd, dd,fe)
  {
    let x
    for(let i=0;i<7 ;i++)
    {
      i == 0 && (x = xh)
      i == 1 && (x = img)
      i == 2 && (x = zd)
      i == 3 && (x = zd2)
      i == 4 && (x = sd)
      i == 5 && (x = dd)
      i == 6 && (x = fe)
      wx.setStorage({
        key: ('play'+i),
        data: x
      })
    }
  }

  /***
   *  从缓存中读取本地数据
   */
  getStor() {
    for (let i = 0; i < 7 ; i++) {
       wx.getStorage({
        key: 'play'+i,
        success: function (res) { 
          i == 0 && (index = res.data)
          i == 1 && (indeximg = res.data)
          i == 2 && (bulletimg = res.data)
          i == 3 && (bulletimg2 = res.data)
          i == 4 && (care = res.data)
          i == 5 && (ball = res.data)
          i == 6 && (fire = res.data)
          },
      })
    }
  }


  
  


  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy,i) {

    let temp = this.enemys.splice(i,1)
    

    temp.visible = false

    this.pool.recover('enemy', enemy , enemy.em) 
  
  }
  
  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet,i) {
    let temp = this.bullets.splice(i, 1)
    temp.visible = false
    this.pool.recover('bullet', bullet,bullet.bt)
  }

  /**
   * 读取用户好友信息
   */
  getCloudS(){

    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //用户已经授权 直接调用用户信息
          wx.getUserInfo({
            openIdList: [],
            lang: 'zh_CN',
            success: (res) => {
            img = res.userInfo.avatarUrl

            },
            fail: (res) => {
              console.log(res)
              reject(res)
            }
          })

        } else if (res.authSetting['scope.userInfo'] === false) {
          // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
          wx.login({
            success: function () {
              wx.getUserInfo()
            }
          })
        } else {
          // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
          wx.authorize({
            scope: 'scope.userInfo'
          })
        }
      }
    })

  }


}