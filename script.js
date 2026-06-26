const video=document.getElementById('camera');
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const capture=document.getElementById('capture');
const download=document.getElementById('download');

const filters=[
'Normal','Vintage','Sepia','Kodak','Film',
'VHS','Warm','Cool','Vivid','HDR',
'Pink','Soft','Pastel','Peach','Sakura',
'Dream','Fairy','Galaxy','Magic','Angel'
];

const map={
Normal:'none',
Vintage:'sepia(.35) contrast(1.1) saturate(.9)',
Sepia:'sepia(1)',
Kodak:'contrast(1.2) saturate(1.25) brightness(1.05)',
Film:'contrast(1.1) saturate(.8)',
VHS:'contrast(1.2) hue-rotate(-10deg)',
Warm:'sepia(.25) saturate(1.2)',
Cool:'hue-rotate(20deg)',
Vivid:'saturate(1.7)',
HDR:'contrast(1.3) saturate(1.3)',
Pink:'hue-rotate(-15deg) saturate(1.4)',
Soft:'brightness(1.1)',
Pastel:'contrast(.9) saturate(.8)',
Peach:'sepia(.2)',
Sakura:'hue-rotate(-25deg)',
Dream:'blur(.5px) brightness(1.08)',
Fairy:'brightness(1.12) saturate(1.2)',
Galaxy:'hue-rotate(90deg)',
Magic:'contrast(1.25)',
Angel:'brightness(1.18)'
};

async function start(){
 const stream=await navigator.mediaDevices.getUserMedia({
  video:{width:{ideal:1920},height:{ideal:1080},facingMode:'environment'}
 });
 video.srcObject=stream;
}
start();

const holder=document.getElementById('filters');
filters.forEach(f=>{
 const d=document.createElement('div');
 d.className='filter';
 d.textContent=f;
 d.onclick=()=>video.style.filter=map[f];
 holder.appendChild(d);
});

capture.onclick=()=>{
 canvas.width=video.videoWidth;
 canvas.height=video.videoHeight;
 ctx.filter=getComputedStyle(video).filter;
 ctx.drawImage(video,0,0);
 canvas.style.display='block';
};

download.onclick=()=>{
 const a=document.createElement('a');
 a.download='retrocam.png';
 a.href=canvas.toDataURL('image/png');
 a.click();
};
