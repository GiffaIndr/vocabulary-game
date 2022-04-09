const questions = [
    {
        question: "Thomas ….. the competition in a National Olimpiade He looks very happy ",
        optionA: "jumped",
        optionB: "won",
        optionC: "celebrated",
        optionD: "lose",
        correctOption: "optionB"
    },
    {
        question: "Bunga is celebrating her birthday. Now Bunga feels ...",
        optionA: "easy",
        optionB: "angry",
        optionC: "annoyed",
        optionD: "happy",
        correctOption: "optionD"
    },
    {
        question: "Aulia : Drake, where do you want to go? <br> Drake : I want to ….. to Europe with my parents and siblings.",
        optionA: "move",
        optionB: "run",
        optionC: "walk",
        optionD: "jump",
        correctOption: "optionA"
    },
    {
        question: "Linda did not study hard, so she did not … the exam.",
        optionA: "go",
        optionB: "study",
        optionC: "pass",
        optionD: "run",
        correctOption: "optionC"
    },
    {
        question: "The classroom looks very … . The students should clean it soon before the teacher comes. ",
        optionA: "dirty",
        optionB: "tidy",
        optionC: "shiny",
        optionD: "silly",
        correctOption: "optionA"
    },
    {
        question: "straying away from a topic",
        optionA: "digression",
        optionB: "conciliate",
        optionC: "astute",
        optionD: "censure",
        correctOption: "optionA"
    },
    {
        question: "My uncle lives in the _________. He is undergoing training to be a soldier.",
        optionA: "house",
        optionB: "hostel",
        optionC: "barracks",
        optionD: "college",
        correctOption: "optionC"
    },
    {
        question: "There are a lot of old ________ in the art gallery.",
        optionA: "ships",
        optionB: "paintings",
        optionC: "blouses",
        optionD: "footwear",
        correctOption: "optionB"
    },
    {
        question: "A synonym for persuade is?",
        optionA: "discourage",
        optionB: "convince",
        optionC: "fail",
        optionD: "hinder",
        correctOption: "optionB"
    },
    {
        question: "The lady asked for a ____________ to stir her coffee.",
        optionA: "teaspoon",
        optionB: "chopstick",
        optionC: "ladle",
        optionD: "knife",
        correctOption: "optionA"
    },
]

let shuffledQuestions = []
function handleQuestions() {

    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0 
let indexNumber = 0


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
        
            correctOption = option.labels[0].id
        }
    })

    if(options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false) {
        document.getElementById('option-modal').style.display = "flex"
        }

        
        options.forEach((option) => {
            if (option.checked === true && option.value === currentQuestionAnswer) {
                document.getElementById(correctOption).style.backgroundColor = "green"
                playerScore++
                indexNumber++

                setTimeout(() => {
                    questionNumber++
                }, 1000)
            }

            else if (option.checked && option.value !== currentQuestionAnswer) {
                const wrongLabelId = option.labels[0].id
                document.getElementById(wrongLabelId).style.backgroundColor = "red"
                document.getElementById(correctOption).style.backgroundColor = "green"
                wrongAttempt++
                indexNumber++

                setTimeout(() => {
                    questionNumber++
                }, 1000)
            }
        })
    }

    function handleNextQuestion() {
        checkForAnswer()
        unCheckRadioButtons()

        setTimeout(() => {
            if (indexNumber <=9) {
                NextQuestion(indexNumber)
            }
            else {
                handleEndGame()
            }
            resetOptionBackground()
        }, 1000);
    }

            function resetOptionBackground() {
                const options = document.getElementsByName("option");
                options.forEach((option) => {
                    document.getElementById(option.labels[0].id).style.backgroundColor = ""
                })
            }

            function unCheckRadioButtons() {
                const options = document.getElementsByName("option");
                for (let i = 0; i < options.length; i++) {
                    options[i].checked = false;
                }
            }

            function handleEndGame() {
                let remark = null
                let remarkColor = null

                if (playerScore <= 3) {
                    remark = "Belajar WOE"
                    remarkColor = "red"
                }
                else if (playerScore >= 4 && playerScore < 7) {
                    remark = "Belajar lagi yee"
                    remarkColor = "orange"
                }
                else if (playerScore >= 7) {
                    remark = "MANTAPPPP!!"
                    remarkColor = "green"
                }
                const playerGrade = (playerScore / 10) * 100

                //===========data display===========
                document.getElementById('score-modal').style.display = "flex"
                document.getElementById('remarks').innerHTML = remark
                document.getElementById('remarks').style.color = remarkColor
                document.getElementById('grade-percentage').innerHTML = playerGrade
                document.getElementById('wrong-answers').innerHTML = wrongAttempt
                document.getElementById('right-answers').innerHTML = playerScore
            }

            function closeScoreModal() {
                questionNumber = 1;
                playerScore = 0;
                wrongAttempt = 0;
                indexNumber = 0;
                shuffledQuestions = [];
                NextQuestion(indexNumber);
                document.getElementById('score-modal').style.display = "none";
            }
            function closeOptionModal() {
                document.getElementById('option-modal').style.display = "none";
            }
            
