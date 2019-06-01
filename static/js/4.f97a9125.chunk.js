(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1405:function(e,t,i){"use strict";i.r(t);var s=i(1),a=i(2),n=i(4),r=i(3),h=i(5),c=i(0),l=i.n(c),o=i(41),d=i.n(o),u=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).call(this,"Boot"))}return Object(h.a)(t,e),Object(a.a)(t,[{key:"create",value:function(){var e=this.game.canvas.clientHeight;this.add.text(120,e/2-10,"Press Spacebar To Start"),this.input.manager.enabled=!0,this.cursors=this.input.keyboard.createCursorKeys()}},{key:"update",value:function(){this.cursors.space.isDown&&this.scene.start("Game")}}]),t}(d.a.Scene),p=new d.a.Class({Extends:d.a.Physics.Arcade.Sprite,initialize:function(e){d.a.Physics.Arcade.Sprite.call(this,e,0,0,"bullet"),this.speed=0,this.born=0},fire:function(e){var t=e.x,i=e.y,s=e.height;this.setPosition(t,i-s),this.speed=d.a.Math.GetSpeed(-1e3,1),this.born=0},update:function(e,t){this.y+=this.speed*t,this.born+=t,this.born>1e3&&(this.setActive(!1),this.setVisible(!1))}}),y=new d.a.Class({Extends:d.a.Physics.Arcade.Sprite,initialize:function(e){d.a.Physics.Arcade.Sprite.call(this,e,0,0,"enemyBullet"),this.speed=0,this.born=0},fire:function(e){var t=e.x,i=e.y;this.setPosition(t,i),this.speed=d.a.Math.GetSpeed(-300,1),this.born=0},update:function(e,t){this.y-=this.speed*t,this.born+=t,this.born>4e3&&(this.setActive(!1),this.setVisible(!1))}}),b=new d.a.Class({Extends:d.a.Physics.Arcade.Sprite,initialize:function(e,t,i,s,a,n){d.a.Physics.Arcade.Sprite.call(this,e,t,i,"invader"),this.direction=-20},die:function(){var e=this;this.anims.play("explode",!0),this.on("animationcomplete",function(){e.disableBody(!0,!0),e.scene.aliens.remove(e)},this)},preUpdate:function(e,t){this.anims.update(e,t),50===this.direction&&(this.direction=-50,this.y+=10),this.direction<0?(this.direction+=1,this.x-=2):this.direction>=0&&(this.direction+=1,this.x+=2)}}),v=new d.a.Class({Extends:d.a.Physics.Arcade.Sprite,initialize:function(e,t,i,s,a,n){d.a.Physics.Arcade.Sprite.call(this,e,t,i,"ship"),this.setPosition(200,250)},moveLeft:function(){this.body.velocity.x=-200},moveRight:function(){this.body.velocity.x=200},die:function(){var e=this;this.anims.play("explode",!0),this.on("animationcomplete",function(){e.disableBody(!0,!0),e.scene.game.scene.start("GameOver")},this)}}),f=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).call(this,{key:"Game"}))}return Object(h.a)(t,e),Object(a.a)(t,[{key:"preload",value:function(){this.load.image("sky","assets/invaders/starfield.png"),this.load.image("ship","assets/invaders/player.png"),this.load.image("bullet","assets/invaders/bullet.png"),this.load.image("enemyBullet","assets/invaders/enemy-bullet.png"),this.load.image("invader","assets/invaders/invader.png"),this.load.spritesheet("explode","assets/invaders/explode.png",{frameWidth:128,frameHeight:128})}},{key:"create",value:function(){this.sky=this.add.tileSprite(200,200,512,512,"sky"),this.anims.create({key:"explode",frames:this.anims.generateFrameNumbers("explode",{start:0,end:15}),frameRate:60}),this.score=0,this.scoreText=this.add.text(20,10,"Score: ".concat(this.score)),this.player=this.add.existing(new v(this,24,24)),this.physics.add.existing(this.player),this.player.setCollideWorldBounds(!0),this.bullets=this.physics.add.group({classType:p,runChildUpdate:!0}),this.alienBullets=this.physics.add.group({classType:y,runChildUpdate:!0}),this.gameOver=!1,this.bulletTime=0,this.lastFired=0,this.lastAlienFired=0,this.bullets.enableBody=!0,this.bullets.physicsBodyType=d.a.Physics.ARCADE,this.cursors=this.input.keyboard.createCursorKeys(),this.aliens=this.physics.add.group({allowGravity:!0}),this.alienCount=0;for(var e=1;e<4;e++)for(var t=0;t<10;t++)this.aliens.add(new b(this,48*t,30*e,100,100,.005),!0),this.alienCount+=1;this.physics.add.overlap(this.bullets,this.aliens,this.enemyHit,null,this),this.physics.add.overlap(this.alienBullets,this.player,this.playerHit,null,this),this.physics.add.overlap(this.aliens,this.player,this.collision,null,this)}},{key:"update",value:function(e){if(this.player.body.velocity.setTo(0,0),this.sky.tilePositionY+=1,!this.gameOver){if(this.cursors.left.isDown?this.player.moveLeft():this.cursors.right.isDown&&this.player.moveRight(),this.cursors.space.isDown&&e>this.lastFired){var t=this.bullets.get();t.setActive(!0),t.setVisible(!0),t&&(t.fire(this.player),this.lastFired=e+200)}0===this.alienCount&&this.scene.start("Post"),e>this.lastAlienFired+2e3&&(this.alienFire(),this.lastAlienFired=e+20)}}},{key:"alienFire",value:function(){var e=this.aliens.children.entries,t=e.length,i=Math.floor(Math.random()*(+t-0))+0,s=this.alienBullets.get();s.setActive(!0),s.setVisible(!0),s&&s.fire(e[i])}},{key:"playerHit",value:function(e,t){e.die(),t.destroy(!0,!0),this.gameOver=!0}},{key:"collision",value:function(e,t){e.die(),t.die()}},{key:"enemyHit",value:function(e,t){t.die(),e.destroy(!0,!0),this.alienCount-=1,this.score=this.score+100,this.scoreText.text="Score: ".concat(this.score)}}]),t}(d.a.Scene),m=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).call(this,"Post"))}return Object(h.a)(t,e),Object(a.a)(t,[{key:"create",value:function(){var e=this.game.canvas,t=e.clientWidth,i=e.clientHeight;this.add.text(t/2-40,i/2-10,"Winner!"),this.input.manager.enabled=!0,this.cursors=this.input.keyboard.createCursorKeys()}},{key:"update",value:function(e){this.cursors.space.isDown&&e>4e3&&this.cursors.space.isDown&&this.scene.start("Game")}}]),t}(d.a.Scene),g=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(r.a)(t).call(this,"GameOver"))}return Object(h.a)(t,e),Object(a.a)(t,[{key:"create",value:function(){var e=this.game.canvas,t=e.clientWidth,i=e.clientHeight;this.add.text(t/2-40,i/2-10,"Game Over!"),this.input.manager.enabled=!0,this.cursors=this.input.keyboard.createCursorKeys()}},{key:"update",value:function(e){this.cursors.space.isDown&&e>4e3&&this.scene.start("Game")}}]),t}(d.a.Scene),O={type:d.a.AUTO,parent:"phaser-container",width:460,height:307,physics:{default:"arcade"},scene:[u,f,m,g],extend:{player:null,cursors:null,bullets:null,lastFired:0,lastAlienFired:0,score:0}},k=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(n.a)(this,Object(r.a)(t).call(this))).game=null,e}return Object(h.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.game=new d.a.Game(O)}},{key:"componentWillUnmount",value:function(){this.game.destroy(!0)}},{key:"render",value:function(){return l.a.createElement("div",{className:"phaserContainer",id:"phaser-container"})}}]),t}(c.Component);t.default=k}}]);
//# sourceMappingURL=4.f97a9125.chunk.js.map