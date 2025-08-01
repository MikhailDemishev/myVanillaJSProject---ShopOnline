export default function showStockByCity(productArray) {
    const productsCheckboxes = document.querySelectorAll('.catalog-form__list-col .custom-checkbox'); 
    productsCheckboxes.forEach(element => {
        const input = element.querySelector('.custom-checkbox__field'); 
        const containsElementsNo = productArray.filter(product => product.type.includes(`${input.value}`)).length;
        const countElement = element.querySelector('.custom-checkbox__count'); 
        countElement.textContent = containsElementsNo; 
    });

   
 

}
