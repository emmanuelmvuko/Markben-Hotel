document.getElementById('arrival').addEventListener('input', function() {
    var selectedDate = new Date(this.value); 
    
    if (selectedDate.getDay() === min || selectedDate.getDay() <= min){
        alert('Please choose a date that is after today');
        this.value = '';
    }
});


document.getElementById('Departure').addEventListener('input', function() {
    var selectedDate = new Date(this.value);
    
    if (selectedDate.getDay() === min || selectedDate.getDay() <= min){
        alert('Please choose a date that is after today');
        this.value = '';
    }
});



const readMoreBtn1 = document.getElementById('read-more1');
const readLessBtn1 = document.getElementById('read-less1');
const shortDescription1 = document.getElementById('short-description1');
const fullDescription1 = document.getElementById('full-description1');

readMoreBtn1.addEventListener('click', function() {
fullDescription1.style.display = 'block';
shortDescription1.style.display = 'none';
readMoreBtn1.style.display = 'none';
readLessBtn1.style.display = 'inline-block';
});

readLessBtn1.addEventListener('click', function() {
fullDescription1.style.display = 'none';
shortDescription1.style.display = 'block';
readMoreBtn1.style.display = 'inline-block';
readLessBtn1.style.display = 'none';
});

const readMoreBtn2 = document.getElementById('read-more2');
const readLessBtn2 = document.getElementById('read-less2');
const shortDescription2 = document.getElementById('short-description2');
const fullDescription2 = document.getElementById('full-description2');

readMoreBtn2.addEventListener('click', function() {
fullDescription2.style.display = 'block';
shortDescription2.style.display = 'none';
readMoreBtn2.style.display = 'none';
readLessBtn2.style.display = 'inline-block';
});

readLessBtn2.addEventListener('click', function() {
fullDescription2.style.display = 'none';
shortDescription2.style.display = 'block';
readMoreBtn2.style.display = 'inline-block';
readLessBtn2.style.display = 'none';
});

const readMoreBtn3 = document.getElementById('read-more3');
const readLessBtn3 = document.getElementById('read-less3');
const shortDescription3 = document.getElementById('short-description3');
const fullDescription3 = document.getElementById('full-description3');

readMoreBtn3.addEventListener('click', function() {
fullDescription3.style.display = 'block';
shortDescription3.style.display = 'none';
readMoreBtn3.style.display = 'none';
readLessBtn3.style.display = 'inline-block';
});

readLessBtn3.addEventListener('click', function() {
fullDescription3.style.display = 'none';
shortDescription3.style.display = 'block';
readMoreBtn3.style.display = 'inline-block'; 
readLessBtn3.style.display = 'none'; 
});



//video javascript//
const video = document.getElementById('video-placeholder');
const fullscreenvideo = document.getElementById('fullscreen-video');
video.addEventListener('click', function() {
    video.style.opacity = '0';
    fullscreenvideo.style.opacity = '1';
});
fullscreenvideo.addEventListener('click', function() {
    video.style.opacity = '1';
    fullscreenvideo.style.opacity = '0';
});




/*BOOKING*/



document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var arrivalDate = document.getElementById("arrivalDate").value;
    var departureDate = document.getElementById("departureDate").value;
    var adults = document.getElementById("adults").value;
    var children = document.getElementById("children").value;
    var rooms = document.getElementById("rooms").value;
    
    console.log("Arrival Date:", arrivalDate);
    console.log("Departure Date:", departureDate);
    console.log("Number of Adults:", adults);
    console.log("Number of Children:", children);
    console.log("Number of Rooms:", rooms);
  });
  