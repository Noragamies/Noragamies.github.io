const url = 'https://script.google.com/macros/s/AKfycbzsZxBGzYG5ep0OTmRWCi6E-8aazMfepW9PMBCBPQvAKUvD7HKn5e9rlqtQ8dWTaOj7/exec'

const d = new Date()

const calendarE = document.getElementById('calendar')
const dayTemplate = document.getElementById('day-template')
const listItemTemplate = document.getElementById('list-item-template')

for (let i = 0; i < 6; i++) {
    d.setDate(d.getDate() + 1)
    const day = d.getUTCDate().toString().padStart(2, '0')

    d.setMonth(d.getMonth())
    const month = d.getUTCMonth().toString().padStart(2, '0')

    d.setFullYear(d.getFullYear())
    const year = d.getUTCFullYear().toString().padStart(4, '0')

    const dayTemplateClone = dayTemplate.cloneNode(true)
    dayTemplateClone.id = year + '-' + month + '-' + day
    dayTemplateClone.className = 'date-' + String(i)
    const h2Element = dayTemplateClone.firstElementChild
    const ulElement =  h2Element.nextElementSibling
    ulElement.id = 'ul-list-' + dayTemplateClone.id
    const liElement = ulElement.firstElementChild
    var form = liElement.firstElementChild
    const eventInputBox = form.firstElementChild
    const inputBtn = eventInputBox.nextElementSibling
    const dateInputBox = inputBtn.nextElementSibling
    dateInputBox.id = dateInputBox.id + '-' + dayTemplateClone.id
    dateInputBox.value = dayTemplateClone.id
    form.id = 'sheetdb-form-' + dayTemplateClone.id
    h2Element.id = 'daytitle-' + dayTemplateClone.id
    console.log('daytitle-' + dayTemplateClone.id)
    h2Element.innerText = dayTemplateClone.id
    eventInputBox.id = eventInputBox.id + '-' + dayTemplateClone.id
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(form.action, {
            method : 'POST',
            body : new FormData(document.getElementById('sheetdb-form-' + dayTemplateClone.id)),
            redirect: 'manual'
        }).then((res) => {
            if (res.ok) eventInputBox.value = ''
        })
        return false
    })
    inputBtn.id = inputBtn.id + '-' + dayTemplateClone.id
    calendarE.appendChild(dayTemplateClone)
}


function addListItem(date, event) {
    const listItemTemplateClone = listItemTemplate.cloneNode(true)
    listItemTemplateClone.innerText = String(event)
    listItemTemplateClone.id = ''
    const targetDay = document.getElementById('ul-list-' + String(date))
    targetDay.insertBefore(listItemTemplateClone, targetDay.firstElementChild)

}


window.onload = pullEvents

function pullEvents() {
    fetch(url, {
        method : 'GET',
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        events = data.test1
        console.log(events)
        events.forEach(function (e) {
            dateK = e[0]
            eventK = e[1]
            console.log(typeof dateK)
            console.log(typeof eventK)
            addListItem(dateK, eventK)
        });
        return
    })
};
