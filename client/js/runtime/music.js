let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this
    
    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm3.ogg'

    this.bgmAudio2 = new Audio()
    this.bgmAudio2.loop = true
    this.bgmAudio2.src = 'audio/bgm2.ogg'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.ogg'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.ogg'

    this.getplaykg('bgm','shoot','plosion')

  }



  
  /**
   * 从缓存中读取设置信息
   */
  getplaykg(b,s,p)
  {
    this.bgm = wx.getStorageSync(b)
    this.shoot = wx.getStorageSync(s)
    this.plosion = wx.getStorageSync(p)
    this.bgm == '' && (this.bgm ='on')
    this.shoot == '' && (this.shoot = 'on')
    this.plosion == '' && (this.plosion = 'on')
    this.playBgm()
  }

  setplaykg(b,t)
  {
    wx.setStorageSync(b,t)
  }

  /**
   * 记录选择
   */


  playBgm() {
    if(this.bgm == 'on') this.bgmAudio2.play()
    else  this.bgmAudio2.pause()
  }

  playBgm1() {
    if (this.bgm == 'on') {
      this.bgmAudio2.play(); this.bgmAudio.pause()
    }
  }

  playBgm2(){
    if (this.bgm == 'on')
    {
      this.bgmAudio.play(); this.bgmAudio2.pause() 
    }
  }


  playShoot() {
    if(this.shoot == 'on')
    {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
    }
  }

  playExplosion() {
    if (this.plosion == 'on')
    {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
    }
  }

  playShock(){
    wx.vibrateLong({
    })
  }
}
