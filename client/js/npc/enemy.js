import Animation from '../base/animation'
import DataBus   from '../databus'
import Bullet from '../player/bullet'

const enems = {
    one_SRC :9,    too_SRC: 10,    three_SRC: 11,    four_SRC: 12,    five_SRC: 13,    six_SRC: 14,
    seven_SRC:15,    zeio_SRC: 16,    Boos1 : 32,   Boos2 :34,  Boos3: 35,   Boos4: 36,
    Boos5: 37,  Boos6: 38,  Boos7: 39,  Boos8: 40,  black: 43 ,stone: 44 , stone2: 45 , missle2: 49,
    benefit0: 53, benefit1 : 56 , benefit2 : 57 ,benefit3_zuo : 60 , benefit3_you: 61,
    }
const __ = {
  speed: Symbol('speed')
}


let databus = new DataBus()
let x=0

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor(em) {
    switch(em)
      {
      case 'one': super(enems.one_SRC, 50, 50); break;
      case 'too': super(enems.too_SRC, 60, 60); break;
      case 'three': super(enems.three_SRC, 80, 80); break;
      case 'zeio': super(enems.zeio_SRC, 70, 70); break;
      case 'four': super(enems.four_SRC, 100, 80); break;
      case 'five': super(enems.five_SRC, 60, 50); break;
      case 'six': super(enems.six_SRC, 40, 40); break;
      case 'Boos1': super(enems.Boos1, 100, 120); break;
      case 'Boos2': super(enems.Boos2, 110, 110); break;
      case 'Boos3': super(enems.Boos3, 120, 120); break;
      case 'Boos4': super(enems.Boos4, 130, 130); break;
      case 'Boos5': super(enems.Boos5, 140, 140); break;
      case 'Boos6': super(enems.Boos6, 150, 150); break;
      case 'Boos7': super(enems.Boos7, 160, 160); break;
      case 'Boos8': super(enems.Boos8, 170, 170); break;
      case 'black': super(enems.black, 200, 70);  break;
      case 'stone': super(enems.stone, 78, 52); break;
      case 'stone2': super(enems.stone2, 78, 52); break;
      case 'missle2': super(enems.missle2, 20, 50); break;
      case 'benefit0': super(enems.benefit0, 20, 30); break;
      case 'benefit1': super(enems.benefit1, 20, 30); break;
      case 'benefit2': super(enems.benefit2, 20, 30); break;
      case 'benefit3_zuo': super(enems.benefit3_zuo, 30, 45); break;
      case 'benefit3_you': super(enems.benefit3_you, 30, 45); break;
      default: super(enems.one_SRC, 40, 40); break;
      }

  }
  /**
   * 
   * 
   * 敌机信息
   * 
   */

  init(speed,em) {
    this.x = rnd(0, window.innerWidth-this.width)
    this.y = -this.height
    this.em=em
    this[__.speed]=speed
    this.visible = true
  } 



  // 每一帧更新敌机位置
  update(item,i) {
    item.lock && !item.visible && ( databus.lock = false ,item.lock = false )
    item.lock && item.y > window.innerHeight && (databus.lock = false, item.lock = false)

    switch(item.em)
    {
      case 'zeio':
        if (!item.visible && item.decide) {
          item.decide = false
          let s = rnd(1,42);
          switch(s%11)
          {
            case 0:
            case 1: this.shoot('skill', 101); break; //增加技能齿轮 
            case 2: this.shoot('skill', 1); break; //增加技能穿梭弹
            case 3: this.shoot('skill', 201); break; //增加技能闪电
            case 4: 
            case 5: 
            case 6: this.shoot('speed'); break;  //增加子弹射速
            case 7: this.shoot('blood'); break;  //增加血量
            default: this.shoot('curve')      //增加弹道
          }
        }else 
        { databus.aim && !databus.lock && item.visible && (item.lock = true, databus.lock = true) }
        //当此类战机出现时，自动锁定
        item.y += this[__.speed] ; break

      case 'three' :
        item.time++
        if (item.y < 50) item.y += item[__.speed]
        databus.aim && !databus.lock && item.visible && (item.lock = true, databus.lock = true)
        item.visible || databus.removeEnemey(item, i) 
        item.time % 180 == 0 && this.shoot(item.em)
        break

      case 'four':
        item.time++
        item.y < 30 && ( item.y += item[__.speed] )
        databus.aim && !databus.lock && item.visible &&(item.lock = true, databus.lock = true)
        item.time % 200 == 0 && (x = databus.perlayx)
        item.x > x ? item.x -= 1 : item.x += 1
        item.x > x ? item.x -= 1 : item.x += 1
        item.visible || databus.removeEnemey(item, i)
        item.time % 326 == 0 && this.shoot(item.em)
        ||item.time % 215 == 0 && this.shoot('laserup')
        break
      case 'five':
        item.time++
        item.x < item.width && (item.spenx = -item.spenx, item.x += item.spenx) || 
        item.x > window.innerWidth - item.width && (item.spenx = -item.spenx, item.x += item.spenx)
        databus.aim && !databus.lock && item.visible && (item.lock = true, databus.lock = true)
        item.x += item.spenx
        item.time % 2 == 0 && (item.x += item.spenx)
        item.y += this[__.speed]
        item.visible || databus.removeEnemey(item, i)
        item.time % 3 == 0 && (item.y += this[__.speed])
        item.time % 139 == 0 && this.shoot('five')
        break
      case 'six':
        item.y > window.innerHeight / 2 - 200 ? item.time++ : item.y += 4
        item.time%3 == 0 && (item.width +=1 , item.height +=1)
        item.y++
        item.visible ||
          (item.shoot('three'), item.playAnimation(), databus.removeEnemey(item, i))
        item.time % 180 == 0 && 
          (databus.lock=false ,item.shoot('six'), item.playAnimation(), databus.removeEnemey(item, i))
        break
      case 'black':
        item.time++; 
        item.x < 10 && item.time %3 == 0 && (item.x += 1)
        item.x > window.innerWidth - item.width - 10 && item.time % 3 == 0 && (item.x -= 1)
        item.time<1150 && item.time % 59==0 && this.shoot('black_up',rnd(item.x,item.x+item.width-20))
        item.time < 1150 && item.time % 67 == 0 && this.shoot('black_up', rnd(item.x, item.x + item.width - 30))
        item.time == 1200 && ( databus.removeEnemey(item, i))
        break
      case 'stone':
        item.time++ ; 
        item.x < item.dx && (item.x += Math.floor((item.dx + item.width)/100))
        item.time % 8 == 1 && (item[__.speed]-- ); item.y -= item[__.speed]
        item.plan < Math.floor(item.pls / 1.3) && (item.xl = 101)
        item.plan < Math.floor(item.pls / 2) && (item.xl = 201)
        item.plan < Math.floor(item.pls / 4) && (item.xl = 301)
        item.visible ||( Math.abs(item[__.speed]) ? item[__.speed] = 1 : item[__.speed] = Math.abs(item[__.speed]))
        item.visible ||
          (item.shoot('three'), item.playAnimation(), databus.removeEnemey(item, i))
        break
      case 'stone2':
        item.time++;
        item.x > item.dx && (item.x -= Math.floor((window.innerWidth - item.dx) / 100))
        item.time % 8 == 1 && (item[__.speed]--); item.y -= item[__.speed]
        item.plan < Math.floor(item.pls / 1.3) && (item.xl = 201)
        item.plan < Math.floor(item.pls / 2) && (item.xl = 101)
        item.plan < Math.floor(item.pls / 4) && (item.xl = 1)
        item.visible || (Math.abs(item[__.speed]) ? item[__.speed] = 1 : item[__.speed] = Math.abs(item[__.speed]))
        item.visible ||
          (item.shoot('three'), item.playAnimation(), databus.removeEnemey(item, i))
        break
      case 'missle2':
        item.time++; item.time == 70 &&
          (item.width = 100, item.playAnimation(), this.shoot('six', rnd(12, 19)), databus.enemys.splice(i, 1)
          , item.lock && (item.lock = false, databus.lock = false))
        item.y += this[__.speed]; break;
      case 'Boos1':
        this.BossUpdate(item, i);
        if(item.y == 20 )
        { item.y = 120; item.time % 59 == 0 &&(item.dec = item.time+10 )
          item.time + 5 == item.dec && this.BoosEnemy(item,7);
          item.dec < item.time &&( item.x > x ? item.x -= 1 : item.x += 1 )
          item.x == 0 && (x = window.innerWidth-item.width)
          item.x == window.innerWidth - item.width && (x = 0); item.y = 20
        }; break;
      case 'Boos2':
        this.BossUpdate(item, i);
        if (item.y == 20) {
          item.y = 100
          item.dec < item.time;item.time % 131 == 0 && (item.dec2 = item.time + 40)
          item.dec2 < item.time;item.time % 168 == 0 && (item.dec = item.time + 27)
          item.time % 278 == 0 &&
          (this.shoot('laserup'), item.x -= 40, this.shoot('laserup'), item.x += 80, this.shoot('laserup'),item.x -= 40)
          item[__.speed] = 5; item.dec > item.time && item.time % 7 == 0 &&
            (this.shoot('redx', item.x), this.shoot('redx', item.x+item.width-20))
          item[__.speed] = 3; item.dec2 > item.time && item.time % 10 == 0 &&
            (this.shoot('shot', 5), this.shoot('shot', 7), this.shoot('shot', 9))
           item.x+60 > databus.perlayx ? item.x -= 1 : item.x += 1; item.y = 20
        }; break;
      case 'Boos3':
        this.BossUpdate(item, i);
        if (item.y == 20) {
          item.y = 120
          item.i >= 13 && (item.dec = false); item.i <= 1 && (item.dec = true)
          item.time % 4 == 0 && (this.shoot('shot', item.i), item.dec ? item.i++ : item.i--)
          item.time % 100 == 0 && (x = rnd(0, window.innerWidth - item.width))
          item.x > x ? item.x -= 1 : item.x += 1;
          this.BoosEnemy(item, 9); item.y = 20
          item.time % 360 == 0 && (item.dex = item.time+ 60)
        }; break;
      case 'Boos4':
        this.BossUpdate(item, i);
        if (item.y == 20) {
          item.y = 120
          item.time % 359 == 0 && (item.dec = item.time+100)
          item.time+40 == item.dec && 
            (this.shoot('boos_up'),item.x -= 40, this.shoot('boos_up'),item.x += 80,this.shoot('boos_up'),item.x -= 40)
          item.time % 179 == 0 && this.shoot('four'); item.time % 222 == 0 && this.shoot('three'); 
          item.time % 234 == 0 && this.shoot('five')
          item.dec < item.time && (item.x+70 > databus.perlayx ? item.x -= 1 : item.x += 1);
          this.BoosEnemy(item, 9); item.y = 20
        }else if(item.y == 100)
        {
          databus.getplaykg('laser_dec') ||( databus.indexdec = 'laser')
        }; break;
      case 'Boos5':
        this.BossUpdate(item, i);
        if(item.y == 20){ item.y=100;
          item.time % 100 == 0 && (x = rnd(0, window.innerWidth - item.width))
          item.x > x ? item.x -= 1 : item.x += 1;
          item.time % 278 == 0 &&
          (item.x -= 50, this.shoot('laserup'), item.x += 100, this.shoot('laserup'), item.x -=50)
          item.time%178 == 0 && (item.dec = item.time+30)
          item[__.speed] = 5; item.dec > item.time && item.time % 4 == 0 &&
            (this.shoot('redx', item.x+10), this.shoot('redx', item.x + item.width - 30))
          item.time % 212 == 0 && 
            (this.shoot('three'),item.x -= 40 ,this.shoot('three'),item.x+= 80,this.shoot('three'),item.x -= 40 )
          this.BoosEnemy(item, 8); item.y = 20;
        };break
      case 'Boos6': 
        this.BossUpdate(item, i);
        if(item.y == 20)
        { item.y = 120;
          item.time % 300 == 0 && (item.dec = item.time+90,this.shoot('laserup5'))
          item.time % 100 == 0 && (x = rnd(0, window.innerWidth - item.width))
          item.dec < item.time && (item.x > x ? item.x -= 1 : item.x += 1); 
          this.BoosEnemy(item, 8); item.y = 20;
        }; break;
      case 'Boos7':
        this.BossUpdate(item, i);
        if (item.y == 20) {
        item.y = 120;
          item.time % 300 == 0 && (item.dec = item.time + 90, this.shoot('laserup2'))
          item.time % 369 == 0 && (item.dec2 = item.time + 90, 
              item.x += 50,this.shoot('laserup5'),item.x -=100,this.shoot('laserup5'),item.x += 50)
          item.time % 100 == 0 && (x = rnd(0, window.innerWidth - item.width))
          item.dec < item.time && item.dec2 < item.time && (item.x > x ? item.x -= 1 : item.x += 1);
          this.BoosEnemy(item, 8); item.y = 20;
        }; break;
      case 'Boos8':
        this.BossUpdate(item,i);
        if (item.y == 20) {
          item.y = 120;
          item.time % 560 == 0 && (item.dec = item.time + 180, this.shoot('fire_up'))
          item.time % 369 == 0 && (item.dec2 = item.time + 90,
            item.x += 50, this.shoot('laserup5'), item.x -= 100, this.shoot('laserup5'), item.x += 50)
          item.time % 100 == 0 && (x = rnd(0, window.innerWidth - item.width))
          item.dec < item.time && item.dec2 < item.time && (item.x > x ? item.x -= 1 : item.x += 1);
          item.time % 243 == 0 && this.shoot('four');
          this.BoosEnemy(item, 8); item.y = 20;
        }; break;
      case 'benefit0':
        item.y = databus.perlayy+15;
        item.wz ? item.x = databus.perlayx+30 : item.x = databus.perlayx-50;
        databus.frame % 30 == 0 && this.shoot('benefit0_up'); break;
      case 'benefit1':
        item.y = databus.perlayy + 15;
        item.wz ? item.x = databus.perlayx + 30 : item.x = databus.perlayx - 50;
        databus.frame % 30 == 0 && this.shoot('benefit1_up'); break;
      case 'benefit2':
        item.y = databus.perlayy + 15;
        item.wz ? item.x = databus.perlayx + 30 : item.x = databus.perlayx - 50;
        databus.frame % 10 == 0 && this.shoot('benefit2_up'); break;
      case 'benefit3_zuo': case 'benefit3_you':
        databus.frame % 40 == 0 && this.shoot('benefit3_up'); 
        item.y = databus.perlayy + 10; break
      default:
        item.y += this[__.speed]
      }
    item.y > window.innerHeight + this.height && databus.removeEnemey(item, i)
    item.lock && databus.lock && (databus.lockx = this.x + this.width / 2 - 25,
     databus.locky = this.y + this.height / 2 - 25)
  }

//调用Boos  复写方法
  BossUpdate(item,i)
  {
    item.time++; item.y < 20 && (item.plan = item.plans,x=0)
    item.time > 800 && item.y < 20 && (item.y += this[__.speed])
    item.visible || (item.y += 1); item.y == 21 && rnd(7,10)==8 &&  this.shoot('gift');
    item.y > 300 && (databus.frame -= item.time-800, databus.enemys.splice(i, 1),databus.boos = true)
  }
// Boos 小兵生成元素
  BoosEnemy(item,m)
  {
    switch(m)
    {
      case 7:
          {
          let enemy = databus.pool.getItemByClass('enemy', Enemy, 'missle2');
          enemy.init(3, 'missle2'); enemy.x = item.x+ item.width/2 - enemy.width/2;
          enemy.y = item.y-20; enemy.time = rnd(0,50);
          databus.enemys.push(enemy);
          }
          break;
      case 8:
        if (item.time % 1405 == 0) {
          let enemy = databus.pool.getItemByClass('enemy', Enemy, 'black');
          enemy.init(2, 'black'); enemy.y = 150; enemy.time = 1; enemy.bg = true;
          enemy.x > (window.innerWidth - enemy.width) / 2 ? enemy.x = window.innerWidth : enemy.x = -enemy.width;
          databus.enemys.push(enemy);
        }
      case 9:
        if (item.time % 167 == 0) {
          let enemy = databus.pool.getItemByClass('enemy', Enemy, 'stone');
          enemy.pls = enemy.plan = 40;
          enemy.init(12, 'stone'); enemy.time = 0; enemy.xl = 1; enemy.wx = 100, enemy.hx = 100;
          enemy.dx = rnd(window.innerWidth / 2, window.innerWidth - item.width)
          enemy.x = -enemy.width; enemy.y = 500;
          databus.enemys.push(enemy)
        }
        if (item.time % 196 == 0) {
          let enemy = databus.pool.getItemByClass('enemy', Enemy, 'stone2');
          enemy.pls = enemy.plan = 40;
          enemy.init(12, 'stone2'); enemy.time = 0; enemy.xl = 301; enemy.wx = 100, enemy.hx = 100;
          enemy.dx = rnd(0, window.innerWidth / 2)
          enemy.x = window.innerWidth; enemy.y = 500;
          databus.enemys.push(enemy)
        }
    }
  }



/**
 * 将敌机子弹写入到子弹类中
 */
  shoot(em,m=12) {
    switch(em)
    {
        case 'skill':
        { 
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          const x = this.x + this.width / 2 - bullet.width / 2
          bullet.time = 0
          bullet.speedx = this[__.speed] - 1
          bullet.init(
            x,
            this.y,
            this[__.speed],
            em
          )
          bullet.xl = m; bullet.wx = 50 ; bullet.hx = 50;
          databus.bullets.push(bullet)
        }; break
        case 'three':
          for (var i = 1; i <= 3; i++){
          const bullet = databus.pool.getItemByClass('bullet', Bullet,'red')
          bullet.emx=1
          bullet.i=i
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y + 10,
            this[__.speed] + 2,
            'red'
          );
          bullet.bt2 = 'red'
          databus.bullets.push(bullet)
          } ; break

        case 'four' :
        for (var i = 1; i <= 7; i++) {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, 'red')
            bullet.i = i
            let x = this.x + this.width / 2 - bullet.width / 2
            bullet.init(
              x,
              this.y + 10,
              this[__.speed]+1,
              'red'
            );
            bullet.bt2 = em
            bullet.time = 0
            databus.bullets.push(bullet)
          };break

        case 'laserup' :
          {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
            let x = this.x + this.width / 2 - bullet.width / 2
            bullet.init(
              x,
              this.y + 10,
              this[__.speed] + 4,
              em
            );
            databus.perlayx > this.x ? bullet.spenx = 1 : bullet.spenx = -1
            databus.bullets.push(bullet)
          }
            break
        case 'laserup5':
          {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
            let x = this.x + this.width / 2 - bullet.width / 2
            bullet.init(
              x,
              this.y + 10,
              this[__.speed],
              em
            ); bullet.height = 20
            bullet.time = 0; bullet.xl = 1; bullet.wx = 30; bullet.hx = 200;
            databus.bullets.push(bullet)
          }; break
        case 'five':
          for (var i = 1; i <= 2; i++) {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, 'red')
            let x = this.x + this.width / 2 - bullet.width / 2
            i == 1 ? x -=20 : x += 20
            bullet.init(
              x,
              this.y + 10,
              this[__.speed] + 4,
              'red'
            );
            bullet.bt2 = em
            databus.bullets.push(bullet)
          }; break

        case 'six':
        for (var i = 1; i <= m; i++) {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, 'red')
          let x = this.x + this.width / 2 - bullet.width / 2
          let y = this.y + Math.floor(this.height/2)
          bullet.init(
            x,
            y,
            this[__.speed] + 4,
            'red'
          );
          bullet.bt2 = em
          bullet.i = i
          bullet.time = 0
          databus.bullets.push(bullet)
          }; break
        case 'shot':
          {const bullet = databus.pool.getItemByClass('bullet', Bullet, 'red')
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y + 10,
            this[__.speed],
            'red'
          );
          bullet.bt2 = em
          bullet.i = m
          bullet.time = 0
          databus.bullets.push(bullet)
        }; break;
        case 'redx':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, 'red')
          bullet.init(
            m,
            this.y + 10,
            this[__.speed],
            'red'
          );
          bullet.bt2 = em
          databus.bullets.push(bullet)
        }; break;
        case 'boos_up':
          {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
            let x = this.x + this.width / 2 - bullet.width / 2
            bullet.init(
              x,
              this.y + 10,
              this[__.speed],
              em
            );
            bullet.time = 0;bullet.xl = 1;bullet.wx = 30; bullet.hx = 240;
            databus.bullets.push(bullet)
          } ;break;
        case 'black_up':
          {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
            bullet.init(
              m,
              this.y + 40,
              this[__.speed],
              em
            );
            bullet.time = 0; bullet.xl = 1; bullet.wx = 40; bullet.hx = 300;
            databus.bullets.push(bullet)
          }; break;
      case 'black_up2':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          bullet.init(
            m,
            this.y + 30,
            this[__.speed],
            em
          );
          bullet.time = 0; bullet.xl = 1; bullet.wx = 20; bullet.hx = 150;
          databus.bullets.push(bullet)
        }; break;
      case 'fire_up':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y + 30,
            this[__.speed],
            em
          );bullet.height = 20
          bullet.time = 0; bullet.xl = 1; bullet.wx = 50; bullet.hx = 300;
          databus.bullets.push(bullet)
        }; break;
      case 'benefit0_up':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y - 10,
            this[__.speed],
            em
          )
          bullet.wx = 50 ; bullet.fire = 2;
          databus.bullets.push(bullet)
        }; break;
      case 'benefit1_up':
        {
          for(let i=1; i <= 3 ; i++)
          {
            const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
            let x = this.x + this.width / 2 - bullet.width / 2
            bullet.init(
              x,
              this.y - 10,
              this[__.speed],
              em
            )
            bullet.fire = 3; bullet.i = i
            databus.bullets.push(bullet)
          }
        }; break;
      case 'benefit2_up':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y - 20,
            this[__.speed]+4,
            em
          )
          bullet.fire = 3;
          databus.bullets.push(bullet)
        }; break;
      case 'benefit3_up':
        {
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          let x = this.x + this.width / 2 - bullet.width / 2
          bullet.init(
            x,
            this.y - 20,
            this[__.speed],
            em
          )
          bullet.width = 25;bullet.fire = 3; bullet.height = 60
          bullet.xl = 10; bullet.hx = 60; bullet.wx = 22;
          this.x ? bullet.speedx = -2 : bullet.speedx = 2
          databus.bullets.push(bullet)
        }; break;
        default :
          const bullet = databus.pool.getItemByClass('bullet', Bullet, em)
          const x = this.x + this.width / 2 - bullet.width / 2
          bullet.time=0
          bullet.speedx=2
          bullet.init(
            x,
            this.y,
            3,
            em
          )
          databus.bullets.push(bullet)
        
    }
  }



}
