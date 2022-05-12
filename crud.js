const userName=document.getElementById('userName');
const designation=document.getElementById('designation');
const salary=document.getElementById('salary');


const  tdNode1 = document.getElementById("error1")
const  tdNode2 = document.getElementById("error2")
const  tdNode3 = document.getElementById("error3")


const border1 = "2px solid red";
const border2 = "2px solid green";
const defaultBorder='1px solid black'



function validateUserName(){
  tdNode1.textContent = ""
  let userNameVal = userName.value;
  userNameVal = userNameVal.replace(/\s/g, "");
  let regExp= new RegExp("^[A-Za-z]*$");
  if (userNameVal === ''){
     
      return false;
  }else if(regExp.test(userNameVal)==false){
      tdNode1.textContent = "*Name should be only alphabets"
      return false;
  }
  else{
      userName.style.border = border2;
      return true;
  }
}

function validateDesignation(){
  tdNode2.textContent = ""
  let designationVal = designation.value;
  designationVal = designationVal.replace(/\s/g, "");
  let regExp= new RegExp("^[A-Za-z]*$");
  if (designationVal === ''){
      
      return false;
  }else if(regExp.test(designationVal)==false){
      tdNode2.textContent = "*Name should be only alphabets"
      return false;
  }
  else{
      designation.style.border = border2;
      return true;
  }
}


function validateSalary() {
  let salaryVal = salary.value;
  let regExp=new RegExp("^[0-9]*$");
  tdNode3.textContent="";

  if ( salaryVal == '') {
    
      return false;
  }else if(regExp.test(salaryVal)==false){
      tdNode3.textContent = "*should contain only digits";
      salary.style.border =border1;
      return false;
  }

  else {
      salary.style.border = border2;
      return true;
} 
}


function validateForm(){
  
  return  (validateSalary()&&validateDesignation() && validateUserName())
}


console.log(validateForm())
const usersList=document.querySelector('.users-list');
const userGroup=document.querySelector('.add-user-group');

const submitBtn=document.querySelector('.btn');



const url ='https://48f9-2409-4070-4289-8ee0-f475-2b44-6e02-7476.in.ngrok.io/api/users';

let output=''

const renderUsers=(users)=>{
  users.map(user => {
    console.log(user)
 
    output+=`
    <tr class="" id=${user._id}>
 <td class="id">${user._id}</td>
 <td class="title">${user.name}</td>
 <td class="designation mb-2">${user.designation}</td>
<td class="salary">${user.salary}</td>
<td>
<a href="#" class="card-link" id="editUser">Edit</a>
<a href="#" class="card-link"  id="deleteUser">Delete</a>
</td>
</tr>
    `
});

usersList.innerHTML=output;
console.log(usersList.parentElement.children.length)



}

console.log(usersList)
//GET METHOD
fetch(url)
.then(res=>res.json())
.then(data=>{
  console.log(data)
  renderUsers(data)});

usersList.addEventListener('click',(e)=>{
  // console.log(e.target.id);
  e.preventDefault();
  let editBtnPressed=e.target.id=='editUser'
  let deleteBtnPressed=e.target.id=='deleteUser';

let idVal=e.target.parentElement.parentElement.id;
console.log(idVal)
console.log(usersList.parentElement.children.length)
  //DELETE METHOD;

  if(deleteBtnPressed){
    console.log("user deleted")
    fetch(`${url}/${idVal}`,{
      method:'DELETE',
    })
    .then(res=>res.json())
    .then(()=>location.reload())
    .catch(err=>console.log(err));
    console.log(usersList.parentElement.children.length)
  }

  if(editBtnPressed){
    const parent=e.target.parentElement.parentElement;
    // console.log(parent)
    const employeeName=parent.querySelector('.title').innerHTML;
    const designationContent=parent.querySelector('.designation').textContent;
    const salaryContent=parent.querySelector('.salary').textContent;
    userName.value=employeeName;
    designation.value=designationContent;
   salary.value=salaryContent
   submitBtn.textContent="Update"
    submitBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      if(validateForm()==true){
       
      fetch(`${url}/${idVal}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify({
          name:userName.value,
          designation:designation.value,
          salary:salary.value
        })
      })
      .then(res=>res.json())
      .then(()=>location.reload())
   
      userName.value='';
      designation.value='';
      salary.value='';
      userName.style.border=defaultBorder;
      designation.style.border=defaultBorder;
      salary.style.border=defaultBorder;
      submitBtn.textContent="Add Employee";
    }
    })
    
  }
//update the data

})

// POST METHOD
  userGroup.addEventListener('submit',(e)=>{
 
      e.preventDefault();
    // console.log('form submitted')
  
    console.log(designation.value)
  
      console.log(validateForm());
      if(validateForm()==true){
        fetch(url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name:userName.value,
            designation:designation.value,
            salary:salary.value
      
          })
        })
        .then(res=>res.json())
        .then(data =>{
          console.log(data)
          const dataArr=[];
          dataArr.push(data);
          console.log(dataArr)
          renderUsers(dataArr);
          
        })

      }
       
  
    
   
    userName.value='';
    designation.value='';
    salary.value=''
    userName.style.border=defaultBorder;
    designation.style.border=defaultBorder;
    salary.style.border=defaultBorder;
    
  })





