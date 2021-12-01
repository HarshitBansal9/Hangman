const randomWord_URL = "https://random-words-api.vercel.app/word";
let strVar = "";
let variable;
let definition;
const paragraph = document.querySelector(".random-word");
let allButtons = document.getElementsByClassName("letter");
document.querySelector(".hint").style.visibility = "hidden";
const bodyParts = [
    "head",
    "left-hand",
    "right-hand",
    "neck",
    "left-leg",
    "right-leg"
];
function disableButtons(){
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
        allButtons[i].style.backgroundColor = "white";
    }
}
disableButtons()
function getVariable(data){
    variable = data[0].word;
    definition = data[0].definition;
    for (let i = 0; i < variable.length; i++){
        strVar += "_ ";
    }
    paragraph.innerText = strVar;
    checkIfLetterInWord();
}
function getRandomWord(){
    fetch(randomWord_URL).then(response =>{
    const data = response.json();
    return data
    }).then(data =>{
        getVariable(data);
    })    
}
function checkIfLetterInWord(){
    let strArray = strVar.split("");
    let bodyPartsCount = 0;
    document.querySelector(".letter-buttons").addEventListener("click",function(event){  
        document.querySelector(`.${event.target.innerText}`).disabled = true;
        document.querySelector(`.${event.target.innerText}`).style.backgroundColor = "white";
        let cnt = 0;
        for (let i =0;i<(variable.length);i++){
            if (variable.toUpperCase()[i] === event.target.innerText){
                strArray[i*2] = variable[i]
                paragraph.innerText = strArray.join("");
                cnt++
            }
        }
        if (cnt === 0){
            if (bodyPartsCount === 0){
            document.querySelector(`.${bodyParts[bodyPartsCount]}`).style.borderColor = "black";
            bodyPartsCount++;
            }
            else{
                document.querySelector(`.${bodyParts[bodyPartsCount]}`).style.backgroundColor = "black";
                bodyPartsCount++;
            }
        }
        if (bodyPartsCount === 4){
            document.querySelector(".hint").style.visibility = "visible";
        }
        document.querySelector(".hint").addEventListener("click",function(){
            document.querySelector(".hint-para").innerText = `Definition: ${definition}`;
        })
        
        if (bodyPartsCount===6){
            strVar = "";
            bodyPartsCount = 0;
            document.querySelector(".result").innerText = `You lost ,the word was ${variable}`;
            disableButtons()
            document.querySelector(".new-word").style.visibility = "visible";
        }
        if ((strArray.join("")).replace(/ /g,'')===variable){
            strVar = "";
            bodyPartsCount = 0;
            document.querySelector(".result").innerText = "You won";
            disableButtons()
            document.querySelector(".new-word").style.visibility = "visible";
        }
    });
    };
document.querySelector(".new-word").addEventListener("click",function(){
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = false;
        allButtons[i].style.backgroundColor = "rgb(25, 126, 41)";
    }
    getRandomWord()
    document.querySelector(".new-word").style.visibility = "hidden";
    document.querySelector(".result").innerText = "";
    for (let i =0;i<bodyParts.length;i++){
        if (i === 0){
            document.querySelector(`.${bodyParts[i]}`).style.borderColor = "grey";
        }
        else{
            document.querySelector(`.${bodyParts[i]}`).style.backgroundColor = "grey";
        }
        bodyPartsCount = 0;
    }
    document.querySelector(".hint").style.visibility = "hidden";
    document.querySelector(".hint-para").innerText = "";
});




  
