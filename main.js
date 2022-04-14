status="";
objects=[];
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocoSSD',modelLoaded); 
}
img="";
function preload(){
    img = loadImage('dog_cat.jpg');
}
function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
    objectDetector.detect(video,gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="Status : object detcted " ;
        document.getElementById("no_of_objects").innerHTML="No. of objects detected is " + objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + " %", objects[i].x , objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}
function modelLoaded(){
    console.log("modelLoaded");
    status = true;
}
function gotResult(error,results){
     if (error) {
        console.error(error);
     }
     else{
        console.log(results);
        objects=results;
     }
}