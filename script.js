function Slider (noOfScreen,stepTitles,animationTimeInMs) {
    this.currentScreenNo = 0;
    this.totalNoOfScreen = noOfScreen;
    this.stepTitles = stepTitles;

    // Store all the required dom node
    this.imageContainerBox = document.getElementById("image-container");
    this.stepTitleContainer = document.getElementById("step-title");
    this.stepCounterContainer = document.getElementById("step-counter");
    this.btn_group_container = document.getElementById("step-btn-container");

    this.animationTimeInMs = animationTimeInMs;
    this.imageContainerBox.style.transition = `${animationTimeInMs}ms ease-in-out` // set transtion for image slide
    this.timerIntervalInstance = null;// Will be use in case of auto slider
    const imageWidth = this.imageContainerBox.childNodes[1].offsetWidth;
    this.scrollPerScreen = (imageWidth - window.innerWidth)/(this.totalNoOfScreen-1);
    this.add_Btn_Events(); // for left/right button
    this.create_Btn_Group_And_Add_Events(noOfScreen) // for buttons group
    this.setScreenTitle(0);// set first screen title
    this.setContactPage_Postion(imageWidth); // set contact page position according to image width
}


Slider.prototype.create_Btn_Group_And_Add_Events = function (total_no_of_btn) {
    for(let i=0; i<=total_no_of_btn; i++) {   
        var button = document.createElement("button");  
        button.textContent = i;
        if(i == 0 || i == total_no_of_btn) {
            button.style.opacity = 0; // empty first & last button
        }
        button.onclick = ()=>{
            this.currentScreenNo = i;
            this.moveImageByCurrentScreenNo();
        }
        this.btn_group_container.appendChild(button);
        
    }
    this.btn_group_container.childNodes[1].classList.add('active'); // make first button active by default
}

Slider.prototype.add_Btn_Events = function () { // ADD EVENTS FOR LEFT/RIGHT BUTTONS
    const rightBtn = document.getElementById("scroll-right");
    const leftBtn = document.getElementById("scroll-left");
    rightBtn.addEventListener("click",()=>{
        this.moveRight();
    });
    leftBtn.addEventListener("click",()=>{
        this.moveLeft();
    });
}

Slider.prototype.moveImageByCurrentScreenNo = function () { // MOVE IMAGE ACCORDING TO SCREEN POSITION/STEP
    this.hideTitle_During_Animation(); // hide title when animating
    this.hideStepCounter_During_Animation(); // hide step counter when animating
    if(this.currentScreenNo == this.totalNoOfScreen+1) {
        this.currentScreenNo = 0;
    }
    var scroll = this.currentScreenNo*this.scrollPerScreen;
    if(this.currentScreenNo == this.totalNoOfScreen) {
        // scroll 80% when on last page
        scroll = (this.currentScreenNo-1)*this.scrollPerScreen + ((window.innerWidth*80)/100);
    }
    this.imageContainerBox.style.left = `-${scroll}px`; // set left postion of image
    this.setScreenTitle(this.currentScreenNo);
    this.setScreenCounter(this.currentScreenNo);
    this.showTitle_After_Animation(); // show title after animation
    this.showStepCounter_After_Animation(); // show step counter after animation
    this.setActiveButton(this.currentScreenNo);
}

Slider.prototype.moveLeft = function () { // MOVE IMAGE TO LEFT SIDE
    this.currentScreenNo++;
    this.moveImageByCurrentScreenNo();
}

Slider.prototype.moveRight = function () { // MOVE IMAGE TO RIGHT SIDE
    if(this.currentScreenNo != 0) {
        this.currentScreenNo--;
        this.moveImageByCurrentScreenNo();
    }
}

Slider.prototype.setScreenTitle = function (currentStep) { // SET SCREEN TITLE ACCORDING TO CURRENT STEP
 this.stepTitleContainer.textContent = this.stepTitles[currentStep]?.name || "No title";
 this.stepTitleContainer.setAttribute("class",this.stepTitles[currentStep]?.position || "")
}
Slider.prototype.setScreenCounter = function (currentStep) {
    this.stepCounterContainer.textContent = `Step ${currentStep} out of ${this.totalNoOfScreen-1} on the path to digital enlightenment`;
}
Slider.prototype.hideTitle_During_Animation = function () {
    this.stepTitleContainer.style.visibility = "hidden"
}
Slider.prototype.showTitle_After_Animation = function () {
    if(this.currentScreenNo < this.totalNoOfScreen) { // Don't show on last screen
        setTimeout(()=>{
            this.stepTitleContainer.style.visibility = 'visible';
        },this.animationTimeInMs) // visible after 1 sec
    }
}

Slider.prototype.hideStepCounter_During_Animation = function () {
    this.stepCounterContainer.style.visibility = "hidden";
}
Slider.prototype.showStepCounter_After_Animation = function () {
    if(this.currentScreenNo < this.totalNoOfScreen && this.currentScreenNo > 0) { // Don't show on first & last screen
        setTimeout(()=>{
            this.stepCounterContainer.style.visibility = 'visible';
        },this.animationTimeInMs) // visible after 1 sec
    }
}
Slider.prototype.setContactPage_Postion = function (imageWidth) {
    let contactArea_Container = document.getElementById("contact-area");
    contactArea_Container.style.left = imageWidth +'px';
    contactArea_Container.style.width = (window.innerWidth*80)/100 + 'px'// set width 80% of viewport width
}
Slider.prototype.setActiveButton = function (currentScreenNo) {
    const currentActiveBtn = this.btn_group_container.querySelector('.active');
    currentActiveBtn.classList.remove('active');
    this.btn_group_container.childNodes[currentScreenNo+1].classList.add('active');
}
Slider.prototype.startAutoSilder = function (timeInMs) { // START AUTOMATIC SLIDER
  this.timerIntervalInstance = setInterval(()=>{
      this.currentScreenNo++;
      this.moveImageByCurrentScreenNo();
  },timeInMs)
}





// Initialize silder
const stepTitles = [
    {name:'we are breaking our vow  silence',position:'top'},
    {name:'talent is given true skill is earned',position:'left'},
    {name:'be flexible to change and sturdy in conviction',position:'left'},
    {name:'use many skills yet work as one',position:'right'},
    {name:'to master anything find interest in everything',position:'right'},
    {name:'individuals flourish if culture and wisdom are shared',position:'right'},
    {name:'train for perfection but aim for more',position:'left'},
    {name:'take pride in your work but do not seek praise',position:'left'},
    {name:'temporary sacrifices brings lasting results',position:'left'}
];
const animationTimeInMs = 1000;
window.onload = function () {
 const slider = new Slider(9,stepTitles,animationTimeInMs);
  // IF YOU WANT AUTO SLIDER JUST UNCOMMENT THESE BELOW CODES
   // const autoSliderTime = 2000;
  // slider.startAutoSilder(autoSliderTime); 
}

