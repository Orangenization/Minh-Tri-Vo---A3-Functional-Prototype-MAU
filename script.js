// Arrays to store color items
let items = [];
let itemsSystem = [];
    const premadeColors = ["Red", "Green", "Blue", "Yellow", "White", "Black"]; //0 to 5, not 1 to 6. 6 Values in total


function updateDisplay() {
    document.getElementById("Information").innerHTML = "1 is : " + premadeColors[0] + "/ " + "2 is : " + premadeColors[1] + "/ " +  "3 is : " + premadeColors[2] + "/ " + "4 is : " + premadeColors[3] + "/ " + "5 is : " + premadeColors[4] + "/ " +  "6 is : " + premadeColors[5] ;
    document.getElementById("userText").innerHTML = "Your Colors: " + items.join(", ");
    document.getElementById("SystemText").innerHTML = "System Colors: " + itemsSystem.join(", ");
    //Join all the elements of the array into one string, but with a comma and space between them
}

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
            newColor = "Black";
        }

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
        updateDisplay();
    } else {
        alert("Colors don't match. Try again!");
        systemBox();
        items=[];
        updateDisplay();
    }

    /*const match = compareArrays(items, itemsSystem);
    alert(match ? "Congratulations! Colors match!" : "Colors don't match. Try again!");
    */
});

userBox();
systemBox();