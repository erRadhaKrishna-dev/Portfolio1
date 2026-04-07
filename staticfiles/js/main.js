document.addEventListener("DOMContentLoaded",()=>{
    const typed=new Typed('.text',{
        strings:["Frontent Developer","Backend Developer","Python Developer","DataBase Developer"],
        typeSpeed:100,
        backSpeed:100,
        backDelay:1000,
        loop:true 
    });
});

/*function grow progress-line start */
// Function to detect if an element is in the viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

const progressBars = document.querySelectorAll('.progress-line');

function checkVisibility() {
  progressBars.forEach(bar => {
    if (isInViewport(bar)) {
      bar.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
/*function grow progress-line end */

/*function draw pie skill chart  start*/
function animateSkill(canvasId,percentId,targetPercent,color){
    const canvas=document.getElementById(canvasId);
    const ctx=canvas.getContext("2d");
    const percentText=document.getElementById(percentId);
    const radius=70;
    const lineWidth=10;
    const center=canvas.width/2;

    let currentPercent=0;

    function draw(percent){
        const startAngle=-0.5*Math.PI;
        const endAngle=startAngle+(2*Math.PI*percent/100);

    

    //clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //background circle(track)
    ctx.beginPath();
    ctx.arc(center,center,radius,0,2*Math.PI);
    ctx.strokeStyle="#222"
    ctx.lineWidth=lineWidth;
    ctx.stroke();

    //progress arc
    ctx.beginPath();
    ctx.arc(center,center,radius,startAngle,endAngle);
    ctx.strokeStyle=color;
    ctx.lineWidth=lineWidth;
    ctx.stroke();

    //update percentage text

    percentText.textContent=`${Math.round(percent)}%`;
}

function animate(){
    if (currentPercent<=targetPercent){
        draw(currentPercent);
        currentPercent+=1;
        requestAnimationFrame(animate);
    }
}
animate();
}
//run on page load

window.onload=function(){
animateSkill("creativityChart","creativityPercent",95,"#0ef");
animateSkill("CommunicationChart","communicationPercent",80,"#0ef");
animateSkill("problemChart","problemPercent",75,"#0ef");
animateSkill("teamworkChart","teamworkPercent",85,"#0ef");
};
/*function draw pie skill chart  end*/

