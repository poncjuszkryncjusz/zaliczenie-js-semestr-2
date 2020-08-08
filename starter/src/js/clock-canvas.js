

function displayClock() {
    const objDate = new Date ();
    let currentTime;
    const hour = obj.Date.getHours();
    const min = obj.Date.getMinutes();
    const sec = obj.Date.getSeconds();

    if(hour<10){
        currentTime= "0" + hour.toString();
    }else {
        currentTime = hour.toString();
    }

    if(hour<10){
        currentTime= ":0" + min.toString();
    }else {
        currentTime += ":" + min.toString();
    }

    if(hour<10){
        currentTime= ":0" + sec.toString();
    }else {
        currentTime += ":" + sec.toString();
    }

    console.log(hour, min, sec);
}
export default displayClock