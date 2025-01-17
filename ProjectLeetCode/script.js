document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".statscontainer");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-cards");
  const Elcircle=document.querySelectorAll(".circle");
  const copy=statsContainer.innerHTML;

  function validateUsername(username) {
    if (username.trim() == "") {
      alert("Username should not be empty");
      return false;
    }

    const regx = /^[a-zA-Z0-9_-]{3,16}$/;
    const ismatching = regx.test(username);
    if (!ismatching) {
      alert("invalid username");
      return false;
    }
    return ismatching;
  }
  
function updateprogress(solved,total,label, circle){
const percent=(solved/total)*100;
  circle.style.setProperty("--progress-degree", `${percent}%`);
  label.textContent = `${solved}/${total}`;
}



function displayuserdata(data){
const solvedEasy=data.easySolved;
const solvedMedium=data.mediumSolved;
const solvedHard=data.hardSolved;
const totalEasy=data.totalEasy;
const totalMedium=data.totalMedium;
const totalHard=data.totalHard;
updateprogress(solvedEasy,totalEasy,easyLabel,Elcircle[0]);
updateprogress(solvedMedium,totalMedium,mediumLabel,Elcircle[1]);
updateprogress(solvedHard,totalHard,hardLabel,Elcircle[2]);
}









async function fetchUserDetails(username){
    const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
    try{
        searchButton.textContent="Searching...";
        searchButton.disabled=true;
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch the user details");
        }
        const data=await response.json();
        console.log("Logging data: ",data);
        // if(data.status==="error"){
          
        //   throw new Error();
        // }
        // else{
        displayuserdata(data);
        
    }
    catch(error){
      statsContainer.innerHTML = `<p>No data found </p>`;
       
    }
    finally{
searchButton.textContent="Search";
searchButton.disabled=false;

    }



    
}


  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("logging username: ", username);
    if (validateUsername(username)) {
               fetchUserDetails(username);
    }
  });
});
