import { useState } from "react";

export const toggleClass = (elm, className) => {
    let element = document.querySelector(elm);
    element.classList.toggle(className);
};

export const removeClass = (elm, className) =>{
    let element = document.querySelector(elm);
    element.classList.remove(className);
};

export const api_base_url = "http://localhost:3000"   // Base URL for the API