var myCars = []

document.addEventListener('DOMContentLoaded', (e) => {
    myCars = JSON.parse(localStorage.getItem('cars')) || []
    data = ''
    myCars.forEach(car => {
        data += `
        <li class="car-item">
            <span class="car-details" id='item-id'>${car.id}</span>
            <span class="car-details" id='brand'>${car.brand}</span>
            <span class="car-details">${car.model}</span>
            <span class="car-details">${car.color}</span>
            <span class="car-details"><i class="fas fa-times remove"></i></span>
        </li>
      `
    })
    outputBoxText.innerHTML = data
});


const h1home = document.querySelector('#h1_home')
const outputBox = document.querySelector('.box-output-header');
const outputBoxText = document.querySelector('.box-output-text')
const addBtn = document.querySelector('.btn')
const searchInput = document.querySelector('#searchInput')
const listItems = document.querySelector('ul')
const closeBtn = document.querySelector('.close')
const modal = document.querySelector('#modal')
const btnModalColor = document.querySelector('#color_btn')


class Car {
    constructor(id, brand, model, color = chosenColor) {
        this.id = Math.floor(Math.random() * 100000)
        this.brand = document.querySelector('#brand').value.trim().toLowerCase();
        this.model = document.querySelector('#model').value.trim().toLowerCase();
        this.color = color;
    }
}


closeBtn.addEventListener('click', () => {
    modal.classList.remove('show_modal')
})

btnModalColor.addEventListener('click', () => {
    modal.classList.add('show_modal')
})



const palette = document.querySelector('.colors_palette')
palette.addEventListener('click', e => getColor(e))

var chosenColor = '';

function getColor(e) {
    if (e.target.classList.contains('radio_color')) {
        chosenColor = e.target.value
        modal.classList.remove('show_modal')
        warColorChoose(`${chosenColor}`, `${chosenColor}`)
    }
    return chosenColor
}


function warColorChoose(message, color) {
    const newDiv = document.createElement('div')
    newDiv.classList.add('coloreScelto')
    newDiv.style.backgroundColor = color
    color == 'white' ? newDiv.style.color = 'black' : 'white';
    color == 'white' ? newDiv.style.border = '1px solid black' : 'none';
    newDiv.innerHTML = message
    h1home.insertAdjacentElement("beforebegin", newDiv)
    setTimeout(() => {
        newDiv.remove()
    }, 2000)
}


const createCar = (brand, model, color = chosenColor, id) => {

    console.log(color)
    const car = new Car(brand, model, color, id)

    if (car.brand.length == 0 || car.model.length == 0 || chosenColor == '') {
        warnAdd('please, fill in all the fields!', 'danger')
        return
    }

    myCars.push(car)
    addToLocal(myCars)
    addToDom()

    warnAdd('car added!', 'success')
    clearInputs()
}

function addToLocal(arr) {
    localStorage.setItem('cars', JSON.stringify(arr))
}

function warnAdd(message, className) {
    const newDiv = document.createElement('div')
    newDiv.classList.add(className)
    newDiv.innerHTML = message
    h1home.insertAdjacentElement("beforebegin", newDiv)
    setTimeout(() => {
        newDiv.remove()
    }, 2000)
}


const addToDom = () => {
    data = ''
    myCars.forEach(car => {
        data += `
        <li class="car-item">
            <span class="car-details" id='item-id'>${car.id}</span>
            <span class="car-details" id='brand'>${car.brand}</span>
            <span class="car-details">${car.model}</span>
            <span class="car-details">${car.color}</span>
            <span class="car-details"><i class="fas fa-times remove"></i></span>
        </li>
      `
    })
    outputBoxText.innerHTML = data
    console.log(myCars)
}



const removeCar = (e) => {
    if (e.target.classList.contains('remove')) {
        const liItem = e.target.parentNode.parentNode
        const target = Number(e.target.parentNode.parentNode.querySelector('#item-id').innerText)
        console.log(target)
        myCars = myCars.filter(item => item.id !== target)
        addToLocal(myCars)
        liItem.remove()
        console.log(myCars)
        warnAdd('car removed!', 'danger')
    }
}


listItems.addEventListener('click', removeCar)


const clearInputs = () => {
    document.querySelector('#brand').value = ''
    document.querySelector('#model').value = ''
    chosenColor = ''
}

addBtn.addEventListener('click', createCar)



const filterCars = word => {
    const listItems = document.querySelector('ul')
    let listArr = Array.from(listItems.children)
    listArr
        .forEach(car => !car.textContent.replace(/(\r\n|\n|\r)/gm, "").trim().includes(word) ?
            car.classList.add('filtered') : car.classList.remove('filtered'))
}

searchInput.addEventListener('keyup', (e) => {
    const word = e.target.value.trim().toLowerCase()
    filterCars(word)
})