export const toggleClass = (elm, className) => {
    let element = document.querySelector(elm);
    element.classList.toggle(className);
};