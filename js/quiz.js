const plates = document.querySelectorAll('.plate');

let currentIndex = 0;
let currentCard = 0;

plates.forEach(function(card) {card.classList.add('none')})

plates[0].querySelector('[data-nav="prev"]').remove();

plates[currentIndex].classList.remove('none');
plates[currentIndex].classList.add('visible');

updateProgressBar();

window.addEventListener('click', function(event){

    if (event.target.closest('[data-nav="next"]')){

        const result = checkOnAnswer(plates[currentIndex]);
        const answerWrapper = plates[currentIndex].querySelector('[data-answers]');

        if (result) {
            updateProgressBar('next');

                // Скрываем текущую с анимацией
                plates[currentIndex].classList.remove('visible');

                setTimeout(function(){
					// Скрываем текущую полностью
					plates[currentIndex].classList.add('none');

                    // Показываем следующую, готовим к анимации
                    currentIndex = currentIndex + 1;
                    plates[currentIndex].classList.remove('none');

                    setTimeout(function () {
                        // Отображаем слудующую с анимацией
                        plates[currentIndex].classList.add('visible');
                    }, 100);
				}, 500)



            answerWrapper.classList.remove('required');




        } else {
            console.error('Enter answer');

            answerWrapper.classList.add('required');
        }



    }

    if (event.target.closest('[data-nav="prev"]')){
        const btnBack = this.document.querySelector('.button--back');

        updateProgressBar('prev');

        setTimeout(function(){
            // Перемещение между карточками
            if (currentIndex === 0) return;

            plates[currentIndex].classList.remove('visible');

            setTimeout(function(){
                plates[currentIndex].classList.add('none');

                // Определяем prev card и готовим ее к анимации
                currentIndex = currentIndex - 1;
                plates[currentIndex].classList.remove('none');

                // Отображаем prev card с анимацией
                setTimeout(function(){
                    plates[currentIndex].classList.add('visible');
                }, 100)

            }, 500)

        }, 500)


    }



});

function checkOnAnswer (card) {

    const radioBtns = card.querySelectorAll('input[type="radio"]');
    if (radioBtns.length > 0) {
        for (let radio of radioBtns) if (radio.checked) return true;
    }


    const checkBoxes = card.querySelectorAll('input[type="checkbox"]');{
        if (checkBoxes.length > 0) {
            for(let checkBox of checkBoxes){
                if (checkBox.checked) return true;
            }
        }
    }
}

function updateProgressBar(direction = 'start') {

    if (direction === 'next') {
        currentCard++;
    } else if (direction === 'prev'){
        currentCard--;
    }

    const progressValue = document.querySelectorAll('.progress__label strong');

    const progressLineBar = document.querySelectorAll('.progress__line-bar');

    const countableCards = document.querySelectorAll('[data-progress]').length

    const progress = Math.round((currentCard * 100) / countableCards);

    progressValue.forEach(function(item){
        item.innerText = progress + '%';
    })

    progressLineBar.forEach(function(item){
        item.style.width = progress + '%';
    })




}

mask('#tel');

const submitForm = document.querySelector('#submitForm');
const telInput = document.querySelector('#tel');

submitForm.onclick = function () {
    if (telInput.value === '+' || telInput.value.length < 6){
        telInput.value = ''
    }
}

const checkBoxPolicy = document.querySelector('#policy');

checkBoxPolicy.addEventListener('focus', function () {
    this.closest('label').classList.add('hovered');
})

checkBoxPolicy.addEventListener('blur', function () {
    this.closest('label').classList.remove('hovered');
})