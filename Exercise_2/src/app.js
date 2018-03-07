import Clock from '../src/config';

const handlebars = require('handlebars');

//clock containers
const analogClock = document.querySelector('.analog-clock');
const digitalClock = document.querySelector('.digital-clock');

// time form
const timeForm = document.querySelector('#timeForm');
const startButton = document.querySelector('#runTime');
const stopButton = document.querySelector('#stopTime');
const hourInput = document.querySelector('#hour');
const minuteInput = document.querySelector('#minute');
const showAnalog = document.querySelector('#analog');
const showDigital = document.querySelector('#digital');

//switch disabled buttons
function disableButtons(elem1,elem2){
	elem1.setAttribute('disabled','disabled');
	elem2.removeAttribute('disabled');
}

//set analog clock hand positions
function setHandPositions(hour,minute,seconds){
	//clock hand elements
	const hourHand = document.querySelector('.hour-hand');
	const minuteHand = document.querySelector('.minute-hand');
	const secondsHand = document.querySelector('.seconds-hand');

	hourHand.style.setProperty('--deg-rotate', `rotate(${hour}deg)`);
	minuteHand.style.setProperty('--deg-rotate', `rotate(${minute}deg)`);
	secondsHand.style.setProperty('--deg-rotate', `rotate(${seconds}deg)`);
}

//some creepy add ons
function creepy(){
	const creepySheeeet = document.querySelector('.creepy');

	setTimeout(function(){
		creepySheeeet.classList.add('show');
	}, 3000);
}

let interval = '',
	currentSeconds = 0;

const digitalClockScript = document.querySelector('#digital-template');
const labelsContainer = document.querySelector('.outer-case');
const digitalContext = {
	currentHour: '00',
	currentMinute: '00',
	currentSeconds: '00'
};
const digitalTemplate = handlebars.compile(digitalClockScript.innerHTML);
labelsContainer.innerHTML = digitalTemplate(digitalContext);

timeForm.addEventListener('submit', function(e){
	e.preventDefault();

	disableButtons(startButton,stopButton);
	
	const clock = new Clock(hourInput.value, minuteInput.value);

	let currentMinute = clock.minute,
		currentHour = clock.hour,
		currentMinuteDeg = clock.minuteDeg,
		currentHourDeg = clock.hourDeg + (Math.floor(currentMinuteDeg/72) * 6);

	setHandPositions(currentHourDeg,currentMinuteDeg,(currentSeconds * 6));
	
	digitalContext.currentHour = (currentHour > 9) ? currentHour : `0${currentHour}`;
	digitalContext.currentMinute = (currentMinute > 9) ? currentMinute : `0${currentMinute}`;
	digitalContext.currentSeconds = (currentSeconds > 9) ? currentSeconds : `0${currentSeconds}`;

	labelsContainer.innerHTML = digitalTemplate(digitalContext);

	interval = setInterval(function(){
		currentSeconds++;

		if((currentSeconds * 6) == 360){
			currentSeconds = 0;
			currentMinute++;
			currentMinuteDeg = (currentMinute * 6);

			if(currentMinuteDeg % 72 == 0){
				currentHourDeg +=6;
			}

			if((currentMinute*6) == 360){
				currentHour++;
				currentMinute = 0;
			}

			if((currentHour * 30) == 720){
				creepy(); // for midnight only

				currentHour = 0;
				currentHourDeg = 0;
			}
		}

		setHandPositions(currentHourDeg,currentMinuteDeg,(currentSeconds * 6));

		digitalContext.currentHour = (currentHour > 9) ? currentHour : `0${currentHour}`;
		digitalContext.currentMinute = (currentMinute > 9) ? currentMinute : `0${currentMinute}`;
		digitalContext.currentSeconds = (currentSeconds > 9) ? currentSeconds : `0${currentSeconds}`;

		labelsContainer.innerHTML = digitalTemplate(digitalContext);
	}, 1000);
});

stopButton.addEventListener('click', function(){
	disableButtons(this, startButton);

	clearInterval(interval);
});

showAnalog.addEventListener('click', function(){
	disableButtons(this, showDigital);

	analogClock.style.display = 'block';
	digitalClock.style.display = 'none';
});

showDigital.addEventListener('click', function(){
	disableButtons(this,showAnalog);

	digitalClock.style.display = 'block';
	analogClock.style.display = 'none';
});

