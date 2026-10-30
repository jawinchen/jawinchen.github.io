import * as THREE from 'three';
export function createEquipment(scene,box,materials){
 const {white,gray,dark,teal,gold}=materials; const picks=[],tags=[];
 const makeCab=(row,i,x,z,rot)=>{const g=new THREE.Group();g.position.set(x,1.04,z);g.rotation.y=rot;scene.add(g);const w=3.85,h=5.15,d=2.18;
  box(w,h,d,white,0,h/2,0,g);box(w+.05,.13,d+.05,dark,0,.07,0,g);box(.04,h-.15,d-.2,teal,w/2+.01,h/2,0,g);box(.06,h-.2,d-.23,gray,-w/2-.03,h/2,0,g);box(.05,.68,.58,gray,w/2+.04,4.34,-.3,g);box(.07,.12,.72,dark,w/2+.065,3.54,-.35,g);box(.08,.99,1.52,gray,w/2+.07,.84,0,g);for(let j=0;j<12;j++)box(.085,.016,1.46,dark,w/2+.12,.39+j*.07,0,g);box(.06,.25,.21,gold,w/2+.09,2.84,.55,g);box(.05,.13,.16,gold,-.72,.84,d/2+.03,g);
  for(const xx of [-1.3,1.3]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.14,.038,8,22),gray);ring.rotation.y=Math.PI/2;ring.position.set(xx,h+.17,0);g.add(ring)}
  const hit=box(w+.09,h+.06,d+.09,new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,h/2,0,g);hit.userData.name=row+'第 '+(i+1)+' 櫃';picks.push(hit);
  const cv=document.createElement('canvas');cv.width=280;cv.height=85;const ctx=cv.getContext('2d');ctx.fillStyle='#084c61';ctx.fillRect(0,0,280,85);ctx.fillStyle='white';ctx.font='bold 32px sans-serif';ctx.textAlign='center';ctx.fillText(row+' '+(i+1),140,55);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(cv),depthTest:false}));sp.position.set(x,7.1,z);sp.scale.set(2.25,.68,1);sp.visible=false;scene.add(sp);tags.push(sp);
 };
 for(let i=0;i<5;i++){const z=(i-2)*2.21;makeCab('A列',i,-4,z,Math.PI);makeCab('B列',i,4,z,0)}
 return {picks,tags};
}
