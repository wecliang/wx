import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'
import Parentage from './runtime/parentage'

let ctx = canvas.getContext('2d')
let databus = new DataBus()
let em,zd = 20 
let plan = 0 , plans = 4
let donus=0

/**
 * 游戏主函数
 */
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()

    

    //显示转发按钮
    wx.showShareMenu({
  
    })

    // 用户点击了“转发”按钮
    wx.onShareAppMessage(function () {
      return {
        title: '最经典飞机射击游戏',
        imageUrl: 'images/share.jpg',
      }
    })


    //微信游戏圈
    this.button = wx.createGameClubButton({
      icon: 'light',
      style: {
        left: 20,
        top: 20,
        width: 40,
        height: 40
      }
    })

    




  } 




/**游戏开始主函数
 * 只执行一次
*/
  restart() {
    databus.reset()

    this.bg = new BackGround(ctx)
    this.player = new Player()
    this.gameinfo = new GameInfo()
    this.music = new Music()
    this.parentage = new Parentage(ctx)
    this.enemy = new Enemy()

    this.bindLoop = this.loop.bind(this)
    this.parentage.hasEventBind = false    //触摸判断
    this.mainmenu = false
    this.makepage = false    //确定页弹出按钮
    this.hasmakepage = false //确定页点击判断
    this.addition = false    //用来打开每局游戏选择道具
    this.parentage.menu = 'sy'

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )

    this.parentage.addIndex()  //初始化道具数组
    
  }

/**
 * 游戏开始主循环函数
 */
  rescs(){
    plan = 0 , zd = rnd(20,40)
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.button.hide() //隐藏微信游戏圈
    this.parentage.addIndex()  //初始化道具数组
    this.decboos = false //用来控制敌机boos的生成

    databus.reset()

  //  this.player.updef()              //重新加载玩家数据

    this.parentage.mos == '简单' && 
      (databus.frame = 1, this.player.plan = 3, donus = 8000, this.player.updef(2) )
    this.parentage.mos == '困难' && 
      (databus.frame = 6001, this.player.plan = 2, this.addition = 1,donus = 6000,
        this.player.updef(1))
    databus.pool.PoolDic()
    
    this.music.playBgm2()


    window.cancelAnimationFrame(this.aniId)
    this.parentage.hasEventBind = false
    
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    let enemy
    databus.frame % (27 + plan * 10) === 0
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'too'),
        enemy.plan = (1 + (plan)) * plans,         //血量
        enemy.init(rnd(3, 6), em),       //速度 ，型号
        databus.enemys.push(enemy)
      )
    databus.frame % 68 === 0
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'one'),
        enemy.plan = (2 + (plan * 2)) * plans,
        enemy.init(rnd(5, 9), em),
        databus.enemys.push(enemy)
      )
    databus.frame % (818 + zd) == 0
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'zeio'),
        enemy.plans = enemy.plan = (8 + (plan * 5)) * plans,
        enemy.init(3, em),
        enemy.decide = true,    //次数判断
        databus.enemys.push(enemy)
      )
    databus.frame % (918 - zd) === 0 && databus.frame > 2000
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'five'),
        enemy.plan = (6 + (plan * 4)) * plans,
        enemy.init(1, em),
        enemy.time = 100,
        enemy.spenx = 1,
        databus.enemys.push(enemy)
      )
    databus.frame % (1177 - zd) === 0 && databus.frame > donus
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'three'),
        enemy.plans = enemy.plan = (30 + (plan * 20)) * plans,
        enemy.time = 60,         //子弹发射判断条件
        enemy.init(2, em),
        databus.enemys.push(enemy)
      )
    databus.frame % (3227 - (zd * 3)) === 0 && databus.frame > donus*2
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'four'),
        enemy.plans = enemy.plan = (50 + (plan * 50)) * plans,
        enemy.time = 150,         //子弹发射判断条件
        enemy.init(2, em),
        databus.enemys.push(enemy)
      )
    databus.frame % (1137 - zd) == 0 && databus.frame > 4000
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'six'),
        enemy.plans = enemy.plan = (10 + (plan * 6)) * plans,
        enemy.init(1, em),
        enemy.width = 40, enemy.height = 40,
        enemy.time = 1,
        databus.enemys.push(enemy)
      )
    databus.frame % (4233 - zd * 4) == 0 && databus.frame > donus*5
      && (
        enemy = databus.pool.getItemByClass('enemy', Enemy, 'black'),
        enemy.init(2, 'black'), enemy.y = 150, enemy.time = 1,enemy.bg = true,
        enemy.x > (window.innerWidth - enemy.width) / 2 ? enemy.x = window.innerWidth : enemy.x = -enemy.width,
        databus.enemys.push(enemy)
      )

    if (databus.frame%(290+zd) == 0 && databus.frame > donus*3) {
      enemy = databus.pool.getItemByClass('enemy', Enemy, 'stone');
      enemy.pls = enemy.plan = 40; 
      enemy.init(12, 'stone'); enemy.time = 0; enemy.xl = 1; enemy.wx = 100, enemy.hx = 100;
      enemy.dx = rnd(window.innerWidth / 2, window.innerWidth - enemy.width)
      enemy.x = -enemy.width; enemy.y = 500; 
      databus.enemys.push(enemy)
    }
    if (databus.frame % (310+zd) == 0 && databus.frame > donus * 3) {
      enemy = databus.pool.getItemByClass('enemy', Enemy, 'stone2');
      enemy.pls = enemy.plan = 40;
      enemy.init(12, 'stone2'); enemy.time = 0; enemy.xl = 301; enemy.wx = 100, enemy.hx = 100;
      enemy.dx = rnd(0, window.innerWidth / 2)
      enemy.x = window.innerWidth; enemy.y = 500;
      databus.enemys.push(enemy)
    }

    databus.frame % donus == 0 && 
    (plan++ , zd = rnd((plan * 50), (plan * 50) + 50), databus.boos = false, this.decboos = true)

  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => { 
        switch(bullet.bt)
        {
          case 'tunder': 
          case 'up' :
          case 'trace':
          case 'skill0': case 'skill1':
          case 'benefit0_up': case 'benefit1_up' : case 'benefit2_up':
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
              let enemy = databus.enemys[i]
              if(enemy.bg) continue;             //检测敌机是否为背景
              if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
                if (enemy.plan <= databus.fire ){
                enemy.playAnimation()
                that.music.playExplosion()
                bullet.wx || (bullet.visible = false)
                switch(enemy.em)
                {
                  case 'one': databus.score += 2 + (plan * 2) ; break
                  case 'too': databus.score += 1 + plan; break
                  case 'three': databus.score += 30 + (plan * 20); break
                  case 'four': databus.score += 50 + (plan * 50); break
                  case 'five': databus.score += 6 + (plan * 4); break
                  case 'six': databus.score += 10 + (plan * 6); break
                  case 'zeio': databus.score += 8 + (plan * 5); break
                  case 'Boos1': databus.score += 100 + (plan * 100);break
                  case 'Boos2': databus.score += 200 + (plan * 110); break
                  case 'Boos3': databus.score += 300 + (plan * 120); break
                  case 'Boos4': databus.score += 400 + (plan * 130); break
                  case 'Boos5': databus.score += 500 + (plan * 140); break
                  case 'Boos6': databus.score += 600 + (plan * 150); break
                  case 'Boos7': databus.score += 700 + (plan * 160); break
                  case 'Boos8': databus.score += 800 + (plan * 170); break
                  default: databus.score +=  10 + plan*5
                }
              }
              else {
                bullet.wx || (bullet.visible = false)
                bullet.fire? enemy.plan -= bullet.fire : enemy.plan -= databus.fire
                }
              enemy.plans && ( enemy.time2 = databus.frame+40 )
              } 
            };break
          case 'benefit3_up':
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
              let enemy = databus.enemys[i]
              if (enemy.bg) continue;             //检测敌机是否为背景
              if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
                if (enemy.plan <= bullet.fire) {
                  enemy.playAnimation()
                  that.music.playExplosion()
                  bullet.wx || (bullet.visible = false)
                  databus.score += 10 + plan * 5
                  }
                else {
                  bullet.wx || (bullet.visible = false)
                  bullet.fire ? enemy.plan -= bullet.fire : enemy.plan -= databus.fire
                }
                enemy.plans && (enemy.time2 = databus.frame + 40);
                bullet.width == 25 && (bullet.width = 130,bullet.height=130 , bullet.xl = 60 ,bullet.wx = 60)
              }
            }; break
          case 'blood':
              if (this.player.isCollideWith(bullet)) { 
                this.player.plan < 3 ? this.player.plan++ : this.player.shield = true; bullet.visible = false;
              };break
          case 'speed':
              if (this.player.isCollideWith(bullet)) {
                databus.career < 16 && (databus.career += 4) 
                databus.career == 16 && (this.player.time2 = 600); bullet.visible = false;
               }; break
          case 'curve':
              if (this.player.isCollideWith(bullet)) { 
                databus.ballistic == 5 && (this.player.time2 = 600, databus.fire *= 2)
                databus.ballistic == 6 && (this.player.time2 = 600)
                databus.ballistic < 6 && (databus.ballistic++); bullet.visible = false;
                databus.index == 'laser' && databus.ballistic != 6 && (databus.fire = databus.ballistic)
              }; break
          case 'gift':
            if (this.player.isCollideWith(bullet)) {
              let i = rnd(1,98);
              this.addition = i%3+2 ;console.log(this.addition); bullet.visible = false
            }; break
          case 'skill' :
              if (this.player.isCollideWith(bullet)) {
                this.player.skilldata(bullet.xl); bullet.visible = false;
              }  break
          default :
              databus.skills.forEach((bt, i) => {   //遍历技能数组  检测碰撞
              bt.visible || databus.skills.splice(i, 1) 
                if (bullet.visible && bt.isCollideWith(bullet)){bullet.xl || (bullet.visible = false)}
              })
              if (bullet.isCollideWith(this.player)) {
                if (!this.player.shield)
                {
                  if (this.player.plan == 1 && this.player.time % 20 == 0)
                  {
                    databus.index_life ? this.addition = 5 : databus.gameOver = true ;
                  }
                  else if(this.player.time%20==0){
                      this.player.plan--;this.player.time +=1;
                    bullet.xl || (bullet.visible = false)
                    that.music.playShock()
                    this.player.decide = false
                    if (databus.ballistic > 2) {
                      databus.ballistic == 6 && (databus.fire /= 2)
                      databus.ballistic--

                    }
                    if (databus.career > 4) databus.career -= 4
                    databus.index == 'laser' && (databus.fire = databus.ballistic)
                  }
                } else
                {
                  this.player.shield = false
                  bullet.xl || (bullet.visible = false)
                  that.music.playShock()
                  this.player.decide = false
                } 
                break
              }


        }
      
    })

    for (let i = 0, il = databus.enemys.length; i < il; i++) {
      let enemy = databus.enemys[i]
      if(!enemy.bg)
      { 
        if (this.player.isCollideWith(enemy)) {
          if (!this.player.shield)
          {
            if (this.player.plan == 1 && this.player.time%20== 0)
             { databus.index_life ? this.addition = 5 : databus.gameOver = true; }
            else if (this.player.time % 20 == 0){
                this.player.plan--             //玩家生命值
                this.player.time += 1
                this.player.decide = false
                if(enemy.plan <= 500)
                {
                  enemy.visible=false            //销毁碰撞敌机
                  enemy.playAnimation()          
                  that.music.playExplosion()     
                  that.music.playShock()
                }else enemy.plan -= 500
                if (databus.ballistic > 2)
                {
                  databus.ballistic == 6 && ( databus.fire /= 2 )
                  databus.ballistic--
                  
                } 
                if (databus.career>4) databus.career -= 4
                }
          } else
          {
            if(enemy.plan <= 500)
            {
              enemy.visible = false            //销毁碰撞敌机
              enemy.playAnimation()
              that.music.playExplosion()
              that.music.playShock()
            }
            else enemy.plan -= 500
            this.player.decide = false    
            this.player.shield = false
          }
        }
      }
    }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    let fharea = this.gameinfo.fhbtnArea
    
      x >= fharea.startX  && x <= fharea.endX  && y >= fharea.startY  && y <= fharea.endY &&
      (  
        this.music.playBgm1(),
        this.parentage.hasEventBind = false, this.mainmenu = false, databus.gameOver = false ,
        canvas.removeEventListener('touchstart', this.touchHandler), this.button.show()
      )

      x >= area.startX  && x <= area.endX && y >= area.startY  && y <= area.endY &&  this.rescs()
  }
  

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.update()

    this.bg.render(ctx)
    
    databus.bullets
      .forEach((item) => {
        if (item.xl) item.drawToCanvas3(ctx)
        else 
        databus.ballistic != 6 ? item.drawToCanvas(ctx) : 
        item.img2 ? item.drawToCanvas2(ctx) : item.drawToCanvas(ctx)
      })

    databus.enemys
      .forEach((item) => {
        item.xl? item.drawToCanvas3(ctx) : item.drawToCanvas(ctx)
        item.time2 && item.time2 > databus.frame &&
          item.drawplans(ctx, item.width, Math.floor((item.plan / item.plans) * item.width))
      })




    if (databus.frame % 5 == 0 || this.player.decide){
      this.player.shield && this.player.drawToCanvas4(ctx)
      this.player.drawToCanvas(ctx)
      this.player.decide || (this.player.time++)
      this.player.time % 20==0 && (this.player.decide = true)
    } 

    this.player.lockbullet(ctx, databus.boos)   //导弹生成主逻辑
    databus.lock && this.player.looking2(ctx)   //玩家锁定目标 
    



    databus.animations.forEach((ani) => {
        ani.isPlaying && ani.aniRender(ctx)
    })



    this.gameinfo.renderGameScore(ctx, databus.score ,databus.locks)  //绘制追踪弹数量
    this.gameinfo.randplayerplan(ctx, this.player.plan)    //绘制血量
    
    // 游戏结束停止帧循环
    if (databus.gameOver) {
      if (databus.indexdec) this.parentage.indexPage(ctx, databus.indexdec)
      else this.gameinfo.renderGameOver(ctx, databus.score, donus, (databus.score + donus))
      if (!this.parentage.hasEventBind) {
        wx.triggerGC()                    //加快canvas垃圾回收
        this.parentage.mos == '困难' ? donus = Math.ceil(databus.score / 2) : donus=0;
        console.log()
        !databus.indexdec && !databus.getplaykg('fort_dec') &&
           databus.score + donus > 7000 && (databus.indexdec = 'fort');
        databus.scores += (databus.score + donus)
        databus.score + donus > databus.maxscore &&
          (databus.maxscore = (databus.score + donus),
          databus.setplaykg('maxscore', databus.maxscore) )
          databus.setplaykg('locks',databus.locks)
          databus.setplaykg('scores', databus.scores)
        this.parentage.hasEventBind = true
        databus.indexdec ? this.touchHandler = this.parentage.indexEvent.bind(this):
            this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  } 

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    this.makepage && (this.makepage = false, this.music.playBgm2())  //音效判断 当转发音效停止时触发

    databus.perlayx = this.player.x + 30      //全局变量记录玩家x,y 轴位置
    databus.perlayy = this.player.y

    //敌机生成函数
    databus.boos ? this.enemyGenerate() :(
      databus.bullets
        .forEach((item, i) => {
          item.bt2 == 'six' && item.update(i)
        })
    )
    this.decboos && (this.decboos = false , this.enemyBoos())

// 用于溢出火力显示
    this.player.time2 && (
      this.player.time2--,
      this.zdindex()
    )


      databus.bullets
        .forEach((item,i) => {
         item.update(i)
      })
    databus.enemys
      .forEach((item,i) => {
          item.update(item,i)
      })

    this.collisionDetection()       //碰撞监测
    if(databus.index == 'laser')
    {
      databus.perlayyx = this.player.y - databus.perlayy
      if (databus.frame % (5 - databus.career/4) === 0) {
        this.player.shoot(databus.ballistic)
        this.music.playShoot()
      }
    }else 
    {
      if (databus.frame % (20 - databus.career) === 0) {
        this.player.shoot(databus.ballistic >= 6 ? 5 : databus.ballistic)
        this.music.playShoot()
      }
    }
    
  }

/**
 * 火力溢出时进行处理
 */
  zdindex(){
    if (this.player.time2 == 1){
      databus.career >= 16 && (databus.career = 12)
      databus.ballistic >= 6 && (databus.ballistic = 5, databus.fire /= 2)
    }


  }




/**
 * 用来绘制  游戏加成道具
 */
addpt(e)
{
  databus.frame--

  switch(e)
  {
    case 1: this.parentage.addition(ctx) ; break
    case 2: this.parentage.addition2(ctx); break
    case 3: this.parentage.addition3(ctx); break
    case 4: this.parentage.addition4(ctx); break
    case 5: this.parentage.addition5(ctx); break         //复活篇
  }
  if (!this.parentage.hasEventBind) {
    e != 5 && ( this.makepage = true )
    this.parentage.hasEventBind = true
    switch (e) {
      case 1: this.parentage.touchHandler = this.parentage.addEvent.bind(this);break
      case 2: this.parentage.decx = window.innerHeight/2 - 70; 
        this.parentage.touchHandler = this.parentage.addEvent2.bind(this); break
      case 3: this.parentage.decx = window.innerHeight / 2 - 70;
        this.parentage.touchHandler = this.parentage.addEvent3.bind(this); break
      case 4: this.parentage.decx = window.innerHeight / 2 - 70;
        this.parentage.touchHandler = this.parentage.addEvent4.bind(this); break
      case 5: this.parentage.touchHandler = this.parentage.addEvent5.bind(this); break
    }
    canvas.addEventListener('touchstart', this.parentage.touchHandler)
  }
}



  // 实现游戏帧循环
  loop() {
    this.mainmenu || this.renew()
    this.mainmenu && ( this.addition || this.update(), this.render())
    
   databus.gameOver || databus.frame++
   this.addition && this.addpt(this.addition)



    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }


























  /**
   * 主页触摸判断
   */
  zytouchEvent(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.parentage.ksbtnArea
    let szarea = this.parentage.szbtnArea  //判断音量设置按钮
    let wjarea = this.parentage.wjbtnArea  //判断玩家战机选择按钮
    let gnarea = this.parentage.gnbtnArea
    let msarea = this.parentage.msbtnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY) {
      this.rescs()
      this.mainmenu = true
      canvas.removeEventListener('touchstart', this.touchHandler)
    }

    if (x >= szarea.startX
      && x <= szarea.endX
      && y >= szarea.startY
      && y <= szarea.endY) {
      this.parentage.menu = 'sz'
      this.parentage.hasEventBind = false
      canvas.removeEventListener('touchstart', this.touchHandler)

    }

    if (x >= wjarea.startX
      && x <= wjarea.endX
      && y >= wjarea.startY
      && y <= wjarea.endY) {
      databus.reset()
      this.parentage.getindex()  //读取玩家缓存信息
      this.parentage.menu = 'wj'
      this.parentage.hasEventBind = false
      canvas.removeEventListener('touchstart', this.touchHandler)
    }


    if (x >= gnarea.startX && x <= gnarea.endX && y >= gnarea.startY && y <= gnarea.endY) {
      this.parentage.menu = 'gn'
      this.parentage.hasEventBind = false
      canvas.removeEventListener('touchstart', this.touchHandler)
    }


    if (x >= msarea.startX && x <= msarea.endX && y >= msarea.startY && y <= msarea.endY) {
      this.parentage.mos = this.parentage.mos == '简单' ? '困难' : '简单'
      this.parentage.setplaykg('mos', this.parentage.mos)
    }



  }

  /**
   * 主页更新函数
   */
  renew() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.updatezy()
    this.bg.render(ctx)

    if (this.parentage.menu == 'sy') {
      this.parentage.render(ctx)
      if (!this.parentage.hasEventBind) {
        this.parentage.hasEventBind = true
        this.touchHandler = this.zytouchEvent.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }

    else if (this.parentage.menu == 'sz') {
      this.parentage.szrender(ctx)
      if (!this.parentage.hasEventBind) {
        this.parentage.hasEventBind = true
        this.touchHandler = this.parentage.sztouchEvent.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)

      }
    }

    else if (this.parentage.menu == 'wj') {
      this.wjrende()
      this.parentage.wjrender(ctx)
      if (!this.parentage.hasEventBind) {
        this.parentage.hasEventBind = true
        this.parentage.touchHandler = this.parentage.wjtouchEvent.bind(this)
        canvas.addEventListener('touchstart', this.parentage.touchHandler)

      }
    }

    else if (this.parentage.menu == 'gn') {
      this.parentage.gnrender(ctx)
      if (!this.parentage.hasEventBind) {
        this.parentage.hasEventBind = true
        this.parentage.touchHandler = this.parentage.gntouchEvent.bind(this)
        canvas.addEventListener('touchstart', this.parentage.touchHandler)
      }
    }

    this.alertzdy()
  }

  /**
   * 用来弹出 确定按钮
   */
  alertzdy() {
    if (this.makepage) {
      this.parentage.makePage(ctx, this.parentage.alert)
      if (!this.hasmakepage) {
        this.hasmakepage = true
        this.parentage.touchHandler = this.parentage.qtouchEvent.bind(this)
        canvas.addEventListener('touchstart', this.parentage.touchHandler)
      }
    }
  }

  /**
* 玩家战机演示生成函数
*/
  wjrende() {
    databus.bullets
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })


    if (databus.index == 'laser') {
      databus.perlayyx = 0
      if (databus.frame % 4 === 0) {
        this.player.wjshoot(1)
        this.music.playShoot()
      }
    } else {
      if (databus.frame % (20 - databus.career) === 0) {
        this.player.wjshoot(databus.ballistic)
        this.music.playShoot()
      }
    }

    databus.perlayx = window.innerWidth / 2 + 5
    databus.bullets
      .forEach((item, i) => {
        item.update(i)
      })


  }

  /**
*  生成僚机道具
*/
  enemyBenefit(e) {
    let em, enemy
    switch (e) {
      case 1: em = 'benefit0'; break;
      case 3: em = 'benefit1'; break;
      case 2: em = 'benefit2'; break;
    }
    enemy = databus.pool.getItemByClass('enemy', Enemy, em);
    enemy.init(10, em); enemy.wz = 0; enemy.bg = true;
    databus.enemys.push(enemy)
    enemy = databus.pool.getItemByClass('enemy', Enemy, em);
    enemy.init(10, em); enemy.wz = 1; enemy.bg = true;
    databus.enemys.push(enemy)
  }

  /**
   * 添加技能
   */
  btBenefit(e) {
    switch (e) {
      case 1: for (let i = 0; i < 3; i++) { this.player.skilldata(e) }; break;
      case 101: for (let i = 0; i < 5; i++) { this.player.skilldata(e) }; break;
      case 201: for (let i = 0; i < 4; i++) { this.player.skilldata(e) }; break;
    }
  }

  /**
   * 添加道具
   */
  gnBenefit(e) {
    let enemy
    switch (e) {
      case 0: databus.setplaykg('index_life', ++databus.index_life); break;
      case 1: enemy = databus.pool.getItemByClass('enemy', Enemy, 'benefit3_zuo');
        enemy.init(6, 'benefit3_zuo'); enemy.bg = true; enemy.x = 0;
        databus.enemys.push(enemy)
        enemy = databus.pool.getItemByClass('enemy', Enemy, 'benefit3_you');
        enemy.init(6, 'benefit3_you'); enemy.bg = true; enemy.x = window.innerWidth - enemy.width;
        databus.enemys.push(enemy); break;
      case 2: databus.ballistic < 5 && (databus.ballistic = 5);
        databus.curve < 12 && (databus.ballistic = 12);
        this.player.plan < 3 && (this.player.plan = 3);
        break
    }
  }

  //随着帧数变化  生成BOOS  型机器
  enemyBoos() {
    let enemy
    switch (plan) {
      case 1:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos1'),
          enemy.plans = enemy.plan = (100 + (plan * 100)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0,
          databus.enemys.push(enemy); break;
      case 2:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos2'),
          enemy.plans = enemy.plan = (200 + (plan * 110)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0, enemy.dec2 = 0
        databus.enemys.push(enemy); break;
      case 3:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos3'),
          enemy.plans = enemy.plan = (300 + (plan * 120)) * plans,         //血量
          enemy.init(2, em),       //速度 ，型号
          enemy.time = 600, enemy.i = 1, enemy.dec = true, enemy.dex = 0;
        databus.enemys.push(enemy); break;
      case 4:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos4'),
          enemy.plans = enemy.plan = (400 + (plan * 130)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0,
          databus.enemys.push(enemy); break;
      case 5:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos5'),
          enemy.plans = enemy.plan = (500 + (plan * 140)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0,
          databus.enemys.push(enemy); break;
      case 6:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos6'),
          enemy.plans = enemy.plan = (600 + (plan * 150)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0,
          databus.enemys.push(enemy); break;
      case 7:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos7'),
          enemy.plans = enemy.plan = (700 + (plan * 160)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0, enemy.dec2 = 0,
          databus.enemys.push(enemy); break;
      default:
        enemy = databus.pool.getItemByClass('enemy', Enemy, em = 'Boos8'),
          enemy.plans = enemy.plan = (800 + (plan * 170)) * plans,         //血量
          enemy.init(1, em),       //速度 ，型号
          enemy.time = 600, enemy.dec = 0, enemy.dec2 = 0,
          databus.enemys.push(enemy); break;
    }



  }

  
}