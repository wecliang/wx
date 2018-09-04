import DataBus from '../databus'
import Player from '../player/index'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let img = new Image()
img.src = 'images/allbt.png'
let gonst = new Image()
gonst.src = 'images/gonst.png'
let bt = new Image()
bt.src = 'images/bt_ioc.png'

let databus = new DataBus

let addition = []
let index = []


export default class Parentage{
  constructor(ctx) {
  
  this.getplaykg('zyl','zdyx','zjyx')
  this.decx = 0

  this.mos = this.getplay('mos')
  this.mos || (this.mos = '简单')

  this.getplay('fill_dec') ? this.gnfill = false : this.gnfill = true

  }


/**
 * 从缓存中读取信息
 */
  getplaykg(y, d, j) {
    this.zyl = wx.getStorageSync(y)
    this.zdyx = wx.getStorageSync(d)
    this.zjyx = wx.getStorageSync(j)
    this.zyl || (this.zyl = '开')
    this.zdyx || (this.zdyx = '开')
    this.zjyx || (this.zjyx = '开')
  }

/**
 * 读取玩家战机信息
 */
  getindex(){
    let i = 0
    this.getplay('hero_dec') && (index[i++] = 150)
    this.getplay('fill_dec') && (index[i++] = 0)
    this.getplay('fort_dec') && (index[i++] = 50)
    this.getplay('laser_dec') && (index[i++] = 100)
  }
/**
 * 写入缓存
 */
  setplaykg(key, data) {
    wx.setStorageSync(key, data)
  }

  /**
   * 读取缓存
   */
  getplay(key){
    return wx.getStorageSync(key)
  }

/**
 * 绘制游戏主页页面
 */
  render(ctx) {




    let x=screenWidth/2-90
    let y=screenHeight/2+180


    ctx.font = '80px Arial'
    ctx.fillStyle = '#fcfbfb'
    ctx.fillText('装甲战机', x-70 , 180)
    ctx.fillStyle = '#000000'
    ctx.fillText('装甲战机', x - 67, 183)


    ctx.fillStyle = '#fcfbfb'

    ctx.font = '26px Arial'


    databus.imgurl && ctx.fillText(databus.imgurl, x, y-200)
   // console.log(databus.imgurl)
    wx.createImage({
      src : databus.imgurl,
      width : 132,
      height : 132
    })
  

    ctx.fillText('最高战绩：' + databus.maxscore, x, y-100)

    ctx.font='28px Arial'

    ctx.drawImage(
      img,
      0, 60, 145, 48,
      x+50,
      y +35,
      180,
      60
    )
    ctx.fillText('开始游戏', x + 82, y + 72)

    this.ksbtnArea = {
      startX: x+50,
      startY: y+35,
      endX: x+230,
      endY: y+95
    }

    ctx.drawImage(
      img,
      162,60,38,22,
      x-60,
      y+39,
      100,
      55
    )
    this.msbtnArea = {
      startX: x -55,
      startY: y + 39,
      endX: x + 40,
      endY: y + 95
    }


    ctx.font = '25px Arial'
    ctx.fillStyle = '#def0d8'
    ctx.fillText(this.mos,x-35,y+72)


/**设置图片 */
    ctx.drawImage(
      img,
      0, 0, 60, 50,
      x - 20,
      y - 60,
      70,
      60
    )

    this.szbtnArea = {
      startX: x-20,
      startY: y-60,
      endX: x +50,
      endY: y + 10
    }

//玩家图标
    ctx.drawImage(
      img,
      72, 0, 60, 58,
      x +60,
      y - 60,
      70,
      60
    )

    this.wjbtnArea = {
      startX: x + 60,
      startY: y - 60,
      endX: x + 130,
      endY: y + 10
    }

//功能选择
  ctx.drawImage(
    img,
    140,0,60,60,
    x+ 135,
    y - 60,
    70,
    70
  )

    this.gnbtnArea = {
      startX: x + 135,
      startY: y - 60,
      endX: x + 205,
      endY: y + 10
    }

  }



  /**
   * 设置页面显示页面
   */
  szrender(ctx) {
    
    let x = screenWidth / 2 - 120
    let y = screenHeight / 2 -100
    
    ctx.font = '26px Arial'
    ctx.fillStyle = '#bfdce9'
    ctx.fillText('主音量', x,y)
    ctx.fillText( this.zyl, x+180, y)
    this.zybtnArea = {
      startX: x + 175,
      startY: y -20,
      endX: x + 210,
      endY: y + 15
    }

    ctx.fillText('子弹音效',x,y+50)
    ctx.fillText(this.zdyx, x + 180, y+50)
    this.zdbtnArea = {
      startX: x + 175,
      startY: y +30,
      endX: x + 210,
      endY: y + 65
    }

    ctx.fillText('撞击音效', x, y + 100)
    ctx.fillText(this.zjyx, x + 180, y + 100)
    this.zjbtnArea = {
      startX: x + 175,
      startY: y +80,
      endX: x + 210,
      endY: y + 115
    }

    ctx.font = '30px Arial'
    ctx.fillText('返回首页', x+30, y + 180)

    this.sybtnArea = {
      startX: x + 20,
      startY: y + 165,
      endX: x + 160,
      endY: y + 210
    }




  }

  /**
 * 设置页触摸判断
 */
  sztouchEvent(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let syarea = this.parentage.sybtnArea
    let zyarea = this.parentage.zybtnArea
    let zdarea = this.parentage.zdbtnArea
    let zjarea = this.parentage.zjbtnArea


    if (x >= zyarea.startX
      && x <= zyarea.endX
      && y >= zyarea.startY
      && y <= zyarea.endY) {
      this.parentage.zyl = this.parentage.zyl == '开' ? '关' : '开'
      this.parentage.setplaykg('zyl', this.parentage.zyl)
      this.music.bgm = this.parentage.zyl == '开' ? 'on' : 'off'
      this.music.setplaykg('bgm', this.music.bgm)
      this.music.playBgm()
    }

    if (x >= zdarea.startX
      && x <= zdarea.endX
      && y >= zdarea.startY
      && y <= zdarea.endY) {
      this.parentage.zdyx = this.parentage.zdyx == '开' ? '关' : '开'
      this.parentage.setplaykg('zdyx', this.parentage.zdyx)
      this.music.shoot = this.parentage.zdyx == '开' ? 'on' : 'off'
      this.music.setplaykg('shoot', this.music.shoot)
    }

    if (x >= zjarea.startX
      && x <= zjarea.endX
      && y >= zjarea.startY
      && y <= zjarea.endY) {
      this.parentage.zjyx = this.parentage.zjyx == '开' ? '关' : '开'
      this.parentage.setplaykg('zjyx', this.parentage.zjyx)
      this.music.plosion = this.parentage.zjyx == '开' ? 'on' : 'off'
      this.music.setplaykg('plosion', this.music.plosion)
    }

    if (x >= syarea.startX
      && x <= syarea.endX
      && y >= syarea.startY
      && y <= syarea.endY) {
      this.parentage.menu = 'sy'
      this.parentage.hasEventBind = false
      canvas.removeEventListener(
        'touchstart',
        this.touchHandler
      )
    }



  }
  
  /**
   * 玩家战机选择页面
   */

  wjrender(ctx) {


    let x = screenWidth / 2 - 120
    let y = screenHeight / 2+50
    
    let dx = 0
   switch(databus.indeximg)
    {
      case 18: dx = 150; break;
      case 22: dx = 0; break;
      case 25: dx = 50; break;
      case 28: dx = 100; break;
    }
    //初始渲染类
    ctx.drawImage(img, dx , 260, 50, 50, x+90, y-110, 70, 60)

    ctx.font = '28px Arial'
    ctx.fillStyle = '#def0d8'
    ctx.fillText('返回首页', x + 60, y + 200)
    this.wjsybtnArea = {
      startX: x + 50,
      startY: y + 180,
      endX: x + 200,
      endY: y + 205
    }


    for(let i=0; i<index.length;i++)
    {
      i == 3 && ( y+= 80 , x-= 240)
      ctx.drawImage(img, index[i], 260, 50, 50, x, y, 60, 50)
      index[i] == dx && ctx.drawImage(img, 330, 0, 50, 50, x, y, 60, 50)
      x+=80
    }


  
  }

  /**
 * 玩家战机选择页面
 */
  wjtouchEvent(e) {

    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    let x2 = screenWidth / 2 - 120
    let y2 = screenHeight / 2 + 50



    let wjsyarea = this.parentage.wjsybtnArea


    for (let i = 0; i < index.length; i++) {
      i == 3 && (y2 += 80, x2 -= 240)
      if(x>x2-5&&x<x2+55&&y>y2-5&&y<y2+55)
      {
        databus.bullets = []     //清空子弹类
        databus.pool.PoolDic()   //清空对象池
        switch(index[i])
        {
          // 型号 , 战机 , 子弹 ， 子弹2 ，射速 ， 弹道 ， 威力 
          case 150: databus.zjindex('hero', 18, 19, 20, 8, 1, 4); break;
          case 0: databus.zjindex('fill', 22, 23, 24, 0, 2, 4); break;
          case 50: databus.zjindex('fort', 25, 26, 27, 0, 2, 4); break;
          case 100: databus.zjindex('laser', 28, 29, 30, 8, 1, 1);break;
        }
        databus.reset()       //重新加载子弹数据
      }
      x2 += 80
    }


    if (x >= wjsyarea.startX
      && x <= wjsyarea.endX
      && y >= wjsyarea.startY
      && y <= wjsyarea.endY) {
      this.parentage.menu = 'sy'
      this.parentage.hasEventBind = false
      canvas.removeEventListener(
        'touchstart',
        this.parentage.touchHandler
      )
    }



  }




  /***
   * 功能页面添加
   */
  gnrender(ctx) {

    ctx.fillStyle = '#bfdce9'

    let x = screenWidth/2
    let y = screenHeight-60
    let y2 = 160


    ctx.font = '25px Arial'
    ctx.fillText('总积分: '+databus.scores, x-80, y2-65)
    
    ctx.drawImage(
      img,
      200, 95, 20, 55,
      x-80,y2-55,
      18,
      40
      )
    ctx.fillText(databus.locks, x-60, y2-25)

    ctx.drawImage(
      gonst,
      0,0,300,105,
      x-130,y2,
      260,
      80
    )
    this.zddhbtnArea = {
      startX: x - 130,
      startY: y2,
      endX: x + 130,
      endY: y2 + 80
    }

    ctx.font = '20px Arial'
    ctx.fillText('追踪弹：+500', x-28, y2+33)
    ctx.fillText('需积分：3000', x-28, y2+58)
    y2 += 80

  // 判断玩家是否拥有fill战机
  if(this.gnfill)
  {
      ctx.drawImage(
        gonst,
        0, 110, 300, 105,
        x-130, y2,
        260,
        80
      )
      ctx.drawImage(img, 0, 260, 50, 50, x-95, y2+20, 50, 40)
      ctx.fillText('解锁战机', x - 28, y2 + 33)
      ctx.fillText('需积分：20000', x - 28, y2 + 58)

      this.fillbtnArea = {
      startX: x-130,
      startY: y2,
      endX: x+130,
      endY: y2+80
    }
  }


    ctx.font = '28px Arial'
    ctx.fillText('返回首页' , x-60 , y)

    this.gnsybtnArea = {
      startX: x-60,
      startY: y-20,
      endX: x+60,
      endY: y+20
    }
    

  }


  /**
 * 功能页面点击判断函数
 */

  gntouchEvent(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let gnsyarea = this.parentage.gnsybtnArea
    let zddharea = this.parentage.zddhbtnArea

    if (x >= gnsyarea.startX && x <= gnsyarea.endX
      && y >= gnsyarea.startY
      && y <= gnsyarea.endY) {
      this.parentage.menu = 'sy'
      this.parentage.hasEventBind = false
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
    }

    if (x >= zddharea.startX && x <= zddharea.endX
      && y >= zddharea.startY
      && y <= zddharea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      databus.scores >= 3000 ? this.parentage.alert = '确定兑换？' : this.parentage.alert = '积分不足！'
      this.makepage = true
      this.hasmakepage = false
    }
    if (this.parentage.gnfill){
      let fillarea = this.parentage.fillbtnArea
      if (x >= fillarea.startX && x <= fillarea.endX
        && y >= fillarea.startY
        && y <= fillarea.endY) {
        canvas.removeEventListener('touchstart', this.parentage.touchHandler)
        databus.scores >= 20000 ? this.parentage.alert = '确定解锁？' : this.parentage.alert = '积分不足！'
        this.makepage = true
        this.hasmakepage = false
      }
    }

  }

/**
 * 确定弹窗页面
 */
  makePage(ctx, alert) {
    let x = screenWidth / 2
    let y = screenHeight / 2

    ctx.drawImage(
      img,
      0, 130, 90, 70,
      x - 120, y - 80,
      240,
      160
    )
    ctx.font = '26px Arial'
    ctx.fillStyle = '#472f01'
    ctx.fillText(alert, x - 60, y - 5)

    ctx.fillStyle = '#000000'
    ctx.fillText('取消', x - 80, y + 44)
    ctx.fillText('确定', x + 25, y + 44)

    this.qxdhbtnArea = {
      startX: x - 80,
      startY: y + 10,
      endX: x - 5,
      endY: y + 60
    }

    this.qddhbtnArea = {
      startX: x + 15,
      startY: y + 10,
      endX: x + 90,
      endY: y + 60
    }
  }

  /**
* 确定页面判断函数
*/
  qtouchEvent(e) {
    e.preventDefault()


    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let qddharea = this.parentage.qddhbtnArea
    let qxdharea = this.parentage.qxdhbtnArea

    if (x >= qddharea.startX && x <= qddharea.endX
      && y >= qddharea.startY
      && y <= qddharea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      if (this.parentage.alert == '确定兑换？')
      {
        databus.scores -= 3000; databus.locks += 500;
        databus.setplaykg('scores', databus.scores);
      } else if (this.parentage.alert == '确定解锁？')
      {
        databus.scores -= 20000; databus.setplaykg('fill_dec',true);
        this.parentage.gnfill = false;
      }
      this.parentage.hasEventBind = false
      this.makepage = false
      databus.setplaykg('locks', databus.locks);
    }

    if (x >= qxdharea.startX && x <= qxdharea.endX
      && y >= qxdharea.startY
      && y <= qxdharea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.parentage.hasEventBind = false
      this.makepage = false
    }




  }

  /**
 * 战机解锁弹窗页面
 */
  indexPage(ctx, alert) {
    let x = screenWidth / 2
    let y = screenHeight / 2
    let dec = 0

    ctx.drawImage(
      img,
      97, 130, 90, 70,
      x - 120, y - 80,
      240,
      160
    )
    ctx.font = '26px Arial'
    ctx.fillStyle = '#472f01'
    console.log(alert)
    switch(alert){
      case 'fort': dec = 50 ; break;
      case 'laser': dec = 100 ; break;
    }
    ctx.drawImage(img, dec, 260, 50, 50, x -110, y-40, 50, 48)
    ctx.fillText('获得新型战机', x - 60, y - 5)
    ctx.fillStyle = '#f00000'
    ctx.fillText('确定', x -40, y + 50)

    this.qdjsbtnArea = {
      startX: x -50,
      startY: y + 20,
      endX: x + 30,
      endY: y + 60
    }
  }

  /**
* 战机解锁弹窗确定页面
*/
  indexEvent(e) {
    e.preventDefault()


    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let qdjsarea = this.parentage.qdjsbtnArea

    if (x >= qdjsarea.startX && x <= qdjsarea.endX
      && y >= qdjsarea.startY
      && y <= qdjsarea.endY) {
      this.parentage.hasEventBind = false
      switch(databus.indexdec)
      {
        case 'fort': databus.setplaykg('fort_dec', true);break;
        case 'laser': databus.setplaykg('laser_dec', true); break;
      }
      databus.indexdec = false 
      canvas.removeEventListener('touchstart', this.touchHandler)
    }


  }

/**
 * 初始化  addition 数组
 */
  addIndex(){
    addition[0] = 0;
    addition[1] = 1000;
    addition[2] = 600;
    addition[3] = 1200;
    addition[4] = 800;
  }


/**
 * 开始游戏   道具选择页面
 */
  addition(ctx){

    let x = screenWidth / 2
    let y = screenHeight / 2


    ctx.drawImage(
      img,
      201, 0, 113, 83,
      x - 130, y - 120,
      260,
      240
    )
    
   ctx.font = '22px Arial'
   ctx.fillStyle = '#fbe704'
    ctx.fillText('选择本局使用道具！', x - 95, y - 85)


    for (let i = 1,j = 0; i < 5 ; i++ )
   {
     if(addition[i])
     {
     ctx.drawImage(
       img,
       (i-1)*60, 200, 60, 50,
       x - 100+j*50, y - 60,
       50,
       40
     )
     j++
     }

   }

    this.addbtnArea = {
      startX: x-100,
      startY: y-60,
      endX: x - 50,
      endY: y-20
    }


    ctx.drawImage(
      img,
      162, 60, 40, 22,
      x - 40, y + 60,
      80,
      50
    )

    ctx.fillStyle = '#ffffff'
    ctx.fillText('跳过', x - 20, y + 90)
    ctx.font = '20px Arial'
    ctx.fillText('剩余积分：' + databus.scores, x - 85, y -140)

    this.tgtnArea = {
      startX: x -40,
      startY: y +60,
      endX: x + 40,
      endY: y +110
    }

    if (addition[0])
    {
      let txt1 ,txt2,txt3
      switch (addition[0]) {
        case 1000: txt1 = '雷达：自动瞄准' ; txt2 = '需积分：1000'; txt3 = '注：需配合追踪弹使用'; break
        case 600: txt1 = '初始速度 +4'; txt2 = '需积分：600'; break
        case 1200: txt1 = '初始血量 +1'; txt2 = '需积分：1200'; break
        case 800: txt1 = '初始弹道 +1'; txt2 = '需积分：800'; break
      }

      ctx.font = '16px Arial'
      ctx.fillStyle = '#fdf6ba'
      ctx.fillText(txt1, x - 95, y+5 )
      ctx.fillText(txt2, x - 95, y + 30)
      txt3 && ctx.fillText(txt3, x - 95, y + 55)

    
      ctx.font = '18px Arial'
      ctx.fillStyle = '#5d360d'
      if(databus.scores > addition[0] )
      {
        ctx.drawImage(
          img,
          160, 87, 40, 28,
          x + 40, y - 5,
          60,
          40
        )

        ctx.fillText('使用', x + 55, y + 20)
      }
      else {
        ctx.fillStyle = '#000000'
      ctx.fillText('积分不足!' , x+35,y+20)
      }
      
    }

    this.qrsytnArea = {
      startX: x + 40,
      startY: y - 5,
      endX: x + 100,
      endY: y + 35
    }
 


  }

/**
 * 道具页  触摸判断
 */

  addEvent(e) {

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    


    let addarea = this.parentage.addbtnArea
    let tgarea = this.parentage.tgtnArea
    let syarea = this.parentage.qrsytnArea
    

  
    for (let i = 1, j = 0; i < 5; i++) {
    if (addition[i] && y >= addarea.startY
        && y <= addarea.endY) {
      if (x >= addarea.startX && x <= addarea.endX) {

        addition[0] = addition[i]
        break
      }  else x -= 50
    j++
    }
    }


  if (addition[0]&& x >= syarea.startX && x <= syarea.endX
      && y >= syarea.startY&& y <= syarea.endY)
    {
    if (databus.scores > addition[0]) {
      switch (addition[0]) {
        case 1000: addition[1] = 0; databus.aim = true;  break
        case 600: addition[2] = 0; databus.career += 4;  break
        case 1200: addition[3] = 0; this.player.plan += 1;  break
        case 800: addition[4] = 0; databus.ballistic += 1; 
          databus.index == 'laser' &&  (databus.fire = databus.ballistic)  ; break
      }
      databus.scores -= addition[0]
      addition[0] = 0
    }
  }

    

    if (x >= tgarea.startX && x <= tgarea.endX
      && y >= tgarea.startY
      && y <= tgarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      databus.setplaykg('scores', databus.scores)
      this.addition = false
      this.parentage.hasEventBind = false

      }


  }

  /**
   * 分享礼包道具页 ， 僚机版 
   */
  addition2(ctx){

    let x = screenWidth / 2
    let y = screenHeight / 2


    ctx.drawImage(
      img,
      201, 0, 113, 83,
      x - 130, y - 120,
      260,
      240
    )
    
   ctx.font = '22px Arial'
   ctx.fillStyle = '#fbe704'
   ctx.fillText('转发获得本局僚机！', x - 95, y - 85)

    ctx.drawImage(
      img,
      220,150, 120, 45,
      x - 120, this.decx,
      245,
      60
    )
  
    ctx.font = '18px Arial'
    ctx.fillStyle = '#ffffff'
    for(let i=0 ; i< 3 ;i ++)
    {
      ctx.drawImage(
        img,
        220+i*50, 90, 50, 50,
        x - 110, y - 60,
        45,
        45
      )
      switch(i)
      {
        case 0:
          ctx.fillText('僚机属性:速度慢', x - 50, y - 48) 
          ctx.fillText('特征：可穿透', x - 50, y -22)
          this.addbtnArea = {
            startX: x - 120,
            startY: y - 70,
            endX: x+125,
            endY: y-15
          }
          break;
        case 2:
          ctx.fillText('僚机属性:扩散', x - 50, y - 48)
          ctx.fillText('特征：一次3发', x - 50, y - 22); break
        case 1:
          ctx.fillText('僚机属性:速度快', x - 50, y - 48)
          ctx.fillText('特征：1秒6发', x - 50, y - 22) 
      }
      y += 55
    }

      ctx.font = '26px Arial'
      ctx.fillText('放弃', x-30 ,y)
    this.tgtnArea = {
      startX: x - 60,
      startY: y -20,
      endX: x,
      endY: y + 20
    }

  }

  /**
 * 分享礼包 触摸页  僚机篇
 */

  addEvent2(e) {

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let addarea = this.parentage.addbtnArea
    let tgarea = this.parentage.tgtnArea

    if (x >= tgarea.startX && x <= tgarea.endX
      && y >= tgarea.startY
      && y <= tgarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.addition = false
      this.parentage.hasEventBind = false
    }


    for(let i=1;i<=3;i++)
    {
      if (x >= addarea.startX && x <= addarea.endX
        && y >= addarea.startY
        && y <= addarea.endY) {
        i == 1 && (this.parentage.decx = window.innerHeight / 2 - 70)
        i == 2 && (this.parentage.decx = window.innerHeight / 2 - 15)
        i == 3 && (this.parentage.decx = window.innerHeight / 2 + 40)
        wx.shareAppMessage({
          title: '最经典飞机射击游戏',
          imageUrl: 'images/share.jpg',
          success: (res) => {
            canvas.removeEventListener('touchstart', this.parentage.touchHandler)
            this.addition = false
            this.parentage.hasEventBind = false
            this.enemyBenefit(i)
          },
          fail: (res) => {
            console.log('转发失败')
          }
        })
        break
        }else y -= 55
    }


  }

  /**
   * 分享礼包道具页 ， 技能篇
   */
  addition3(ctx) {

    let x = screenWidth / 2
    let y = screenHeight / 2


    ctx.drawImage(
      img,
      201, 0, 113, 83,
      x - 130, y - 120,
      260,
      240
    )

    ctx.font = '22px Arial'
    ctx.fillStyle = '#fbe704'
    ctx.fillText('转发获得技能！', x - 95, y - 85)

    ctx.drawImage(
      img,
      220, 150, 120, 45,
      x - 120, this.decx,
      245,
      60
    )

    ctx.font = '18px Arial'
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 3; i++) {
      ctx.drawImage(
        bt,
        0 + i * 100, 0, 50, 50,
        x - 110, y - 60,
        45,
        45
      )
      switch (i) {
        case 0:
          ctx.fillText('技能：穿梭弹', x - 50, y - 48)
          ctx.fillText('数量：+3', x - 50, y - 22)
          this.addbtnArea = {
            startX: x - 120,
            startY: y - 70,
            endX: x + 125,
            endY: y - 15
          }
          break;
        case 1:
          ctx.fillText('技能：齿轮', x - 50, y - 48)
          ctx.fillText('数量： +5', x - 50, y - 22); break
        case 2:
          ctx.fillText('技能：闪电', x - 50, y - 48)
          ctx.fillText('数量：+4', x - 50, y - 22)
      }
      y += 55
    }

    ctx.font = '26px Arial'
    ctx.fillText('放弃', x - 30, y)
    this.tgtnArea = {
      startX: x - 60,
      startY: y - 20,
      endX: x,
      endY: y + 20
    }

  }

  /**
 * 分享礼包 触摸页  技能篇
 */

  addEvent3(e) {

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let addarea = this.parentage.addbtnArea
    let tgarea = this.parentage.tgtnArea

    if (x >= tgarea.startX && x <= tgarea.endX
      && y >= tgarea.startY
      && y <= tgarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.addition = false
      this.parentage.hasEventBind = false
    }


    for (let i = 0; i < 3; i++) {
      if (x >= addarea.startX && x <= addarea.endX
        && y >= addarea.startY
        && y <= addarea.endY) {
        i == 0 && (this.parentage.decx = window.innerHeight / 2 - 70)
        i == 1 && (this.parentage.decx = window.innerHeight / 2 - 15)
        i == 2 && (this.parentage.decx = window.innerHeight / 2 + 40)
        wx.shareAppMessage({
          title: '最经典飞机射击游戏',
          imageUrl: 'images/share.jpg',
          success: (res) => {
            canvas.removeEventListener('touchstart', this.parentage.touchHandler)
            this.addition = false
            this.parentage.hasEventBind = false
            this.btBenefit(i*100+1)
          },
          fail: (res) => {
            console.log('转发失败')
          }
        })
        break
      } else y -= 55
    }


  }

  /**
     * 分享礼包道具页 ， 功能篇
     */
  addition4(ctx) {

    let x = screenWidth / 2
    let y = screenHeight / 2


    ctx.drawImage(
      img,
      201, 0, 113, 83,
      x - 130, y - 120,
      260,
      240
    )

    ctx.font = '22px Arial'
    ctx.fillStyle = '#fbe704'
    ctx.fillText('转发可获得道具！', x - 95, y - 85)

    ctx.drawImage(
      img,
      220, 150, 120, 45,
      x - 120, this.decx,
      245,
      60
    )

    ctx.font = '18px Arial'
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 3; i++) {
      ctx.drawImage(
        bt,
        0 + i * 50, 100, 50, 50,
        x - 110, y - 60,
        45,
        45
      )
      switch (i) {
        case 0:
          ctx.fillText('道具：复活币', x - 50, y - 48)
          ctx.fillText('数量：+1', x - 50, y - 22)
          this.addbtnArea = {
            startX: x - 120,
            startY: y - 70,
            endX: x + 125,
            endY: y - 15
          }
          break;
        case 1:
          ctx.fillText('导弹发射器', x - 50, y - 48)
          ctx.fillText('特征：范围伤害', x - 50, y - 22); break
        case 2:
          ctx.fillText('道具：高效能源', x - 50, y - 48)
          ctx.fillText('提高战机性能', x - 50, y - 22)
      }
      y += 55
    }

    ctx.font = '26px Arial'
    ctx.fillText('放弃', x - 30, y)
    this.tgtnArea = {
      startX: x - 60,
      startY: y - 20,
      endX: x,
      endY: y + 20
    }

  }


  /**
 * 分享礼包 触摸页  功能篇
 */

  addEvent4(e) {

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let addarea = this.parentage.addbtnArea
    let tgarea = this.parentage.tgtnArea

    if (x >= tgarea.startX && x <= tgarea.endX
      && y >= tgarea.startY
      && y <= tgarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.addition = false
      this.parentage.hasEventBind = false
    }


    for (let i = 0; i < 3; i++) {
      if (x >= addarea.startX && x <= addarea.endX
        && y >= addarea.startY
        && y <= addarea.endY) {
        i == 0 && (this.parentage.decx = window.innerHeight / 2 - 70)
        i == 1 && (this.parentage.decx = window.innerHeight / 2 - 15)
        i == 2 && (this.parentage.decx = window.innerHeight / 2 + 40)
        wx.shareAppMessage({
          title: '最经典飞机射击游戏',
          imageUrl: 'images/share.jpg',
          success: (res) => {
            canvas.removeEventListener('touchstart', this.parentage.touchHandler)
            this.addition = false
            this.parentage.hasEventBind = false
            this.gnBenefit(i)
          },
          fail: (res) => {
            console.log('转发失败')
          }
        })
        break
      } else y -= 55
    }


  }

  /**
     * 复活按钮
     */
  addition5(ctx) {

    let x = screenWidth / 2
    let y = screenHeight / 2


    ctx.drawImage(
      img,
      201, 0, 113, 83,
      x - 110, y - 100,
      220,
      200
    )

    ctx.font = '22px Arial'
    ctx.fillStyle = '#fbe704'
    ctx.fillText('使用复活币？', x - 70, y - 70)


    ctx.font = '38px Arial'; ctx.fillText(databus.index_life, x + 20, y)
    ctx.font = '24px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('放弃', x - 30, y + 150)

      ctx.drawImage(
        bt,
        0 , 100, 50, 50,
        x - 60, y - 55,
        60,
        60
      )
      ctx.draw
    ctx.fillText('X', x, y); 

    ctx.drawImage(
      img,
      160, 87, 40, 28,
      x -40, y +35,
      75,
      50
    )
    ctx.fillStyle = '#000000'
    ctx.fillText('确定', x -25, y + 65)

    this.qrsytnArea = {
      startX: x -40,
      startY: y +35,
      endX: x +35,
      endY: y +85
    } 


    this.tgtnArea = {
      startX: x - 40,
      startY: y +120,
      endX: x+20,
      endY: y + 160
    }

  }


  /**
 * 复活按钮
 */

  addEvent5(e) {

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let qrsyarea = this.parentage.qrsytnArea
    let tgarea = this.parentage.tgtnArea

    if (x >= tgarea.startX && x <= tgarea.endX
      && y >= tgarea.startY
      && y <= tgarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.addition = false
      this.parentage.hasEventBind = false
      databus.gameOver = true
      
    }

    if (x >= qrsyarea.startX && x <= qrsyarea.endX
      && y >= qrsyarea.startY
      && y <= qrsyarea.endY) {
      canvas.removeEventListener('touchstart', this.parentage.touchHandler)
      this.addition = false
      this.parentage.hasEventBind = false
      this.player.time += 1; this.player.decide = false;
      databus.setplaykg('index_life',--databus.index_life)

    }




  }

  


  
}

