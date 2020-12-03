// variables
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAll = document.querySelector('#btndeleteAll');
const taskList = document.querySelector('#task-List');
let items ;
eventListeners();

//load items 
loadItems();
function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);
    //delete an item 
    taskList.addEventListener('click', deleteItem);
    // delete all items
    btndeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems(){
    item = getItemFromLS();
    items.forEach(function(item){
        creatItems(item);
    })
}

function getItemFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function creatItems(text){
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-primary';
    li.appendChild(document.createTextNode(text));
    // create a 
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute = ('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    // add a to li 
    li.appendChild(a);
    //add li to ul 
    taskList.appendChild(li);

}

function addNewItem(e) {

    if (input.value == '') {
        alert('add new item');
    }
    //creat li
    creatItems(input.value);
    // save item ls
    setItemtoLS(input.value);
    // clear input 
    input.value = '';

    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        
        DeleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
}

function deleteAllItems(e) {
    if (confirm('are you sure ? ')) {
        taskList.innerHTML = '';
    }
    localStorage.clear();
    e.preventDefault();
}

function setItemtoLS(text){
    item = getItemFromLS();
    item.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function DeleteItemFromLS(text){
    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item === text){
        items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}