const TopNav = document.querySelector(".fixed-top-nav")
const exteriorimgBtn = document.querySelector("#exterior-btn")
const interiorImgBtn = document.querySelector("#interior-btn")
const exteriorImg = document.querySelector("#exterior-img");
const interriorImg = document.querySelector("#interior-img")
const standardBtn = document.querySelector(".btn-con")
const performancePackage = document.querySelector(".performance-section .btn")
const selfDriving = document.querySelector(".self-driving-sec input");
const checkBoxes = document.querySelectorAll('.performance-section input[type="checkbox"]');
const totalPrice = document.querySelector("#Price")

let currentCar = "quicksilver"; ;
const currentPrice = 45000;
let newPrice = currentPrice

let selectedOptions = {
  "Performance Wheels" : false,
  "Performance Package"  : false,
  "Full Self Driving" : false ,

  "Accessories" : {
    "console-trays" : false ,
    "Sunshade"  : false ,
    "InteriorLens" : false
  }
}

const selectedPrices = {
  "Performance Wheels" : 2500,
  "Performance Package"  : 5000,
  "Full Self Driving" : 8500 ,

  "Accessories" : {
    "console-trays" : 45 ,
    "Sunshade"  : 56 ,
    "InteriorLens" : 54 ,
  }
}

let currentInterior ;

// Top Nav Display 
function handleScroll() {
  const atTop = window.scrollY === 0;
  TopNav.classList.toggle("active-bar", atTop);
  TopNav.classList.toggle("hidden-bar", !atTop);
}


// Default Car Display
const showDefault = (currentColor , currentInte)=>{
   exteriorImg.src = `./images/model-y-${currentColor}.jpg`;
   interriorImg.src = `./images/model-y-interior-${currentInte}.jpg`;
}


const handleBtnClick = (e)=>{
  let button; 
  console.log(e);
  if (e.target.tagName === "IMG") {
    button = e.target;
    currentCar = e.target.alt;
    currentInterior = e.target.alt;
  }

  if (button) {
    // Handle Buttons Selection
    const Exbuttons = e.currentTarget
      .querySelectorAll(".color")
      .forEach((btn) => {
        btn.classList.remove("selected");
      });
    button.classList.add("selected");

    const Intbuttons = e.currentTarget
      .querySelectorAll(".inte")
      .forEach((btn) => {
        btn.classList.remove("selected");
      });
    button.classList.add("selected");
  }

  // Handle Exterior Image Selection
    if (button.className.includes("color") && button.alt === currentCar) {
        updateWheelsLogic();
    }
    
  // Handle Interrior Image Selection
  if (button.className.includes("inte") && button.alt === currentInterior) {
    interriorImg.src = `./images/model-y-interior-${currentInterior}.jpg`;
  }

} 

// Update Wheels and color selection
const updateWheels = (e, status)=>{
  let btn ;
  if(e.target.tagName === "BUTTON"){
    btn = e.target;
  }

  if (btn){
    const uniqueBtn = e.currentTarget.querySelectorAll(".wheels-txt");
    uniqueBtn.forEach(btns =>{
      btns.classList.remove("active")
    })

    btn.classList.add("active")
    selectedOptions["Performance Wheels"] = btn.id.includes("performance");
    updateWheelsLogic()
    updatePrices()
  } 
}

// Perfromance Section
function performancePackageHandler(){
  performancePackage.classList.toggle("active")
  selectedOptions["Performance Package"] = performancePackage.className.includes("active")
  setTimeout(() => {
     updatePrices();
  }, 400);
}

// Self Driving Section

function selfDrivingHandler(e){
  e.target.parentElement.parentElement.classList.toggle("checked")
  selectedOptions["Full Self Driving"] = selfDriving.checked;

  setTimeout(function(){
    updatePrices()
  }, 400)
}

// Update Checkboxes Price
// function updateCheckboxesPrice(e){
//   let chosen = e.target.parentElement.id ;
//   let status = e.target.checked;
//   const AccessoryPrice = selectedPrices["Accessories"][`${chosen}`];

//   selectedOptions["Accessories"][`${chosen}`] = status ;
//   if (status){
//     newPrice += AccessoryPrice
//     updatePrices()
//   }
  
// } 

// Update Wheels and Car color
function updateWheelsLogic(){
  const performanceCheck = selectedOptions["Performance Wheels"] ? "-performance" : ""
  exteriorImg.src = `./images/model-y-${currentCar}${performanceCheck}.jpg`;
}

// Update Prices
function updatePrices(){
  newPrice = currentPrice;
  if (selectedOptions["Performance Wheels"]){
    newPrice += selectedPrices["Performance Wheels"]
   }
  
   if (selectedOptions["Performance Package"]){
    newPrice += selectedPrices["Performance Package"]
   }

   if(selectedOptions["Full Self Driving"]){
    newPrice += selectedPrices["Full Self Driving"]
   }

   checkBoxes.forEach(ch =>{
    let status = ch.checked ;
    const AccessoryPrice = selectedPrices["Accessories"][`${ch.parentElement.id}`]
    if (status){
      newPrice += AccessoryPrice
    }
   })

    totalPrice.textContent = `$${newPrice.toLocaleString()}`;
    console.log(totalPrice.textContent);

}

// Nav Visibviliity logic
window.addEventListener("scroll" ,()=> requestAnimationFrame(handleScroll));
window.addEventListener(
  "DOMContentLoaded",
  showDefault(currentCar, "light")
);



// Button event listeners
exteriorimgBtn.addEventListener("click" ,handleBtnClick);
interiorImgBtn.addEventListener("click" ,handleBtnClick);
standardBtn.addEventListener("click", updateWheels);
performancePackage.addEventListener("click" , performancePackageHandler )
selfDriving.addEventListener("click" , selfDrivingHandler)
checkBoxes.forEach(ch =>{
  ch.addEventListener("change", updatePrices)
})