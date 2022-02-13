import { getDatabase, ref, set } from "firebase/database";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { storage } from "./libs/firebase/firebaseConfig";

document.querySelector("#displayImageUpdate").addEventListener("change", onImageSelected);
const errorMessage = document.querySelector('#errorMessageUpdate');
const successMessage = document.querySelector('#successMessageUpdate');

function pageInit()
{
    var defaultProductImage = document.getElementById("defaultProductImage");
    var defaultProductTitle = document.getElementById("productTitleUpdate");
    var defaultProductPrice = document.getElementById("productPriceUpdate");
    var defaultProductFormat = document.getElementById("productFormatUpdate");
    var defaultProductStarring = document.getElementById("productStarringUpdate");
    var defaultProductRunningTime = document.getElementById("productRunningTimeUpdate");
    var defaultProductDiscs = document.getElementById("productDiscsUpdate");

    var saveButton = document.getElementById("saveButtonUpdate");
    var exitButton = document.getElementById("exitButtonUpdate");

    var readLink = document.getElementById("updateToRead");
    var writeLink = document.getElementById("updateToWrite");
    var deleteLink = document.getElementById("updateToDelete");

    const image = sessionStorage.getItem('image');
    const title = sessionStorage.getItem('title');
    const price = sessionStorage.getItem('price');
    const format = sessionStorage.getItem('format');
    const starring = sessionStorage.getItem('starring');
    const runningtime = sessionStorage.getItem('runningtime');
    const discs = sessionStorage.getItem('discs');

    if (image != null)
    {
        defaultProductImage.src = image;
    }
    if (title.length != 0)
    {
        defaultProductTitle.value = title;
    }
    if (price.length != 0)
    {
        defaultProductPrice.value = price;
    }
    if (format.length != 0)
    {
        defaultProductFormat.value = format;
    }
    if (starring.length != 0)
    {
        defaultProductStarring.value = starring;
    }
    if (runningtime.length != 0)
    {
        defaultProductRunningTime.value = runningtime;
    }
    if (discs.length != 0)
    {
        defaultProductDiscs.value = discs;
    }
    saveButton.onclick = function()
    {
        onSave();
    }

    exitButton.addEventListener('click', onExit);
    readLink.addEventListener('click', resetForm);
    writeLink.addEventListener('click', resetForm);
    deleteLink.addEventListener('click', resetForm);
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

function onImageSelected(e) 
{
    let file = e.target.files[0];
    document.querySelector(".upload-image img").src = URL.createObjectURL(file);
     
}

async function onSave() 
{
    event.preventDefault();

    const key = sessionStorage.getItem('key');
    const sku = sessionStorage.getItem('sku');
    const title = document.querySelector('#productTitleUpdate').value.trim();
    const price = document.querySelector('#productPriceUpdate').value.trim();
    const format = document.querySelector('#productFormatUpdate').value.trim();
    const starring = document.querySelector('#productStarringUpdate').value.trim();
    const runningtime = document.querySelector('#productRunningTimeUpdate').value.trim();
    const discs = document.querySelector('#productDiscsUpdate').value.trim();
    const file = document.querySelector('#displayImageUpdate').files[0];
    const db = getDatabase();

    if (key.length > 0)
    {
        try 
        {
            const imageRef =     storageRef( storage, `images/${file.name}`);
            const image =  await getDownloadURL(imageRef);
    
            set(ref(db, 'products/' + key), {
                key,
                sku,
                image,
                title,
                price,
                format,
                starring,
                runningtime,
                discs
                });
        }
        catch 
        {
            const image = sessionStorage.getItem('image');
    
            set(ref(db, 'products/' + key), 
            {
                key,
                sku,
                image,
                title,
                price,
                format,
                starring,
                runningtime,
                discs
            });
        };
        errorMessage.innerHTML = "";
        successMessage.innerHTML = `${title} was successfully updated!`;
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
    window.location.assign('index.html');
}

pageInit();