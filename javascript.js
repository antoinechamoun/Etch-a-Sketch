let colorRGB='#333', pixelSize;
const colorBtn = document.getElementById('color')
const rainbowBtn = document.getElementById('rainbow')
const eraserBtn = document.getElementById('eraser')
const gridSize = document.querySelector('.right')
let count=0

//Buttons function
function handleButton(e){
    if(e.srcElement.id === "color"){
        colorBtn.classList.add('selected')
        rainbowBtn.classList.remove('selected')
        eraserBtn.classList.remove('selected')
        colorRGB = document.querySelector('.colorSelector').value
    }else if(e.srcElement.id === "rainbow"){
        colorBtn.classList.remove('selected')
        rainbowBtn.classList.add('selected')
        eraserBtn.classList.remove('selected')
        colorRGB = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
    }else if(e.srcElement.id === "eraser"){
        colorBtn.classList.remove('selected')
        rainbowBtn.classList.remove('selected')
        eraserBtn.classList.add('selected')
        colorRGB = 'rgb(255,255,255)'
    }else if(e.srcElement.id === "clear"){
        let paper = document.querySelectorAll('#gridSquare')
        paper.forEach((child)=>{
            child.style.background='white'
        })
    }
}

//Slider function
function handleRange(value){
    gridSize.textContent = ''
    value = document.getElementById('pixel').value
    let pixelLabel = document.getElementById('pixel-size');
    pixelLabel.textContent = `${value} x ${value}`
    let length = (500/value);
    for(let i=0; i<value; i++){
        for(let j=0; j<value; j++){
            let width, height;
            let left = i*(500/value)
            let top = j*(500/value)
            width = height = length;
            let square = document.createElement("div")
            square.id='gridSquare'
            square.classList.add(`grids${i}${j+10}`)
            square.style.position='absolute'
            square.style.top=`${top}px`
            square.style.left=`${left}px`
            square.style.width = `${width}px`;
            square.style.height = `${height}px`;
            square.style.background ='white'
            gridSize.appendChild(square);
        }
    }
}

//Change background function
function changeBackground(e){
    let choice = e.srcElement.className
    if((e.target.offsetParent.className=='right active')){

        if(e.srcElement.id!='gridSquare'){
            return
        }
        const isRainbow = document.querySelector('#rainbow')
        if(isRainbow.className == 'selected'){
            colorRGB = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`
        }
        const gridSelected = document.querySelector(`.${choice}`)
        gridSelected.style.background = colorRGB
}
}

//Color eventListener
const colorChoice = document.querySelector('.colorSelector')
colorChoice.addEventListener('change', ()=>{colorRGB = colorChoice.value})

//Buttons eventListener
const allBtn = document.querySelectorAll('button')
allBtn.forEach((btn)=>{
    btn.addEventListener('click', handleButton);
})


//Slider eventListener
const range = document.getElementById('pixel');
range.addEventListener('change',handleRange)

//grids onClick
const allGrids = document.querySelectorAll('gridSquare')
window.addEventListener('mouseover', changeBackground)

const paper = document.getElementById('right')
paper.addEventListener('mousedown', ()=>paper.classList.add('active'))
paper.addEventListener('mouseup', ()=>paper.classList.remove('active'))
paper.addEventListener('mouseleave', ()=>paper.classList.remove('active'))
paper.addEventListener("dragstart", (e) => e.preventDefault());

if(count == 0){
    handleRange(16)
    count++
}