/**
 * 游戏基础的精灵类
 */

import DataBus   from '../databus'

let databus = new DataBus()
let planimg = Image()
planimg.src = 'images/enemyplan.png'


/**
 * 初始化元素集合，之后不在进行渲染
 */
let frames = []
for (let i = 0; i <= 70; i++) { frames[i] = 0}


//创建sprite  对象
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, imgSrc2 = '', x = 0, y = 0) {
    this.img = imgSrc
    frames[imgSrc] || this.framesImg(imgSrc)    //用来检测对象是否加载
    imgSrc2 && (this.img2 = imgSrc2, frames[imgSrc2] || this.framesImg(imgSrc2) )
    this.width  = width
    this.height = height
    this.x = x
    this.y = y

    this.visible = true

  } 


  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      frames[this.img],
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  drawToCanvas3(ctx) {
    if (!this.visible)
      return
    ctx.drawImage(
      frames[this.img],
      this.xl - 1, 0, this.wx, this.hx,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  
  //检测图片对象是否已经加载
  framesImg(i){
    if(frames[i]) return ;
    let img = new Image()
    switch (i) {
      case 0: img.src = 'images/bullet.png'; break;
      case 1: img.src = 'images/bullet-down.png'; break;
      case 2: img.src = 'images/blood.png'; break;
      case 3: img.src = 'images/speed.png'; break;
      case 4: img.src = 'images/curve.png'; break;
      case 5: img.src = 'images/missile.png'; break;
      case 6: img.src = 'images/trace.png'; break;
      case 7: img.src = 'images/laserup.png'; break;
      case 8: img.src = 'images/lash_up.png'; break;
      case 9: img.src = 'images/enemy1.png'; break;
      case 10: img.src = 'images/enemy2.png'; break;
      case 11: img.src = 'images/enemy3.png'; break;
      case 12: img.src = 'images/enemy4.png'; break;
      case 13: img.src = 'images/enemy5.png'; break;
      case 14: img.src = 'images/enemy6.png'; break;
      case 15: img.src = 'images/enemy6.png'; break;
      case 16: img.src = 'images/enemy0.png'; break;
      case 18: img.src = 'images/hero.png'; break;
      case 19: img.src = 'images/bullet.png'; break;
      case 20: img.src = 'images/bullet2.png'; break;
      case 21: img.src = 'images/shiled.png'; break;
      case 22: img.src = 'images/fill.png'; break;
      case 23: img.src = 'images/fill_zd.png'; break;
      case 24: img.src = 'images/fill_zd2.png'; break;
      case 25: img.src = 'images/fort.png'; break;
      case 26: img.src = 'images/fort_zd.png'; break;
      case 27: img.src = 'images/fort_zd2.png'; break;
      case 28: img.src = 'images/laser.png'; break;
      case 29: img.src = 'images/laserup0.png'; break;
      case 30: img.src = 'images/laserup1.png'; break;
      case 31: img.src = 'images/car_fire.png'; break;
      case 32: img.src = 'images/Boos1.png'; break;
      case 33: img.src = 'images/car_fire1.png'; break;
      case 34: img.src = 'images/Boos2.png'; break;
      case 35: img.src = 'images/Boos3.png'; break;
      case 36: img.src = 'images/Boos4.png'; break;
      case 37: img.src = 'images/Boos5.png'; break;
      case 38: img.src = 'images/Boos6.png'; break;
      case 39: img.src = 'images/Boos7.png'; break;
      case 40: img.src = 'images/Boos8.png'; break;
      case 41: img.src = 'images/car_fire2.png'; break;
      case 42: img.src = 'images/boos_up.png'; break;
      case 43: img.src = 'images/black.png'; break;
      case 44: img.src = 'images/stone.png'; break;
      case 45: img.src = 'images/stone2.png'; break;
      case 46: img.src = 'images/black_up.png'; break;
      case 47: img.src = 'images/laserup2.png'; break;
      case 48: img.src = 'images/laserup5.png'; break;
      case 49: img.src = 'images/missile2.png'; break;
      case 50: img.src = 'images/fire_up.png'; break;
      case 51: img.src = 'images/bt_ioc.png'; break;
      case 52: img.src = 'images/tunder.png'; break;
      case 53: img.src = 'images/benefit0.png'; break;
      case 54: img.src = 'images/benefit0_up.png'; break;
      case 55: img.src = 'images/gift.png'; break;
      case 56: img.src = 'images/benefit1.png'; break;
      case 57: img.src = 'images/benefit2.png'; break;
      case 58: img.src = 'images/benefit1_up.png'; break;
      case 59: img.src = 'images/benefit2_up.png'; break;
      case 60: img.src = 'images/benefit3_zuo.png'; break;
      case 61: img.src = 'images/benefit3_you.png'; break;
      case 62: img.src = 'images/benefit3_up.png'; break;
    }

    frames.splice(i, 1, img)
  }

  /**
   * 将精灵图绘制在canvas上
   */

  drawToCanvas2(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      frames[this.img2],
      this.x-1,
      this.y-1,
      this.width+2,
      this.height+2
    )   
  

  }

  drawToCanvas4(ctx) {


    ctx.drawImage(
      frames[this.img2],
      this.x - 4,
      this.y - 6,
      this.width + 8,
      this.height + 12
    )


  }

  drawplans(ctx,height,height2)
  {
    if (!this.visible)
      return

    ctx.drawImage(
      planimg,
      this.x - 7,
      this.y ,
      height2,
      6
    )   
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {

      if(this.height+40>sp.height)
      {
        let spX = sp.x + Math.ceil(sp.width / 2)
        let spY = sp.y + Math.ceil(sp.height / 2)

        if (!this.visible || !sp.visible) return false

        return !!(spX >= this.x
          && spX <= this.x + this.width
          && spY >= this.y
          && spY <= this.y + this.height) 
      }
      else 
      {
        let spX = this.x + Math.ceil(this.width / 2)
        let spY = this.y + Math.ceil(this.height / 2)

        if (!this.visible || !sp.visible) return false

        return !!(spX >= sp.x
          && spX <= sp.x + sp.width
          && spY >= sp.y
          && spY <= sp.y + sp.height) 
      }


  }
}
