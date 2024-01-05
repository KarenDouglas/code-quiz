const $rootEl = document.querySelector('#root');
const $timer = document.querySelector('#timer')
const $highScoresLink = document.querySelector('#highScoresLink')

let score = 0            
const wrongAnswer = 10
let count = 100
let ls =localStorage.getItem('highScores')
const lsArray =JSON.parse(ls)
const highScores = lsArray || []

$timer.innerText = count

function startTimer() {
    const intervalID = setInterval(function (){
        if(count > 0){
            count--
           $timer.innerText = count
        }else{
            $timer.innerText = 0; 
            renderGameOver()       
            clearInterval(intervalID)
        }
    
        
    }, 1000)
}






const questions = [
    {question: 'What is JavaScript',
    answer1: " it coffee on paper",
    answer2: " a client-side scripting language",
    answer3: " a server-side scripting language",
    answer4: "a react framework",
    correct: " a client-side scripting language"    
    },
    {question: 'What are JS Data Types',
    answer1: "number,string,boolean, object, undefined",
    answer2: "number, words, integers, white paper",
    answer3: "undefined, linked Lists, binary tree",
    answer4: "terminal, git, bash, command",
    correct:  "number,string,boolean, object, undefined",    
},
    {question: 'Which Comapany developed JavaScript',
    answer1: "Facebook",
    answer2: "NetLify",
    answer3: "Netscape",
    answer4: "ECMA",
    correct:  "Netscape",    
},
{question: 'What are undefined variables',
answer1: "variables that are not declared and doesnt exist",
answer2: "a number",
answer3: "a constant variable",
    answer4: "variables that are declared but have not been given a value",
    correct:  "variables that are declared but have not been given a value"    
    },
    {question: 'What are global variables',
    answer1: "variables that are not declared and doesnt exist",
    answer2: "variables that are available throughout the length of the code",
    answer3: "variables that are only available in local scope",
    answer4: "variables that are encoded to work in in human language",
    correct:  "variables that are available throughout the length of the code"   
},
{question: 'What is ‘this’ keyword in JavaScript',
answer1: "refers to the object from where it was called",
answer2: "it always refers to the Window ",
answer3: "refers to the function from where it was called",
answer4: "it refers to the argument from where it was called",
correct:  "refers to the object from where it was called" 
},
{question: 'What does NULL mean in JavaScript',
answer1: "a value used to represent no value or no object",
answer2: "Never Undo Little Lemons ",
answer3: "undefined",
answer4: "false",
    correct:  "a value used to represent no value or no object"
    },
    {question: 'What is a break statement',
    answer1: "it exits from loop",
    answer2: "it continues to next statement in loop ",
    answer3: "it returns a value",
    answer4: "it delays next function",
    correct: "it exits from loop",
},
{question: 'What is a continue statement',
answer1: "it exits from loop",
answer2: "it continues to next statement in loop ",
answer3: "it returns a value",
    answer4: "it delays next function",
    correct: "it exits from loop",
},
{question: 'What are the two basic groups of data types in JavaScript',
answer1: "key values",
answer2: "number and string",
answer3: "primitive and reference",
answer4: "array and function",
correct:"primitive and reference"
}


]

    

    let i = 0
    
    function renderQuestion(){
        if(count > 0){
            if(questions[i]){
                $rootEl.innerHTML = `
                <section class="quiz">
                <h2 class="question">${questions[i].question}</h2>
                <ol>
                <li data-answer="${questions[i].answer1}">${questions[i].answer1}</li>
                <li data-answer="${questions[i].answer2}">${questions[i].answer2}</li>
                <li data-answer="${questions[i].answer3}">${questions[i].answer3}</li>
                <li data-answer="${questions[i].answer4}">${questions[i].answer4}</li>
                </ol>
                </section>      
                `      
            }
        }else{
            renderGameOver()
        }
        
        
    }
    
    
    
    
        function nextQuestion(event){
            
           
                if(event.target.getAttribute('data-answer')){
                
                    if(event.target.getAttribute('data-answer') === questions[i].correct ){
                        score += 20
                        event.target.style.backgroundColor = '#D7F75B'                       
                    }else{
                   
                            
                            count -= 20
                        
                        event.target.style.backgroundColor = '#F42C04'
                         
                        $timer.style.color = '#000'
                        $timer.parentElement.style.backgroundColor= '#F42C04' 
                        setTimeout(()=> {
                            $timer.style.color = '#D7F75B'
                            $timer.parentElement.style.backgroundColor= '#000' 
                        }, 300)
                    }
                    i++
                    
                    setTimeout(()=>{
                        renderQuestion()
                    },500)
                    
                    
                }          
        }   
        
        function renderGameOver(){
            $rootEl.innerHTML = `
            <section class="game-over">
            <h2>Game Over</h2>
            <h3>Score: <span id="score">${score} </span>points</h3>
            <form>
            <input id="initials" name = "initials"type="text" placeholder="Enter intials">
            <button type="submit" id="submitButton">Submit</button>
            </form>
            </section>
            `    
        }
        function renderGameStart(){
            $rootEl.innerHTML = `
            <section class="gameStart">
            <h1>Coding Quiz Challenge</h1>
            <button id="playNow">Play Now</button>
            </section>
            `

        }
        
        function handlePlayNow(event){
            if(event.target.id === 'playNow'){
                renderQuestion()
                startTimer()
            }
        }
        function handleSubmit(event){
            event.preventDefault()
            console.log(event.target)
            if( event.target.id === 'submitButton'){ 
                console.log('yo')     
                highScores.push({userName:event.target.previousElementSibling.value, score: score })
                localStorage.setItem('highScores',JSON.stringify(highScores) )
                renderHighScores()            
        }
    }
function handeHighScoresLink (){
    renderHighScores()
}

console.log(lsArray)
function renderHighScores () {
    
    $rootEl.innerHTML = `
    <section>
    <h2>High Scores</h2>
    <ul id ="highScores">
    
    </ul>
    </section>
    <footer>
    <button id="clear">Clear Score</button>
    <button id="back">Go Back</button>
    </footer>
    
    `
    const $highScores = document.querySelector('#highScores')
    const $clearButton = document.querySelector('#clear')
    const $goBackButton = document.querySelector('#back')
    $goBackButton.addEventListener('click',handleGoBack)
    for(let i = 0; i < highScores.length ; i++){
        const $li = document.createElement('li')
        $highScores.append($li)
        $li.innerText = `${highScores[i].userName} : ${highScores[i].score}`
    }
    function handleGoBack(event){
        if(event.target.id === 'back'){

            renderGameStart()
            count = 100
            $timer.innerText = count
            score = 0
            i = 0
        }
    }
        function handleClearScores(){
        localStorage.clear()
                 $rootEl.innerHTML = `
                 <section>
                     <h2>High Scores</h2>
                    
                 </section>
                 <footer>
             <button id="clear">Clear Score</button>
             <button id="back">Go Back</button>
             </footer>
            `
        }
        
        
        
        
        $clearButton.addEventListener('click', handleClearScores)
    }

    
    //startTimer()
    //renderQuestion()
    //renderHighScores()
    renderGameStart()
    //renderGameOver()
  
    $rootEl.addEventListener('click', nextQuestion)
    $rootEl.addEventListener('click', handleSubmit)
    $rootEl.addEventListener('click', handlePlayNow)
    $highScoresLink.addEventListener("click", handeHighScoresLink)   
    
    
    