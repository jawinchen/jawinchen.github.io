import * as THREE from 'three';
import {REF_IMAGES,REF_TITLES} from './reference-data.js';
export function bindControls({camera,controls,renderer,clickable,labels,sceneCenterX}) {
const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2(),popup=document.getElementById('popup');let down=null;
renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY}});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>7)return;const r=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(mouse,camera);const hits=raycaster.intersectObjects(clickable,false);if(hits.length){document.getElementById('popTitle').textContent=hits[0].object.userData.name;document.getElementById('popText').textContent=hits[0].object.userData.description;popup.classList.add('show')}else popup.classList.remove('show')});
document.getElementById('close').onclick=()=>popup.classList.remove('show');
const views={iso:[sceneCenterX,18,56],front:[sceneCenterX,9,65],side:[sceneCenterX+72,9,0],top:[sceneCenterX+.02,78,.02]};let cameraTarget=null;function setView(v){cameraTarget=new THREE.Vector3(...views[v]);controls.target.set(sceneCenterX,3.1,0);document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v))}document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));document.getElementById('reset').onclick=()=>{setView('iso');popup.classList.remove('show')};
document.getElementById('labels').onclick=e=>{const next=!labels[0].visible;labels.forEach(o=>o.visible=next);e.currentTarget.classList.toggle('active',next)};
// reference viewer
const refEl=document.getElementById('reference'), refImg=document.getElementById('refImg'), refTitle=document.getElementById('refTitle');document.getElementById('photo').onclick=()=>refEl.classList.add('show');document.getElementById('hidePhoto').onclick=()=>refEl.classList.remove('show');document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b===btn));const key=btn.dataset.photo;refImg.src=REF_IMAGES[key];refTitle.textContent=REF_TITLES[key];});refEl.onclick=e=>{if(e.target.id==='reference')refEl.classList.remove('show')};
 return ()=>{if(cameraTarget){camera.position.lerp(cameraTarget,.078);if(camera.position.distanceTo(cameraTarget)<.04)cameraTarget=null}};
}

