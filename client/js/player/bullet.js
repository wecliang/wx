import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()
let enx, plx   //记录子弹和玩家初始x值


const bulles = {
  up_SRC : 0,
  red_SRC: 1,
  blood_SRC: 2,
  speed_SRC: 3,
  curve_SRC: 4,
  lock_SRC: 5,
  trace_SRC: 6,
  laserup_SRC : 7,
  skill0_SRC : 8,
  skill1_SRC : 33,
  boos_up : 42,
  black_up:46,
  laserup2 :47,
  laserup5 :48,
  black_up2:49,
  fire_up : 50,
  skill: 51,
  tunder: 52,
  benefit0_up:54,
  benefit1_up: 58,
  benefit2_up: 59,
  benefit3_up: 62,
  gift: 55,
}


function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Bullet extends Sprite {
  constructor(bt) {
    
    switch(bt)
    {       //  12 为宽  18为长度
      case 'up': super(databus.bulletimg, 12, 18, databus.bulletimg2);break
      case 'blood': super(bulles.blood_SRC, 40, 40); break
      case 'speed': super(bulles.speed_SRC, 40, 40); break
      case 'curve': super(bulles.curve_SRC, 40, 40); break
      case 'gift': super(bulles.gift, 40, 40); break
      case 'skill': super(bulles.skill, 40, 40); break
      case 'lock': super(bulles.lock_SRC,30, 50);break
      case 'trace': super(bulles.trace_SRC,16,24); break
      case 'laserup': super(bulles.laserup_SRC,30,60);break
      case 'skill0': super(bulles.skill0_SRC, 50, 100);break 
      case 'skill1': super(bulles.skill1_SRC, 100, 100); databus.skills.push(this);break 
      case 'boos_up': super(bulles.boos_up, 30, window.innerHeight-130); break 
      case 'black_up': super(bulles.black_up, 30, window.innerHeight - 190); break 
      case 'black_up2': super(bulles.black_up2, 30, 100); break 
      case 'laserup2': super(bulles.laserup2, 50, window.innerHeight - 100); break 
      case 'laserup5': super(bulles.laserup5, 40, 20); break 
      case 'fire_up': super(bulles.fire_up, 80, 20); break 
      case 'tunder': super(bulles.tunder, screenWidth, screenHeight); databus.skills.push(this); break 
      case 'benefit0_up': super(bulles.benefit0_up, 10, 50); break
      case 'benefit1_up': super(bulles.benefit1_up, 12, 12); break
      case 'benefit2_up': super(bulles.benefit2_up, 10, 30); break
      case 'benefit3_up': super(bulles.benefit3_up, 25, 60); break
      default: super(bulles.red_SRC, 20, 20);
      
    }

  }

  init(x, y, speed,bt) {
    this.x = x
    this.y = y
    this[__.speed] = speed
    this.bt=bt

    this.visible = true
  }

  // 每一帧更新子弹位置
  update(i) {
    switch(this.bt){
      case 'up' :
        this.y -= this[__.speed];
        switch (databus.index) {
          case  'fort':
            if (this.ms == 2 || this.ms == 4) {
              switch (this.i) {
                case 1: this.x += 1; break;
                case 2: this.x -= 1; break;
                case 3: this.x += 2; break;
                case 4: this.x -= 2; break;
              }
            }
            else {
              switch (this.i) {
                case 2: this.x += 1; break;
                case 3: this.x -= 1; break;
                case 4: this.x += 2; break;
                case 5: this.x -= 2; break;
              }
            };break;
          case 'laser' :
              this.y += databus.perlayyx
              this.x = databus.perlayx - this.width / 2
              break
        }; break



      case 'trace':
        let x 
        this.time++
        if(this.time<8)
        {
          this.i==0 ? this.x += 5 : this.x -= 5
        }
        else {
          databus.lock && 
          (x = Math.floor(Math.abs(this.x - databus.lockx) / (Math.abs(this.y - databus.locky) / 10)))
          if(databus.lock)
          {
            this.x > databus.lockx ? this.x -= x : this.x +=x
            this.y > databus.locky ? this.y -= 10 : this.y -= 10
          }else
          {
            this.y -= 15
          }
        }
        this.y < -this.height && databus.removeBullets(this, i)
        break
        case 'red' :
         switch(this.bt2)
         {
            case 'red':
              this.emx && (enx = this.x, plx = databus.perlayx , this.emx = 0)
              this.i == 1 && (enx > plx ? this.x -= 1 : this.x += 1, this.y += this[__.speed])
              this.i == 2 && (this.y += this[__.speed])
              this.i == 3 && (enx > plx ? this.x -= 2 : this.x += 2, this.y += this[__.speed])
              break
            case 'four':
              this.time++
              switch(this.i)
              {
                case 1: this.time % 2 == 0 && (this.x -= 1);
                        this.time % 4 == 0 && (this.x -= 1);
                        break
                case 2: this.time % 2 == 0 && (this.x -= 1);
                        break
                case 3: this.time % 4 == 0 && (this.x -= 1);
                        break
                case 5: this.time % 4 == 0 && (this.x += 1);
                        break
                case 6: this.time % 2 == 0 && (this.x += 1);
                        break
                case 7: this.time % 2 == 0 && (this.x += 1);
                        this.time % 4 == 0 && (this.x += 1);
                        break
              }
              this.y += this[__.speed]
              break
           case 'shot':
             this.time++
             switch (this.i) {
               case 1: this.time % 3 != 0 && (this.x -= 6); break
               case 2: this.time % 3 != 0 && (this.x -= 5); break
               case 3: this.time % 3 != 0 && (this.x -= 4); break
               case 4: this.time % 3 != 0 && (this.x -= 3); break
               case 5: this.time % 3 != 0 && (this.x -= 2); break
               case 6: this.time % 3 != 0 && (this.x -= 1); break
               case 8: this.time % 3 != 0 && (this.x += 1); break
               case 9: this.time % 3 != 0 && (this.x += 2); break
               case 10: this.time %3 != 0 && (this.x += 3); break
               case 11: this.time %3 != 0 && (this.x += 4); break
               case 12: this.time %3 != 0 && (this.x += 5); break
               case 13: this.time %3 != 0 && (this.x += 6); break
             }
             this.y += this[__.speed]
             break
            case 'six':
              this.time++
              switch (this.i) {
                case 1: this.time % 5 != 1 ? (this.y-- , this.x++) : this.x-- ; break
                case 2: this.time % 5 != 1 ? (this.y-- , this.x++) : this.y++ ; break
                case 3: this.x++;break
                case 4: this.time % 5 != 1 ? (this.y++ , this.x++) : this.y-- ; break
                case 5: this.time % 5 != 1 ? (this.y++ , this.x++) : this.x-- ; break
                case 6: this.y++;break
                case 7: this.time % 5 != 1 ? (this.y++ , this.x--) : this.x++ ; break
                case 8: this.time % 5 != 1 ? (this.y++ , this.x--) : this.y-- ; break
                case 9: this.x--; break
                case 10: this.time % 5 != 1 ? (this.y-- , this.x--) : this.y++; break
                case 11: this.time % 5 != 1 ? (this.y-- , this.x--) : this.x++; break
                case 12: this.y--; break
                case 13: this.time % 13 != 1 && (this.x++)
                         this.time % 13 % 3 == 0 && (this.y++); break 
                case 14: this.time % 13 != 1 && (this.y++)
                         this.time % 13 % 3 == 0 && (this.x++); break 
                case 15: this.time % 13 != 1 && (this.y++)
                         this.time % 13 % 3 == 0 && (this.x--); break 
                case 16: this.time % 13 != 1 && (this.x--)
                         this.time % 13 % 3 == 0 && (this.y++); break 
                case 17: this.time % 41 != 1 && (this.y++)
                         this.time % 41 % 5 == 0 && (this.x++); break
                case 18: this.time % 41 != 1 && (this.y++)
                         this.time % 41 % 5 == 0 && (this.x--); break
              }
              break
            default:
              this.y += this[__.speed]
         }break
      case 'laserup' :
          this.x += this.spenx
          this.y += this[__.speed]
          break
      case 'blood' :
      case 'speed' :
      case 'curve' :
      case 'skill':
      case 'gift':
        !this.time && this.y > screenHeight / 2 && (this[__.speed] = -this[__.speed])
        !this.time && this.x > screenWidth / 2 && (this.speedx = -this.speedx)
        this.time++
        if(this.time > 20 )
          {
          if (this.y > screenHeight - this.height || this.y < 0 ) 
              this[__.speed] = -this[__.speed]
          if( this.x > screenWidth - this.width || this.x < 0 ) 
              this.speedx = -this.speedx
          }
        this.y += this[__.speed]
        this.x += this.speedx
        if(this.time % 1200 == 0 || !this.visible)  databus.removeBullets(this, i)
        break
      case 'skill0':
        this.time++
        this.y -= this[__.speed]
        this.time%3==0 && this.xl==1? this.xl=51 : this.xl=1;
     //   this.time % 3 == 0 && (this.xl > 100?  this.xl = 1 : this.xl += 64)
        break;
      case 'skill1':
        this.time++
        this.xl > 300 ? this.xl = 1 : this.xl += 100
        this.y > screenHeight/2-100 && (this.y -= this[__.speed])
        this.time == 800 && (databus.bullets.splice(i, 1), this.visible=false)
        break;
      case 'boos_up':
        this.time++
        this.time%5==0 && (this.xl += 30)
        this.xl == 361 && databus.removeBullets(this, i);break
      case 'black_up':
        this.time++
        this.time % 4 == 0 && (this.xl += 40)
        this.xl ==241 && databus.removeBullets(this, i); break
      case 'laserup5':
        this.time++
        this.time % 6 == 0 && (this.xl += 30)
        this.height < window.innerHeight && (this.height += 12)
        this.xl == 511 && databus.removeBullets(this, i); break
      case 'laserup2':
        this.time++
        this.time == 80 && databus.removeBullets(this, i); break
      case 'fire_up':
        this.time++;
        this.time % 4 ==0 && (this.xl += 50); this.xl == 151 && (this.xl = 1)
        this.height < window.innerHeight-this.y && (this.height += 8)
        this.time == 180 && databus.removeBullets(this, i); break
      case 'tunder':
        this.time++;
        this.time % 3 == 0 && (this.xl == 151 ? this.xl = 1: this.xl = 151)
        this.time == 12 && (this.visible=false, databus.bullets.splice(i, 1)); break
      case 'benefit0_up':
        this.y -= this[__.speed]; break;
      case 'benefit2_up':
        this.y -= this[__.speed]; break;
      case 'benefit1_up':
        this.i == 1 && (this.x--); this.i == 3 && (this.x++)
        this.y -= this[__.speed]; break;
      case 'benefit3_up':
        if(this.width == 25)
        {
          this.xl == 10 ? this.xl = 32 : this.xl = 10
          this.y < databus.perlayy-80 && ( this.x += this.speedx )
        }else 
        {
          this.xl += 60
          this.xl == 720 && (this.visible = false, databus.bullets.splice(i, 1));
        }
        this.y -= this[__.speed]; break;
      default : 
        this.y += this[__.speed]
          break


    }

    this.y < -this.height-200 && databus.removeBullets(this, i)
    ||this.y > screenHeight + this.height && databus.removeBullets(this, i)
    ||this.x < -this.wight && databus.removeBullets(this, i)
    ||this.y > screenWidth + this.wight && databus.removeBullets(this, i)

    

  }
}
