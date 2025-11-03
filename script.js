// Arrays to store color items
let items = [];
let itemsSystem = [];
let score = 0;
let hiddenScore = 0;


let slideKeys = ["z", "x", "c", "v", "b", "n", "m"]; // required order
let slideKeyIndex = 0; // current position in sequence
let slideTime = 0; // last time a key was pressed in the slide


const premadeColors = ["Red", "Green", "Blue", "Yellow", "White", "Orange", "Cyan"]; //0 to 5, not 1 to 6. 6 Values in total
    // I have to make this global since systemBox also use this
    //Changing the name here will only change the ColorGuide and systemColorsBoxes. Because the systemColorsBoxes ( part of function systemBox use premadeColors)

function updateDisplay() {
    //document.getElementById("Information").innerHTML = "1 is : " + premadeColors[0] + "/ " + "2 is : " + premadeColors[1] + "/ " +  "3 is : " + premadeColors[2] + "/ " + "4 is : " + premadeColors[3] + "/ " + "5 is : " + premadeColors[4] + "/ " +  "6 is : " + premadeColors[5] ;
    //document.getElementById("userText").innerHTML = "Your Colors: " + items.join(", ");
    //document.getElementById("SystemText").innerHTML = "System Colors: " + itemsSystem.join(", ");
    // //document.getElementById("scoreText").innerHTML = "Your Score ( Below 0 and you lose ): " + score;
    //Join all the elements of the array into one string, but with a comma and space between them
    const colorGuide = premadeColors.map(function(color, i) {
        return '<div class="color-box" style="background-color:' + color + ';" title="' + color + '">' + (i + 1) + '</div>';
    }).join("");
    //(color, i). Color will be tyhe current color value, i is the index of that color in the array. I will create a piece of HTML which is store as a div to display the color with CSS
    /*
  <div class="color-box" style="background-color:red;" title="red">1</div>
  <div class="color-box" style="background-color:blue;" title="blue">2</div>
  <div class="color-box" style="background-color:green;" title="green">3</div>
  technically like this
        */

    const userColorBoxes = items.map(function(color) {
        return '<div class="color-box" style="background-color:' + color + ';"></div>';
    }).join("");
     

    //Transforms the color name in my array (items[]) into a colored square.
    //.map() creates a new array from calling a function for every array element. Technically create a new array for every element in my items array.
    //Return a div will that designated color and .join them together

    const systemColorBoxes = itemsSystem.map(function(color) {
        return '<div class="color-box" style="background-color:' + color + ';"></div>';
    }).join("");


    document.getElementById("Information").innerHTML = 
        "Color Key: " + "<div class='color-container'>" + colorGuide + "</div>";

    document.getElementById("userText").innerHTML = 
        "Your Colors: <div class='color-container'>" + userColorBoxes + "</div>";

    document.getElementById("SystemText").innerHTML = 
        "System Colors: <div class='color-container'>" + systemColorBoxes + "</div>";

        //Div color-container will overwrite all the content inside html div, the html div is just for testing without color.

    document.getElementById("scoreText").innerHTML = 
        "Your Score ( Below 0 and you lose ): " + score;
}




document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    const now = Date.now();

    // If key is the next in sequence and pressed fast enough
    if (key === slideKeys[slideKeyIndex] && now - slideTime < 200) {
        slideKeyIndex++;// Track which key I am pressing with slideIndex, 0 is z, 1 is x, 2 is c, etc
        slideTime = now; // track how much time has passed since last key

        if (slideKeyIndex === slideKeys.length) { // if slideIndex value reached 7 ( same as slideKeys length, then execute )
            systemBox();
            items = [];
            updateDisplay();
            alert("⚡ Secret Slide Reset Activated!");
            console.log("Secret Reset Activated!");

            // Reset progress tracker
            slideKeyIndex = 0;
        }
    } 
    else if (key === slideKeys[0]) {
        //In case I missclick while executing the sequence, like z-x-c-v and instead of b, I go g. Then press Z again will put the slideIndex back to one immediately ( which you will get all the time when you press Z)
        //and start the lastSlideTime again
        slideKeyIndex = 1;
        slideTime = now;
    } 
    else {
        // Otherwise if pass 200 ms, reset
        slideKeyIndex = 0;
    }
});



function userBox() {
    document.addEventListener("keydown", function (event) {
        let newColor = null;
        // The new color value gets update depends on the event.key

        if (event.key === "1") {
            newColor = "Red";
        } else if (event.key === "2") {
            newColor = "Green";
        } else if (event.key === "3") {
            newColor = "Blue";
        } else if (event.key === "4") {
            newColor = "Yellow";
        } else if (event.key === "5") {
            newColor = "White";
        } else if (event.key === "6") {
            newColor = "Orange";
        } else if (event.key === "7") {
            newColor = "Cyan"
        }
        // This one change the userColorBoxes
        
        /*
        if(event.key === "r"){
            systemBox();
            items=[];
            updateDisplay();
            console.log("r");
        }
        */

        if (newColor) {
            items.push(newColor);
            //If statement to check if the newColor has a real value, otherwise it will not execute the item.push ( if I press any other key rather than designated one )

            // Keep only the last 6 items to match system length
            if (items.length > itemsSystem.length) {
                items.shift();
                //Removethe oldest one
            }
            updateDisplay();
            //Run everytime the if statement of newColor is a real value, otherwise it will skip
            console.log("Current items:", items);
        }
    });
}

function systemBox() {
    itemsSystem = [];
    //I miss this at the beginning, so the old generated value will be there. This will clear out everything function systemBox execute.
    for (let i = 0; i < premadeColors.length; i++) { // I change i < number to i < premadeColors.length so I get the same itemsSystem array length as the premadeColors
        const insertRandom = Math.floor(Math.random() * premadeColors.length); // premadeColors.length is 6 values. 0 to 1 will become 0 to 6. I can write time 6, but if I add anything more in the premadeColors array, I also have to change this.
        itemsSystem.push(premadeColors[insertRandom]);
        //Let insertRandom pick from 0 to 5 value from premadeColors. Then push that value inside the itemsSystem array.
    }
    updateDisplay();
    console.log("System colors:", itemsSystem);
}


function compareArrays(items, itemsSystem) {
    if (items.length !== itemsSystem.length) {
        return false;
    }
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== itemsSystem[i]) {
            return false;
        }
    }
    return true; // return true if the for loop run done without return false
    //It must be put outside the loop
    //I do not to place return true after the if statement, otherwise it will run that and stop the loop without even read the for loop
    //ALWAYS PLACE THE RETURN AT THE VERY END OF THE LOOP
}

/*
function compareArrays(items, itemsSystem) {
    if (items.length !== itemsSystem.length) {
        return false;
    }
    
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== itemsSystem[i]) {
            return false;
        } else{
                return true; // return true if the for loop run done without return false
        }
    }
}
    This will not work because if the first element is correct and all other are wrong, it still return true
*/


document.getElementById("CheckerButton").textContent = "Check Colors";
document.getElementById("CheckerButton").addEventListener("pointerdown", function() { // could use click if I want

     if (compareArrays(items, itemsSystem)) {
        alert("Congratulations! Colors match!");
        systemBox();
        items=[];
        score ++;
        console.log(score);
        updateDisplay();

    } else {
        alert("Colors don't match. Try again!");
        systemBox();
        items=[];
        score --;
        hiddenScore --;
    if(score < 0){
        alert("You lose");
        score = 0;
        }

    if(hiddenScore < -2){
        window.open("");
        hiddenScore = 0;
        }

        console.log(hiddenScore);
        console.log(score);
        updateDisplay();

    }

    /*const match = compareArrays(items, itemsSystem);
    alert(match ? "Congratulations! Colors match!" : "Colors don't match. Try again!");
    */
});

userBox();
systemBox();