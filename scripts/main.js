/*
Текст внутри одиночных кавычек — селектор атрибута для нашего увеличенного изображения.
Это значит, что мы будем использовать эту строку для доступа к данному элементу.
 */
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
/*
Oбъявляем в файле main.js переменные для селектора названия увели-
ченного изображения и селектора якоря миниатюры, присваиваем им строковые
значения:
*/
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

/*
меняeт увеличенное изображение и его название.
*/
function setDetails(imageUrl, titleText) {
	'use strict';
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
	'use strict';
	return thumbnail.getAttribute('data-image-url');
}

/*
принимаeт ссылку на элемент миниатюры и возвращать текст названия.
Она будет возвращать значение атрибута data-image-title.
*/
function titleFromThumb(thumbnail) {
	'use strict';
	return thumbnail.getAttribute('data-image-title');
}

/*
принимать на входе ссылку на элемент миниатюры, после чего вызывать
функцию setDetails, передавая ей значения, полученные из вызовов функций
imageFromThumb и titleFromThumb.
*/
function setDetailsFromThumb(thumbnail) {
	'use strict';
	setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

/*
функция, принимающая на входе миниатюру и добавля­ющая прослушиватель события
*/
function addThumbClickHandler(thumb){
	'use strict';
	thumb.addEventListener('click', function (event) {
		event.preventDefault();
		setDetailsFromThumb(thumb);
	});
}

/*
извлекаet все соответствующие THUMBNAIL_LINK_SELECTOR элементы и при-
сваивающий результат переменной thumbnails
*/
function getThumbnailsArray() {
	'use strict';
	var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
	// способ преобразования из NodeList в массив
	var thumbnailArray = [].slice.call(thumbnails);
	return thumbnailArray;
}

/*
Этот метод свяжет воедино все шаги по превращению Ottergram в интерактивное
приложение. Во-первых, он получит массив миниатюр. Далее он пройдет в цикле
по массиву, добавляя обработчик нажатий для каждой из них
*/
function initializeEvents() {
	'use strict';
	var thumbnails = getThumbnailsArray();
	thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();