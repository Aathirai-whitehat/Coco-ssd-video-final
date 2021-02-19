objects=[];
video="";
status="";

function preload(){
    video=createVideo("video.mp4");
    video.hide();
    video.size(400,400);
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
}

function draw(){
    image(video,0,0,400,400);
    if( status!=""){
        objectdetector.detect(video,gotresult);   
        for(i = 0; i<objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("numbers").innerHTML = "Number of objects detected : " + objects.length;

            objectname = objects[i].label;
            accuracy = floor(objects[0].confidence * 100) + "%";
            width = objects[i].width;
            height = objects[i].height;
            x = objects[i].x;
            y = objects[i].y;
            
            fill("#FF7F50");
            stroke("#FF7F50");
//text(TEXT TO BE PRINTED ON CANVAS , X ,Y);
            text(objectname + " " + accuracy , x , y);
            noFill();
            rect(x , y , width , height);
        }
    }
}

function start(){
    objectdetector = ml5.objectDetector("cocossd",modelloaded);
}

function modelloaded(){
    console.log("Model has been loaded");
    document.getElementById("status").innerHTML="Status : Detecting objects";
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
