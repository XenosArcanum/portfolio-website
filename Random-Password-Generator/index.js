const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let btn = document.getElementById("gen")
let pw1 = document.getElementById("sample-1")
let pw2 = document.getElementById("sample-2")
let num = 15;
let foot = document.getElementById("footer")

//------------------------------------------//
        // Generate Password Button //
//------------------------------------------//
btn.addEventListener("click", function (){
    pw1.textContent = ""
    pw2.textContent = ""
    foot.textContent = "Click to Copy!";

    for (let i = 0; i < num; i++) {
        let randomIndexOne = Math.floor( Math.random() * characters.length )
        pw1.append(characters[randomIndexOne])
        
        let randomIndexTwo = Math.floor( Math.random() * characters.length )
        pw2.append(characters[randomIndexTwo])   
    }
      
    if (btn.textContent === "Create Passwords"){
        btn.textContent = "Make More Passwords!"
    } else if (btn.textContent === "Make More Passwords!"){
        btn.textContent = "Once More?"
    } else if (btn.textContent === "Once More?"){
            btn.textContent = "Again!"
    } else if (btn.textContent === "Again!"){
        btn.textContent = "So many choices..."
    } else if (btn.textContent = "So many choices..."){
            btn.textContent = "Make More Passwords!"
    }
})

//------------------------------------------//
            // Copy on Click //
//------------------------------------------//
pw1.addEventListener("click", function() {

    if (pw1.textContent != "") {
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(pw1.textContent);

        /* Alert the copied text */
        foot.textContent = "Password #1 Copied!";  
    } 
})

pw2.addEventListener("click", function() {

    if (pw2.textContent != "") {
        // let copyText = pw1.textContent
    
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(pw2.textContent);

        /* Alert the copied text */
        foot.textContent = "Password #2 Copied!";  
    } 
})


