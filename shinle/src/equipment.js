import * as THREE from 'three';
export function createEquipment({scene,box,cylinder,material,SITE_CONFIG,materials,highVoltageX,transformerX,lowVoltageX,firstBessX,bessStep,lastBessX,sceneCenterX}) {
  const {beige,concrete,trim,windowMat,dark,redWire,transformerBody,transformerDark,skyMetal,vent,cyan,accentYellow}=materials;
  const edge=(mesh,color=0x83949b,opacity=.3)=>{const outline=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color,transparent:true,opacity}));mesh.add(outline)};
const clickable=[],labels=[];
function registerHit(obj,name,description){obj.userData={name,description};clickable.push(obj)}
function cabinet(idx,x){
  // Preserve the existing cabinet geometry and materials.
  const g=new THREE.Group();g.position.set(x,SITE_CONFIG.foundationHeight+.01,0);
  g.rotation.y=SITE_CONFIG.cabinetRotationY;scene.add(g);
  const w=3.85,h=5.15,d=2.18;
  const main=box(w,h,d,white,0,h/2,0,g);edge(main,0x9daab1,.38);
  box(w+.05,.13,d+.05,dark,0,.07,0,g);
  box(.04,h-.15,d-.2,cyan,w/2+.01,h/2,0,g);
  box(.06,h-.2,d-.23,trim,-w/2-.03,h/2,0,g);
  // Door / front operation face: +X local, +Z world after -90 degree group rotation.
  box(.05,.68,.58,windowMat,w/2+.04,4.34,-.3,g);
  box(.07,.12,.72,dark,w/2+.065,3.54,-.35,g);
  box(.08,.99,1.52,vent,w/2+.07,.84,0,g);
  for(let j=0;j<12;j++)box(.085,.016,1.46,trim,w/2+.12,.39+j*.07,0,g);
  box(.06,.25,.21,accentYellow,w/2+.09,2.84,.55,g);
  box(.072,.16,.1,dark,w/2+.13,2.0,.69,g);
  box(.05,.13,.16,accentYellow,-.72,.84,d/2+.03,g);
  for(const xx of [-1.3,1.3]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.14,.038,8,22),skyMetal);
    ring.rotation.y=Math.PI/2;ring.position.set(xx,h+.17,0);ring.castShadow=true;g.add(ring);
  }
  const hit=box(w+.13,h+.1,d+.11,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,h/2,0,g,false);
  registerHit(hit,`BESS-${String(idx).padStart(2,'0')} · 儲能櫃`,'門板與操作面朝向案場展示正面，包含檢視窗、門把、百葉、警示標誌與吊環。');
  return g;
}
function label(str,pos,scale=4.2){const can=document.createElement('canvas');can.width=560;can.height=110;const c=can.getContext('2d');c.fillStyle='rgba(6,64,88,.9)';c.beginPath();c.roundRect(8,8,544,94,18);c.fill();c.fillStyle='#fff';c.font='bold 42px sans-serif';c.textAlign='center';c.fillText(str,280,71);const tex=new THREE.CanvasTexture(can);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));sprite.position.set(...pos);sprite.scale.set(scale,.82,1);sprite.visible=false;scene.add(sprite);labels.push(sprite)}
function hvPanel(x,z,title,desc){const g=new THREE.Group();g.position.set(x,SITE_CONFIG.foundationHeight,z);g.rotation.y=0; // 高低壓盤門面位於局部 -Z：保持不旋轉，對齊變壓器旋轉後的世界 -Z 正面
scene.add(g);const w=4.65,h=5.15,d=4.25;const body=box(w,h,d,beige,0,h/2,0,g);edge(body,0x9fa4a1,.28);box(w+.22,.42,d+.28,concrete,0,h+.1,0,g);box(w+.12,.09,d+.14,trim,0,.05,0,g);box(.08,1.2,.8,windowMat,.2,3.65,-d/2+.06,g);box(.1,.16,1.8,dark,0,3.0,-d/2+.08,g);box(.09,.45,.11,trim,-w/2+.24,1.85,-d/2+.1,g);box(.09,.45,.11,trim,w/2-.24,1.85,-d/2+.1,g);for(const yy of [1.5,2.2,2.9]) box(.05,.04,1.4,redWire,-.7,yy,-d/2+.08,g,false);box(.05,1.6,.05,redWire,-1.3,1.75,-d/2+.08,g,false);box(.92,.26,.12,material(0xffffff),-.25,2.35,-d/2+.09,g,false);const hit=box(w+.15,h+.18,d+.16,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,h/2,0,g,false);registerHit(hit,title,desc);return g}
function transformer(x){const g=new THREE.Group();g.position.set(x,.55,0);g.rotation.y=Math.PI;scene.add(g);box(5.2,3.25,3.8,transformerBody,0,2.2,0,g);box(6.0,.38,4.35,transformerDark,0,4.35,0,g);for(let i=-2;i<=2;i++)box(.24,2.6,3.2,transformerDark,i*.75,2.05,0,g);for(let i=0;i<3;i++){const fan=cylinder(.52,.52,.16,26,material(0x6f888b,.2,.6),-2.75,1.6+i*.85,1.2,g,0,Math.PI/2);for(let a=0;a<5;a++){const blade=box(.85,.03,.16,material(0x93a9ab),0,0,0,fan,false);blade.rotation.z=a*1.2566+.35}const fan2=cylinder(.52,.52,.16,26,material(0x6f888b,.2,.6),2.75,1.6+i*.85,1.2,g,0,Math.PI/2);for(let a=0;a<5;a++){const blade=box(.85,.03,.16,material(0x93a9ab),0,0,0,fan2,false);blade.rotation.z=a*1.2566+.35}}
for(let n=0;n<3;n++){cylinder(.22,.22,1.2,16,transformerDark,-1.4+n*1.4,4.95,-.2,g);cylinder(.08,.08,1.0,12,accentYellow,-1.35+n*1.4,5.72,-.2,g)}box(1.9,1.45,1.55,transformerBody,0,1.25,2.05,g);box(1.6,.95,.22,windowMat,0,1.3,2.9,g);const hit=box(6.5,6.5,5.2,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,3.0,0,g,false);registerHit(hit,'變壓器','油浸式變壓器外觀示意，依附件照片加入主體、散熱片、上蓋與兩側散熱風扇，用於連接前段盤體與後段儲能櫃系統。');return g}
  return {clickable,labels};
}

