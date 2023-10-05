const icon_width = 79, //custom
    icon_height = 79, //custom
    num_icons = 9, //custom
    time_per_icon= 100,
    iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"],
    indexes = [0,0,0], //winlines we will be checking
    gameStatus1 = document.getElementById('Statut1'),
    gameStatus2 = document.getElementById('Statut2'),
    toggleButton3 = document.getElementById('playButton');


toggleButton3.addEventListener("click", function() {
    gameStatus1.innerText = '';
    gameStatus2.innerText = '';
    rollAll();
})

const roll = (reel, offset = 0) =>{

    const delta =(offset + 2) * num_icons + Math.round(Math.random() * num_icons);  
    //delta is the number of fruits that will pass by before stabilizing 
    //it contains a random number + 2 roll complete of 9 images
    const style = getComputedStyle(reel), // find css style of the reel 
        backgroundPositionY = parseFloat(style["background-position-y"]), // origin position
        travelTime = 8 + delta * time_per_icon,
        // the time necessary to travel through the number delta of icons that will pass by 
        // each icon has the same travel time during roll
        travelDistance = backgroundPositionY + delta * icon_height;
        // origin is added to the number of icon that will pass by multiply by their height in pixels 
        // normTargetBackgroundPositionY = travelDistance%(num_icons * icon_height);
        //normalize position for not getting too high after thousands rolls

    return new Promise((resolve)=> {
        
        reel.style.transition =`background-position-y ${travelTime}ms cubic-bezier(.41,-0.01,.63,1.09)`; // apply transition in css
        reel.style.backgroundPositionY = `${travelDistance}px`;//apply max background position

    setTimeout(() => {
        reel.style.transition =`none`; // apply transition in css
        reel.style.backgroundPositionY = `${travelDistance}px`;//apply max background position

        resolve(delta%num_icons) // callback the function with last index of icon
    }, travelTime) //wait for the roll before repeating the function
    })
};

function rollAll(){

    const reelsList = document.querySelectorAll('.slots > .reel');
    Promise
    .all([...reelsList].map((reel, i)=>  roll(reel, i))).then((deltas)=>{
        deltas.forEach((delta,i) => indexes[i] = (indexes[i] + delta)%num_icons);
        indexes.map((index)=>{console.log(iconMap[index])})

        //check win condition
        if(indexes[0]==indexes[1] && indexes[1] == indexes[2]){
            gameStatus1.innerText = 'TU AS GAGNE ';
            gameStatus2.innerText = 'UN GROS PRIX';
        }else if (((iconMap[indexes[0]]== 'banana') && (iconMap[indexes[1]]== 'banana')) || ((iconMap[indexes[0]]== 'banana') && (iconMap[indexes[2]]== 'banana')) || ((iconMap[indexes[1]]== 'banana') && (iconMap[indexes[2]]== 'banana'))|| ((iconMap[indexes[2]]== 'banana') && (iconMap[indexes[0]]== 'banana'))){
            gameStatus1.innerText = 'TU AS GAGNE ';
            gameStatus2.innerText = 'UN MOYEN PRIX ';
        }else if (((iconMap[indexes[0]]== 'seven') && (iconMap[indexes[1]]== 'seven')) || ((iconMap[indexes[0]]== 'seven') && (iconMap[indexes[2]]== 'seven')) || ((iconMap[indexes[1]]== 'seven') && (iconMap[indexes[2]]== 'seven'))|| ((iconMap[indexes[2]]== 'seven') && (iconMap[indexes[0]]== 'seven'))){
            gameStatus1.innerText = 'TU AS GAGNE ';
            gameStatus2.innerText = 'UN MOYEN PRIX';
        }else if (indexes[0] == indexes[1] || indexes[0] == indexes[2] || indexes[1] == indexes[2] || indexes[2] == indexes[0]){
            gameStatus1.innerText = 'TU AS GAGNE';
            gameStatus2.innerText = 'UN PETIT PRIX ';
        }else{
            gameStatus1.innerText = "TU AS PERDU";
            gameStatus2.innerText = "";
        }
    })
    
}

