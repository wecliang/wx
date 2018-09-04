import Sprite   from '../base/sprite'
import Bullet   from './bullet'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

let databus = new DataBus()
let decide = false, frame = 0, lock = 691, xl,yl
let img = new Image(); img.src = 'images/bt_ioc.png';
let skill = []; 

// 玩家相关常量设置

databus.wjindex()
const PLAYER_WIDTH   = 60
const PLAYER_HEIGHT  = 50
const Shiled = 21


function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class Player extends Sprite {
  constructor() {
    super(databus.indeximg, PLAYER_WIDTH, PLAYER_HEIGHT, Shiled)

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

// 游戏加载时玩家数据更新
  updef(n){
    this.img = databus.indeximg; this.framesImg(this.img)   // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2; this.y = screenHeight - this.height - 30
    decide = false                          //重置导弹瞄准目标
    this.time = 0; this.time2 = 0           //记录玩家火力持续时间
    this.decide = true  // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false
    this.time3 = 0 // 作为技能使用
    // 初始技能数组  可使用技能为2个
    skill[0] = []; skill[0][0] = n; skill[0][1] = 1;
    skill[1] = []; skill[1][0] = n+1; skill[1][1] = 101;
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 60
    xl = x - this.x
    yl = y - this.y

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - xl
    let disY = y - yl

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY

  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {


    canvas.addEventListener('touchstart', ((e) => {

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if(e.touches.length == 2)
      {
        let x2 = e.touches[1].clientX
        let y2 = e.touches[1].clientY
        databus.lock || (this.lock0FingerOnAir(x2, y2))  
        this.skillFingerOnAir(x2, y2)             // 判断用户是否点击了技能
      }else{
        this.skillFingerOnAir(x, y)
        databus.lock || (this.lock0FingerOnAir(x, y))   //把用户触摸坐标传
      }
      

      if ( this.checkIsFingerOnAir(x, y) ) {
        this.touched = true
        this.setAirPosAcrossFingerPosZ(x, y)
      } 
      

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if (e.touches.length == 2) {
        let x2 = e.touches[1].clientX
        let y2 = e.touches[1].clientY
      }


      
      this.touched ? this.setAirPosAcrossFingerPosZ(x, y) :
      this.checkIsFingerOnAir(x, y) && ( this.touched = true ) 

       this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      this.touched = false

    }).bind(this))
  }

  /**
 * 玩家射击操作
 * 射击时机由外部决定
 */
  shoot(ms) {
    switch (databus.index) {
      case 'laser':
        let bullet = databus.pool.getItemByClass('bullet', Bullet, 'up')
        switch (ms) {
          case 1: bullet.width = 6; break
          case 2: bullet.width = 9; break
          case 3: bullet.width = 12; break
          case 4: bullet.width = 15; break
          case 5: bullet.width = 18; break
        }; bullet.height = 50;
        var x = this.x + this.width / 2 - bullet.width / 2
        bullet.init(
          x,
          this.y - 25,
          databus.career == 16 ? 16 : 9 + (databus.career / 4),
          'up'
        )
        databus.bullets.push(bullet)
        break


      default:
        for (var i = 1; i <= ms; i++) {
          let bullet = databus.pool.getItemByClass('bullet', Bullet, 'up')
          var x = this.x + this.width / 2 - bullet.width / 2, y = this.y - 10
          if (ms == 2 || ms == 4) {
            switch (i) {
              case 1: x += 15; databus.index != 'fill' && (y += 10); break
              case 2: x -= 15; databus.index != 'fill' && (y += 10); break
              case 3: x += 30; databus.index != 'fill' && (y += 20); break
              case 4: x -= 30; databus.index != 'fill' && (y += 20); break
            }
          } else {
            switch (i) {
              case 2: databus.index != 'fill' ? (y += 10, x += 15) : x += 30; break
              case 3: databus.index != 'fill' ? (y += 10, x -= 15) : x -= 30; break
              case 4: databus.index != 'fill' ? (y += 20, x += 30) : x += 15; break
              case 5: databus.index != 'fill' ? (y += 20, x -= 30) : x -= 15; break
            }
          }

          bullet.init(
            x,
            y,
            databus.career == 16 ? 16 : 9 + (databus.career / 4),
            'up'
          )
          bullet.i = i
          bullet.ms = ms
          databus.bullets.push(bullet)
        }

    }
  }

  /**
   * 检测玩家是否使用了技能
   */
  skillFingerOnAir(x, y) {
    if(x>55) return;
      for(let i=0;i<skill.length; i++)
      {
        if(y>skill[i][2] && y<skill[i][3])
        {
         switch(skill[i][1])
         {
           case 1:  this.time3 = 300 
              databus.bullets.forEach((item) => {
                item.bt == 'red' && (item.visible = false)
              });  wx.vibrateLong({})
              break;
           case 101: this.lockshoot('skill1') ; break;
           case 201: this.lockshoot('tunder'); wx.vibrateLong({}); break;
         }
         if( !(--skill[i][0])) skill.splice(i, 1)
          break
        }
      }
  }


  /**
   * 检测玩家是否选择了敌机
   */
  lock0FingerOnAir(x, y){
    let deviation = 5
      for(var i=0 ; i<databus.enemys.length ; i++)
      {
        let item = databus.enemys[i]
        if(item.bg) continue;
          if( x >= item.x - deviation
          && y >= item.y - deviation
          && x <= item.x + item.width + deviation
          && y <= item.y + item.height + deviation)
          {
            item.lock = true
            databus.lock = true
            break
          }

      }
      
  }

// 用来增加新的技能
  skilldata(s)
  {
    let i = 0
    for(i;i<skill.length;i++)
    {
      if(skill[i][1]==s){ skill[i][0]++ ; break; }
    }
    if(i == skill.length)
    {
      skill[i]=[];skill[i][0]=1;skill[i][1]=s;
    }
  }


  /***
   * 导弹生成函数 
   */
  lockbullet(ctx,boos){

      //随机导弹生成函数
      boos && databus.frame % lock == 0 && databus.frame > 11000 && 
        (decide = true, frame = databus.frame + 70 )
      decide ? databus.frame % 3 == 0 && this.looking(ctx) :
        frame - databus.frame > 90 && (frame = databus.frame + 70 )
      databus.frame == frame && databus.frame > 2000 && (decide = false, this.lockshoot('lock'))

      //玩家追踪导弹函数
        databus.lock && databus.frame % 10 == 0 && databus.locks &&
        ( this.lockshoot('trace') ,databus.locks -= 2)

      this.lookskile(ctx)

    
  }


  //绘制技能图标
  lookskile(ctx)
  {
    for(let i=0; i<skill.length; i++)
    {
      ctx.drawImage(
        img,
        skill[i][1]-1, 0, 50, 50,
        0,
        screenHeight - 145-i*55,
        55,
        55
      )
      ctx.fillText(skill[i][0], 50, screenHeight -95 - i * 55)
      skill[i][2] = screenHeight - 145-i*55; skill[i][3] = screenHeight - 90-i*55;
      
      if(i == 2) break;
    }
  
    this.time3 && (
      this.time3--,this.time3%20 == 0 && this.lockshoot('skill0')
    )

  }

  /**
   * 导弹瞄准图像
   */
  looking(ctx) {

    ctx.drawImage(
      img,
      50,0,50,50,
      this.x + this.width / 2 - 25,
      this.y + this.height / 2 - 25,
      50,
      50
    )

    ctx.drawImage(
      img,
      0,50,4,50,
      this.x + this.width / 2,
      0,
      4,
      screenHeight
    )


  }


  /**
   * 玩家锁定目标图标
   */
  looking2(ctx) {
    ctx.drawImage(
      img,
      150,0,50,50,
      databus.lockx,
      databus.locky,
      50,
      50
    )
  }

/**
 * 把导弹生成写入子弹类
 */
  lockshoot(em){
    let bullet
    switch(em)
    {
      case 'lock' :
        databus.frame < 30000 ? lock = rnd(600, 1800) : lock = rnd(200, 800)
        bullet = databus.pool.getItemByClass('bullet', Bullet, em)
        bullet.init(
          this.x + this.width / 2 - 15,
          -this.height,
          15,
          em
        )
        databus.bullets.push(bullet) ; break
      case 'trace' :
        for (var i = 1; i <= 2; i++)
      {
          bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          bullet.init(
            this.x + this.width / 2 - 8,
            this.y + this.height/2 - 12,
            10,
            em
          )
          bullet.i = i%2 ; bullet.fire = 6;
          bullet.time = 0
          databus.bullets.push(bullet)
      }; break
      case 'skill0':
          bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          bullet.init(
            rnd(25, screenWidth-25),
            screenHeight+this.height,
            6,
            em
          )
          bullet.time = 0
          bullet.xl = 1 ; bullet.wx = 50; bullet.hx = 100 ; bullet.fire = 10;
          databus.bullets.push(bullet)
          break
      case 'skill1':
        bullet = databus.pool.getItemByClass('bullet', Bullet, em)
        bullet.init(
          this.x+this.width/2-bullet.width/2,
          this.y,
          1,
          em
        )
        bullet.time = 0
        bullet.xl = 1; bullet.wx = 100; bullet.hx = 100
        databus.bullets.push(bullet)
        break
      case 'tunder':
        bullet = databus.pool.getItemByClass('bullet', Bullet, em)
        bullet.init(
          0,
          0,
          1,
          em
        )
        bullet.time = 0
        bullet.xl = 151; bullet.wx = 150; bullet.hx = 200;bullet.fire = 30;
        databus.bullets.push(bullet)
        break
    }
    
  } 
/**
 * 玩家选择动画演示
 */
  wjshoot(ms) {
    switch (databus.index) {
      case 'laser':
        for (var i = 1; i <= ms; i++) {
          let bullet = databus.pool.getItemByClass('bullet', Bullet, 'up')
          bullet.width = 6 ; bullet.height = 50;
          var x = screenWidth / 2
          if (ms == 2 || ms == 4) {
            switch (i) {
              case 1: x += 3; break
              case 2: x -= 3; break
              case 3: x += 6; break
              case 4: x -= 6; break
            }
          } else {
            switch (i) {
              case 2: x += 3; break
              case 3: x -= 3; break
              case 4: x += 6; break
              case 5: x -= 6; break
            }
          }

          bullet.init(
            x,
            screenHeight / 2 -60,
            databus.career == 16 ? 16 : 9 + (databus.career / 4),
            'up'
          )
          bullet.i = i
          bullet.ms = ms
          databus.bullets.push(bullet)
        }
        break
      default:
        for (var i = 1; i <= ms; i++) {
          let bullet = databus.pool.getItemByClass('bullet', Bullet, 'up')
          var x = screenWidth / 2
          if (ms == 2 || ms == 4) {
            switch (i) {
              case 1: x += 15; break
              case 2: x -= 15; break
              case 3: x += 30; break
              case 4: x -= 30; break
            }
          } else {
            switch (i) {
              case 2: x += 15; break
              case 3: x -= 15; break
              case 4: x += 30; break
              case 5: x -= 30; break
            }
          }

          bullet.init(
            x,
            screenHeight / 2 - 50,
            databus.career == 16 ? 16 : 9 + (databus.career / 4),
            'up'
          )
          bullet.i = i
          bullet.ms = ms
          databus.bullets.push(bullet)
        }

    }
  }
  
}
