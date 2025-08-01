import postOnServer from "../utilities/postOnServer.js";
export default function initFormValidation() {
    const questionsForm = document.querySelector('.questions__form');
    const validate = new JustValidate('.questions__form');
    const allFormInputs = questionsForm.querySelectorAll('input');

    allFormInputs.forEach(input => {
        const rules = [];

        if (input.type === 'checkbox') {
            rules.push({
                rule: 'required',
                errorMessage: `Отметьте галочку "Я согласен с политикой конфиденциальности"`,
            });
        } else {
            rules.push({
                rule: 'required',
                errorMessage: `Заполните поле "${input.parentElement.querySelector('.custom-input__label').textContent}"`,
            });

            if (input.type === 'email') {
                rules.push({
                    rule: 'email',
                    errorMessage: `Введите корректный e-mail`,
                });
            }

            if (input.type === 'text') {
                rules.push({
                    rule: 'minLength',
                    value: 3,
                    errorMessage: `Минимальная длина имени — 3 символа`,
                });

                rules.push({
                    rule: 'maxLength',
                    value: 20,
                    errorMessage: `Максимальная длина имени — 20 символов`,
                });
            }
        } 
        if (rules.length > 0) {
            validate.addField(input, rules);
        }
    });

    validate.onSuccess(async (e) => {
        e.preventDefault();
        const formData = new FormData(questionsForm);
        let state;
        let header;
        let text;

        try {
            const response = await postOnServer(formData);
            state = 'success';
            header = 'Благодарим за обращение!';
            text = 'Мы получили вашу заявку и свяжемся с вами в ближайшее время';
            renderModalForm(state, header, text);
        } catch (error) {
            console.error('Ошибка отправки:', error);
            state = 'fail';
            header = 'Не удалось отправить обращение!';
            text = 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.';
            renderModalForm(state, header, text);
        }

        questionsForm.reset();
    });
}

function renderModalForm(state, header, text) {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal--active');
    const modalInner = document.querySelector('.modal__inner');
    modalInner.innerHTML = `
      <div class="modal__icon" aria-hidden="true">
            <svg class="modal__icon-symbol" width="44" height="44" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-modal-${state}"></use>
            </svg>
          </div>
          <h2 class="modal__title">${header}</h2>
          <p class="modal__text">${text}</p>`
}


