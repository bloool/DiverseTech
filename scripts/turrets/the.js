const fragB1 = extend(BasicBulletType, {
  damage: 165,
  speed: 4.5,
  lifetime: 85,
  height: 23,
  width: 19,
  homingPower: 0.2,
  homingRange: 250,
  trailEffect: Fx.artilleryTrail,
  trailChance: 10,
  weaveScale: 3,
  weaveMag: 3,
  lightning: 3.5,
  lightningLenght: 10,
  shrinkY: 0
});

const  bullet1  = extend(BasicBulletType, {
  damage: 90,
  speed: 7,
  lifetime: 230,
  drag: 0.04,
  height: 18,
  width: 18,
  collidesGround: false,
  collides: false,
  collidesAir: false,
  weaveScale: 3,
  weaveMag: 3,
  lightning: 3,
  lightningLenght: 8,
  trailChance: 0,
  fragBullets: 2,
  fragCone: 360,
  shrinkY: 0,
  fragBullet: fragB1
});

const turret = extend(ItemTurret, "the", {
  shots: 4,
  range: 300,
  reloadTime: 140,
  shootShake: 5,
  recoilAmount: 1,
  shootCone: 360,
  spread: 90,
  shootLenght: 0,
  shootDuration: this.reloadTime,
  
  init(){
    this.ammo(
      Vars.content.getByName(ContentType.item, "diversetech-hyper-alloy"), bullet1
    );
    this.super$init();
  }
});

turret.buildType = () => extend(ItemTurret.ItemTurretBuild, turret, {
  updateTile(){
    this.super$updateTile();
    this.rotation = this.rotation + 3;
  },
  shoot(type){
    for(let i = 0; i < 4; i++){
      type.create(this, this.team, this.x, this.y, this.rotation + (i * 90));
    }
    this.effects();
    this.useAmmo();
  }
});
