// СОЗДАЕМ ПОЛЕ

let field = document.createElement('div'); //создаем новый div (блок)
document.body.appendChild(field); // добавляем в body документа, где вызывается данный скрипт, field (он же новый div)
field.classList.add('field'); // присваиваем этому div класс field, по которому будут подтягиваться стили из css файла

//РАЗБИВАЕМ ПОЛЕ НА ЯЧЕЙКИ

for (let i=1; i<101; i++) { //разбиваем див на 100 ячеек
	let excel = document.createElement('div'); //создаем клетку как блок div
	field.appendChild(excel); //добавляем в наш филд 1 ячейку
	excel.classList.add('excel'); // присваиваем этой ячейке класс excel, по которому будут подтягиваться стили из css файла
}

//ПРИСВАИВАЕМ КООРДИНАТЫ КАЖДОЙ ЯЧЕЙКЕ

let excel = document.getElementsByClassName('excel'); //находим все ячейки по общему признаку (у нас это класс excel)

/*---ДЛЯ ПРОВЕРКИ - ПРИСВОИМ АТРИБУТЫ 1-Й ЯЧЕЙКЕ---
excel[0].setAttribute('posX', 'test'); //присвоим 1-й клетке атрибут posХ со значением test
excel[0].setAttribute('posY', 'test'); //присвоим 1-й ячейке*/
let x = 1,
    y = 10; //создаем переменные координат (1-я ячейка)
for (let i = 0; i<excel.length; i++) {
	if (x>10){
		x = 1;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;	
}

//СОЗДАЕМ ЗМЕЮ

function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3); //x=рандомному числу от 0 до 1 с округлением к ближайшему целому и умножаем на макс-мин - будет от 0 до 9 и + 1 - будет от 1 до 10 
	let posY = Math.round(Math.random() * (10 - 1) + 1); //то же что и для х
	return [posX, posY]; //функция возвращает массив из полученных значений (координаты)
}

let coordinates = generateSnake();

//ПРОВЕРКА РАБОТЫ ФУНКЦИИ ДЖЕНЕРЕЙТСНЕЙК С ВЫВОДОМ РЕЗУЛЬТАТА В КОНСОЛЬ
/*console.log(coordinates);
console.log(coordinates[0]);
console.log(coordinates[1]);*/

let snakeBody = [document.querySelector('[posX = "'+ coordinates[0] +'"][posY = "'+ coordinates[1] +'"]'), document.querySelector('[posX = "'+ (coordinates[0] - 1) +'"][posY = "'+ coordinates[1] +'"]'), document.querySelector('[posX = "'+ (coordinates[0] - 2) +'"][posY = "'+ coordinates[1] +'"]')]; //кюриселектор возвращает первый элемент документа по данным - тут снейкБоди будет массивом из элементов, допустим, [5;6, 4;6, 3;6]

snakeBody[0].classList.add('head');

for (let i = 0; i<snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}

//СОЗДАЕМ МИШЬ

let mouse;

function createMouse() {
	function generateMouse(){
		let posX = Math.round(Math.random() * (10 - 1) + 1); //x=рандомному числу от 0 до 1 с округлением к ближайшему целому и умножаем на макс-мин - будет от 0 до 9 и + 1 - будет от 1 до 10 
	    let posY = Math.round(Math.random() * (10 - 1) + 1); //то же что и для х
	    return [posX, posY]; //функция возвращает массив из полученных значений (координаты)
	}
	
	let mouseCoordinates = generateMouse();
	
	mouse = document.querySelector('[posX = "'+ mouseCoordinates[0] +'"][posY = "'+ mouseCoordinates[1] +'"]'); //наружные квадратные скобки не нужны, потому что это не массив как в случае со змеей
	
	while(mouse.classList.contains('snakeBody')){
		let mouseCoordinates = generateMouse();
		mouse = document.querySelector('[posX = "'+ mouseCoordinates[0] +'"][posY = "'+ mouseCoordinates[1] +'"]');
	}
			
	mouse.classList.add('mouse');	
}

createMouse();
//ДВИГАЕМСЯ ВПРАВО

let direction = 'right'; // создадим переменную для хранения направления
let steps = false;
let input = document.createElement('input');
document.body.appendChild(input);
//запишем стили для инпут не изменяя файл цсс
input.style.cssText = 
   `margin: auto;
	margin-top: 40px;
	font-size: 20px;
	display: block;`
	;


let score = 0;
var intr = 300
input.value = `Ваши очки: ${score}`;



function move(){
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'),snakeBody[0].getAttribute('posY')];
	
	snakeBody[0].classList.remove('head');//удаляем для головы класс хед (очищаем поле от картинки с головой)
	
	snakeBody[snakeBody.length-1].classList.remove('snakeBody'); //удаляем для последнего элемента класс снейкБоди (очищаем поле от картинки с чешуей)
	
	snakeBody.pop(); // удаляем последний элемент из массива
	
	if (direction == 'right') {
		if (snakeCoordinates[0] < 10){
			snakeBody.unshift(document.querySelector('[posX = "'+ (+ snakeCoordinates[0] + 1) +'"][posY = "'+ snakeCoordinates[1] +'"]')); //добавляем на первое место массива ячейку с координатой х+1 (теперь у нас опять 3 элемента массива)
		} else {
			snakeBody.unshift(document.querySelector('[posX = "1"][posY = "'+ snakeCoordinates[1] +'"]')); //если вышел за правую границу перемещаем голову на другую сторону
		}
	} else if (direction == 'left') {
		if (snakeCoordinates[0] > 1) {
			snakeBody.unshift(document.querySelector('[posX = "'+ (+ snakeCoordinates[0] - 1) +'"][posY = "'+ snakeCoordinates[1] +'"]')); //добавляем на первое место массива ячейку с координатой х+1 (теперь у нас опять 3 элемента массива)
		} else {
			snakeBody.unshift(document.querySelector('[posX = "10"][posY = "'+ snakeCoordinates[1] +'"]')); //если вышел за левую границу перемещаем голову на другую сторону
		}
	} else if (direction == 'up') {
		if (snakeCoordinates[1] < 10) {
			snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] +'"][posY = "'+ (+snakeCoordinates[1] + 1) +'"]')); //добавляем на первое место массива ячейку с координатой y+1 (теперь у нас опять 3 элемента массива)
		} else {
			snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] +'"][posY = "1"]')); //если вышел за верхнюю границу перемещаем голову на другую сторону
		}
	} else if (direction == 'down') {
		if (snakeCoordinates[1] > 1) {
			snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] +'"][posY = "'+ (+snakeCoordinates[1] - 1) +'"]')); //добавляем на первое место массива ячейку с координатой y-1 (теперь у нас опять 3 элемента массива)
		} else {
			snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] +'"][posY = "10"]')); //если вышел за нижнюю границу перемещаем голову на другую сторону
		}
	}
	
	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) { // если атрибуты х и у головы змеи и мыши равны
		mouse.classList.remove('mouse'); //убираем стили мыши (очищаем ячейку с мышью)
		let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
		let b = snakeBody[snakeBody.length - 1].getAttribute('posy'); //находим координаты последнего элемента массива змеи (конец хвоста)
		snakeBody.push(document.querySelector('[posX = "'+ a + '"][posY = "'+ b + '"]')); //добавляем вконец массива змея еще один элемент методом пуш (в момент съедания в одном месте будет 2 элемента) и у данного массива будет уже не 3 элемента а 4
		createMouse(); //создаем новую мышь
		score++;	
		input.value = `Ваши очки: ${score}`;
		intr -=50 ;
	}	
	
	if (snakeBody[0].classList.contains('snakeBody')) {
		setTimeout(()=>{alert('Игра окончена!')}, 200); // задержка вывода алерт на 200мс (() - мгновенный вызов функции на которую указывает =>). 
		
		clearInterval(interval); //функция мув перестанет запускаться каждые 300мс - см. interval=setInterval(змея остановится)
		
	}
	
	snakeBody[0].classList.add('head'); //присваеваем класс хэд для новой ячейки (головы)
	
	for (let i = 0; i<snakeBody.length; i++) {
	    snakeBody[i].classList.add('snakeBody'); //всем остальным элементам массива кроме головы присваиваем класс чешуи (снейкбоди)
    }
    steps = true;	  
}


let interval = setInterval(move, intr);

//передадим в функцию нажатия на кнопки для управления змейкой

 window.addEventListener("keydown", function (e) { // что передается и куда (нажатие кнопки передается в функцию и присваевается переменной е)
		//далее проверяем полученный код нажатой клавиши и соответственно меняем значение переменной на нужное
		if (steps == true){
		if (e.keyCode == 37 && direction != 'right') { 
			direction = 'left'; 
			steps = false;// если змея не движется вправо то меняем на движение влево и т.д.
		}
		else if (e.keyCode == 38 && direction != 'down') {
			direction = 'up'; 
			steps = false;
		}                           
		else if (e.keyCode == 39 && direction != 'left') {
			direction = 'right'; 
			steps = false;
		}                           
		else if (e.keyCode == 40 && direction != 'up') {
			direction = 'down'; 
			steps = false;
		}
	}
		
 });