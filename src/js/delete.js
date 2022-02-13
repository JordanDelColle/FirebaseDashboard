import { set, ref } from 'firebase/database';
import { ref } from "firebase/database";
import { db } from './libs/firebase/firebaseConfig';

const errorMessage = document.querySelector('#errorMessageDelete');
const successMessage = document.querySelector('#successMessageDelete');

function pageInit()
{
    var selectedProductImage = document.getElementById("selectedProductImage");
    var productTitleDelete = document.getElementById("productTitleDelete");
    var productFormatDelete = document.getElementById("productFormatDelete");
    var productPriceDelete = document.getElementById("productPriceDelete");

    var deleteButton = document.getElementById("deleteButton");
    var exitButton = document.getElementById("exitButtonDelete");

    var readLink = document.getElementById("deleteToRead");
    var writeLink = document.getElementById("deleteToWrite");
    var updateLink = document.getElementById("deleteToUpdate");

    const image = sessionStorage.getItem('image');
    const title = sessionStorage.getItem('title');
    const format = sessionStorage.getItem('format');
    const price = sessionStorage.getItem('price');

    if (image != null)
    {
        selectedProductImage.src = image;
    }
    if (title != null)
    {
        if (title.length != 0)
        {
            productTitleDelete.innerHTML = title;
        }
    }

    if (format != null)
    {
        if (format.length != 0)
        {
            productFormatDelete.innerHTML = format;
        }
    }

    if (price != null)
    {
        if (price.length != 0)
        {
            productPriceDelete.innerHTML = "$" + price;
        }
    }


    deleteButton.addEventListener('click', onDelete);
    exitButton.addEventListener('click', onExit);
    readLink.addEventListener('click', resetForm);
    writeLink.addEventListener('click', resetForm);
    updateLink.addEventListener('click', resetForm);
}

function resetForm() 
{
    sessionStorage.setItem('key', "");
    sessionStorage.setItem('sku', "");
    sessionStorage.setItem('image', "static/images/no-image-selected.png");
    sessionStorage.setItem('title', "");
    sessionStorage.setItem('price', "");
    sessionStorage.setItem('format', "");
    sessionStorage.setItem('starring', "");
    sessionStorage.setItem('runningtime', "");
    sessionStorage.setItem('discs', "");
}

async function onDelete(e) 
{
    event.preventDefault();
    const key = sessionStorage.getItem('key');
    const title = sessionStorage.getItem('title');

    if (key.length > 0)
    {
        set(ref(db, 'products/' + key), 
        {
            key : null,
            sku : null,
            image : null,
            title : null,
            price : null,
            format : null,
            starring : null,
            runningtime : null,
            discs : null
        });
    
        selectedProductImage.src = "static/images/no-image-selected.png";
        productTitleDelete.innerHTML = "No product selected";
        productFormatDelete.innerHTML = "";
        productPriceDelete.innerHTML = "";
        errorMessage.innerHTML = "";
        successMessage.innerHTML = `${title} was successfully deleted!`;
        resetForm();
    }
    else
    {
        errorMessage.innerHTML = "Error: no product selected.";
        successMessage.innerHTML = "";
    }
    

}

function onExit(e)
{
    event.preventDefault();
    resetForm();
    window.location.assign('index.html')
}

pageInit()