const totalDistance = document.querySelector('#distance');
const lapDistance = document.querySelector('#lap-distance');

const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const hours = document.querySelector('#hours');

const calcBtn = document.querySelector('.calc-btn');
const resetBtn = document.querySelector('.reset-btn');
const result = document.querySelector('.result');
const error = document.querySelector('.error');

const checkInputs = () => {
	result.style.visibility = 'hidden';
	if (
		totalDistance.value == 0 ||
		lapDistance.value == 0 ||
		(hours.value == 0 && minutes.value == 0 && seconds.value == 0)
	) {
		error.textContent = 'Wypełnij wszystkie pola!';
		error.style.visibility = 'visible';
	} else if (hours.value > 59 || minutes.value > 59 || seconds.value > 59) {
		error.innerHTML =
			'Podany czas jest nieprawidłowy. <br> Godziny, minuty i sekundy nie mogą przekroczyć liczby 59.';
		error.style.visibility = 'visible';
	} else if (hours.value < 0 || minutes.value < 0 || seconds.value < 0) {
		error.innerHTML =
			'Podany czas jest nieprawidłowy. <br> Godziny, minuty i sekundy muszą być dodatnie.';
		error.style.visibility = 'visible';
	} else {
		calculate();
	}
};

const cleanInputs = () => {
	totalDistance.value = 0;
	lapDistance.value = 0;
	hours.value = '0';
	minutes.value = '0';
	seconds.value = '0';
};

const calculate = () => {
	let finalResult = '';
	const totalTime =
		parseFloat(seconds.value) +
		parseFloat(minutes.value) * 60 +
		parseFloat(hours.value) * 3600;

	const resultInSeconds =
		(totalTime / parseFloat(totalDistance.value)) * lapDistance.value;

	if (resultInSeconds < 60) {
		finalResult = resultInSeconds.toFixed(2);
	} else if (resultInSeconds < 3600) {
		finalResult = `${(resultInSeconds / 60).toFixed(0)}m ${(
			resultInSeconds % 60
		).toFixed(0)}`;
	} else {
		finalResult = `${(resultInSeconds / 3600).toFixed(0)}h ${(
			resultInSeconds % 60
		).toFixed(0)}m ${(resultInSeconds % 3600).toFixed(0)}`;
	}
	showResult(finalResult);
};

const showResult = finalResult => {
	error.style.visibility = 'hidden';
	result.style.visibility = 'visible';

	result.innerHTML = `Aby przebiec dystans ${totalDistance.value}m w czasie ${hours.value}h ${minutes.value}m ${seconds.value}s musisz każde <span class="marked-result">${lapDistance.value}m</span> pokonać w czasie <span class="marked-result">${finalResult}s</span>`;
	cleanInputs();
};

const resetAll = () => {
	cleanInputs();
	result.style.visibility = 'hidden';
	error.style.visibility = 'hidden';
};

calcBtn.addEventListener('click', checkInputs);
resetBtn.addEventListener('click', resetAll);
