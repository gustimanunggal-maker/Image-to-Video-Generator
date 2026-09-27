const API="https://YOUR_RUNPOD_URL/api/image-to-video";

const image=document.getElementById("image");
const preview=document.getElementById("previewImg");
const generate=document.getElementById("generate");
const fill=document.getElementById("fill");
const status=document.getElementById("status");
const video=document.getElementById("video");
const download=document.getElementById("download");

image.onchange=e=>{
const file=e.target.files[0];
if(!file) return;

preview.src=URL.createObjectURL(file);
preview.style.display="block";
}

generate.onclick=async()=>{

const file=image.files[0];

if(!file){
alert("Upload gambar terlebih dahulu");
return;
}

status.innerText="Mengupload gambar...";

const form=new FormData();

form.append("image",file);
form.append("prompt",document.getElementById("prompt").value);
form.append("duration","20");
form.append("ratio",document.getElementById("ratio").value);
form.append("quality",document.getElementById("quality").value);

let p=0;

const timer=setInterval(()=>{
p+=5;
fill.style.width=p+"%";
if(p>=90) clearInterval(timer);
},500);

try{

const res=await fetch(API,{
method:"POST",
body:form
});

const data=await res.json();

clearInterval(timer);

fill.style.width="100%";

status.innerText="Video selesai dibuat";

video.src=data.video_url;
video.style.display="block";

download.href=data.video_url;
download.download="video.mp4";
download.style.display="block";

}catch(err){

status.innerText="Server AI belum terhubung.";

alert("Hubungkan aplikasi dengan server AI terlebih dahulu.");

}

}
