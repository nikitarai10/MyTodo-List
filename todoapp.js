showall();

// Displaying the DATE//
let date = document.querySelector('.date');
let today = new Date();

let option = {
    month : 'short',
    weekday : 'long',
    day : 'numeric'
}

date.textContent = today.toLocaleDateString("en-US",option); 

//Storing the list in localstorage

let addbtn = document.getElementById('addlistbtn');
let inputfield = document.getElementById('inputfield');
addbtn.addEventListener('click',()=>{
let inputvalue = inputfield.value;
if(inputvalue.trim()!=0){
    let webtask = localStorage.getItem('localtask');
    if(webtask === null){
        listobject = [];
    }else{
        listobject =JSON.parse(webtask);
    }
    listobject.push(inputvalue);
     localStorage.setItem('localtask',JSON.stringify(listobject));
     showall();
     inputfield.value = '';
}
});

//the main function//
//displaying list on screen//

function showall(){
    let webtask = localStorage.getItem('localtask');
    if(webtask === null){
        listobject = [];
    }else{
        listobject =JSON.parse(webtask);
    }
    let displaylist = document.querySelector('.table');
  let show = '';
  listobject.forEach((item,index) => {
      show += `
      <tr>
        <th>${index+1}</th>
        <td colspan="4">${item}</td>
        <td>
        <label for="edit">
        <i class="fa fa-edit" title="edit"></i>
        </label>
        <button type="button" class="editbtn" onclick="editlist(${index})" id="edit">Edit</button>
        </td>
        <td>
        <label for="del">
        <i class="fa fa-trash"></i>
          </label>
        <button type="button" onclick="deleteitem(${index})" class="deletebtn" id="del">Delete</button>
        </td>
    </tr>`;
 });
  displaylist.innerHTML = show;
}

//Editing part

let savebtn = document.getElementById('savelistbtn');
let saveindex = document.getElementById('saveindex');
function editlist(index){
    saveindex.value = index;
    let webtask = localStorage.getItem('localtask');
    let listobject = JSON.parse(webtask);
    inputfield.value = listobject[index];
     addbtn.style.display = "none";
     savebtn.style.display = 'inline-block';
}


//saving the edited list//

   savebtn.addEventListener('click',function(){
    let index = saveindex.value;
    let webtask = localStorage.getItem('localtask');
    let listobject = JSON.parse(webtask);
    listobject[index]=inputfield.value;
    savebtn.style.display = "none";
    addbtn.style.display = "inline-block";
    localStorage.setItem('localtask',JSON.stringify(listobject));
    inputfield.value = '';
    showall();
});

   // Deleting the list//

function deleteitem(index){
    let webtask = localStorage.getItem('localtask');
    let listobject = JSON.parse(webtask);
    listobject.splice(index,1);
    inputfield.value = '';
    addbtn.style.display = "inline-block";
    savebtn.style.display = "none";
    localStorage.setItem('localtask',JSON.stringify(listobject));
    showall();
}

//Delete all the list

let delall = document.getElementById("resetbtn");
delall.addEventListener('click',()=>{
    let webtask = localStorage.getItem('localtask');
   let taskobject = JSON.parse(webtask);
   if(webtask !== null){
     taskobject = [];
   }
   localStorage.setItem('localtask',JSON.stringify(taskobject));
   showall();
});