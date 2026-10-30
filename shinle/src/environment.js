import * as THREE from 'three';
export function createEnvironment({scene,box,material,SITE_CONFIG,sceneCenterX,lastBessX,highVoltageX,materials}) {
  const {concrete,grass,soil,gravel,curb,trim}=materials;
  const edge=(mesh,color=0x83949b,opacity=.3)=>{const outline=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color,transparent:true,opacity}));mesh.add(outline)};
box(220,.16,120,soil,sceneCenterX,-.32,0);box(112,.13,30,concrete,sceneCenterX,-.14,0);const plinth=box(lastBessX + SITE_CONFIG.cabinetEnvelopeWidth/2 - (highVoltageX - SITE_CONFIG.highVoltageWidth/2) + 1.8,SITE_CONFIG.foundationHeight,8.3,concrete,sceneCenterX,SITE_CONFIG.foundationHeight/2,0);edge(plinth);box(114,.06,34,gravel,sceneCenterX,-.06,0,scene,false);box(114,.02,4,curb,sceneCenterX,.02,11.9,scene,false);box(114,.02,4,curb,sceneCenterX,.02,-11.9,scene,false);box(114,.03,.3,trim,sceneCenterX,.03,14.05,scene,false);box(114,.03,.3,trim,sceneCenterX,.03,-14.05,scene,false);
for(let x=-10;x<96;x+=7.5){box(.04,.02,30,trim,x,-.05,0,scene,false)}
for(let z of [-7.5,-3.75,0,3.75,7.5]){box(112,.01,.03,trim,sceneCenterX,-.05,z,scene,false)}
// Grass strip and trench covers
box(110,.05,10,grass,48,-.08,18);box(16,.04,2.2,grass,93,-.07,-18);for(let i=0;i<3;i++){box(2.2,.04,1.5,trim,82+i*8,-.045,18.6,scene,false)}
// Background mountains and tree line
const mountainGeo=new THREE.BufferGeometry();const mVerts=new Float32Array([-140,0,-55,-90,12,-60,-42,1,-54,-12,14,-58,22,3,-56,56,18,-54,94,4,-58,126,16,-60,160,0,-56,-140,-18,-55,160,-18,-55]);mountainGeo.setAttribute('position',new THREE.BufferAttribute(mVerts,3));mountainGeo.computeVertexNormals();const mountain=new THREE.Mesh(mountainGeo,new THREE.MeshStandardMaterial({color:0x89a1bb,roughness:1,metalness:0,side:THREE.DoubleSide,transparent:true,opacity:.82}));mountain.position.set(18,1,-40);scene.add(mountain);
let seed=3031;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}const trunk=material(0x73654c),leaf=[material(0x58774c),material(0x4a6c45),material(0x71915e),material(0x2f5935)];function tree(x,z,s){const tg=new THREE.Group();tg.position.set(x,0,z);scene.add(tg);const t=new THREE.Mesh(new THREE.CylinderGeometry(.15*s,.24*s,3.2*s,7),trunk);t.position.y=1.7*s;t.castShadow=true;tg.add(t);for(let j=0;j<6;j++){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry((1.15+rnd()*.6)*s,1),leaf[Math.floor(rnd()*leaf.length)]);crown.position.set((rnd()-.5)*2*s,(3.2+rnd()*1.4)*s,(rnd()-.5)*1.6*s);crown.castShadow=true;tg.add(crown)}}
for(let i=0;i<18;i++)tree(-18+rnd()*135,-25-rnd()*12,.7+rnd()*.9);for(let i=0;i<140;i++){const bush=new THREE.Mesh(new THREE.IcosahedronGeometry(.15+rnd()*.28,0),leaf[Math.floor(rnd()*leaf.length)]);bush.position.set(-24+rnd()*140,0,24+rnd()*10);bush.scale.y=.65+rnd()*.55;scene.add(bush)}
}

