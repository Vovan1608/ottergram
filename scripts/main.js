"use strict";
/*
Текст внутри одиночных кавычек — селектор атрибута для нашего увеличенного изображения.
Это значит, что мы будем использовать эту строку для доступа к данному элементу.
 */
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
/*
Oбъявляем переменные для селектора названия увеличенного изображения и селектора
якоря миниатюры, присваиваем им строковые значения:
*/
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';

var ESC_KEY = 27;

/*
меняeт увеличенное изображение и его название.
*/
function setDetails(imageUrl, titleText) {
	var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
	detailImage.setAttribute('src', imageUrl);

	var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
	detailTitle.textContent = titleText;
}

/*
примет один параметр — thumbnail, представляющий собой ссылку на элемент-якорь
миниатюры, и будет извлекать и возвращать значение атрибута data-image-url.
*/
function imageFromThumb(thumbnail) {
	return thumbnail.getAttribute('data-image-url');
}

/*
принимаeт ссылку на элемент миниатюры и возвращать текст названия.
Она будет возвращать значение атрибута data-image-title.
*/
function titleFromThumb(thumbnail) {
	return thumbnail.getAttribute('data-image-title');
}

/*
принимать на входе ссылку на элемент миниатюры, после чего вызывать
функцию setDetails, передавая ей значения, полученные из вызовов функций
imageFromThumb и titleFromThumb.
*/
function setDetailsFromThumb(thumbnail) {
	setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

/*
функция, принимающая на входе миниатюру и добавля­ющая прослушиватель события
*/
function addThumbClickHandler(thumb){
	thumb.addEventListener('click', function (event) {
		event.preventDefault();
		setDetailsFromThumb(thumb);
		showDetails();
	});
}

/*
извлекаet все соответствующие THUMBNAIL_LINK_SELECTOR элементы и при-
сваивающий результат переменной thumbnails
*/
function getThumbnailsArray() {
	var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
	// способ преобразования из NodeList в массив
	var thumbnailArray = [].slice.call(thumbnails);
	return thumbnailArray;
}

/*
добавление имени класса в элемент <body>
*/
function hideDetails() {
	document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

/*
сделать увеличенное изображение снова видимым. Оно станет таким при щелчке на миниатюре.
*/
function showDetails() {
	var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
	document.body.classList.remove(HIDDEN_DETAIL_CLASS);
	frame.classList.add(TINY_EFFECT_CLASS);
	setTimeout(function () {
		//добавляет класс .is-tiny в элемент frame
		frame.classList.remove(TINY_EFFECT_CLASS);
	}, 50);
}

/*
вызываet метод document.body.addEventListener с передачей ему строки 'keyup'
и анонимной функции, объявляющей параметр event. Внутри тела этой анонимной
функции не забываем вызвать метод preventDefault для event
*/
function addKeyPressHandler() {
	document.body.addEventListener('keyup', function (event) {
		event.preventDefault();
		console.log(event.keyCode);
		// вызыватьфункцию hideDetails при нажатии ESC
		if (event.keyCode === ESC_KEY) {
			hideDetails();
		}
	});
}

/*
получит массив миниатюр. Далее он пройдет в цикле
по массиву, добавляя обработчик нажатий для каждой из них
*/
function initializeEvents() {
	var thumbnails = getThumbnailsArray();
	thumbnails.forEach(addThumbClickHandler);
	addKeyPressHandler();
}

initializeEvents();