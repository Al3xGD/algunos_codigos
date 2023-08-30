const video = document.getElementById('video');  // Video
const canvas = document.getElementById('canvas');// Canvas 
const boton = document.getElementById('captura');// Boton captura

// Accediendo a la camara
async function setupCamera(){
    const stream = await navigator.mediaDevices.getUserMedia({video:true});
    video.srcObject = stream;
}

// Encargada de realizar la captura
boton.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('click', () =>{
    const imgData = canvas.toDataURL('image/png');
    
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'foto.png';
    a.click();
});

// Iniciar la camara al cargar la pagina
window.onload = async () => {
    await setupCamera();
};