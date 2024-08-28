const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");

const framesx = {
    currentIndex: 0,  
    maxIndex: 1789   
};

let imagesLoaded = 0;
const images = [];

function preloadImage() {
    for (let i = 1; i <= framesx.maxIndex; i++) { 
        const imageUrl = `framex/frame_${i.toString().padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === framesx.maxIndex ) {
                loadImage(framesx.currentIndex);
                startAnimation(); 
            }
        };
        images.push(img);
    }
}

function loadImage(index) {
    if (index >= 0 && index < images.length) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        framesx.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"top",
            scrub:2,
            marker:true,


        }
    })
    tl.to(framesx,{
        currentIndex:framesx.maxIndex,
        onUpdate:function(){
            loadImage(Math.floor(framesx.currentIndex))
        }

    })
}



preloadImage();

window.addEventListener("resize", function (){
    loadImage(Math.floor(framesx.currentIndex));
})