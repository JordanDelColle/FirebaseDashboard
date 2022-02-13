import { ref as storageRef, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";

document.querySelector("#displayImageWrite").addEventListener("change", onImageSelected);
document.forms["productFormWrite"].addEventListener("submit", onAddProduct); 

const writeTitle = document.querySelector('#productTitleWrite');
const writePrice = document.querySelector('#productPriceWrite');
const writeFormat = document.querySelector('#productFormatWrite');
const writeStarring = document.querySelector('#productStarringWrite');
const writeRunningTime = document.querySelector('#productRunningTimeWrite');
const writeDiscs = document.querySelector('#productDiscsWrite');
const writeImage = document.querySelector(".upload-image img");
const errorMessage = document.querySelector('#errorMessageWrite');
const successMessage = document.querySelector('#successMessageWrite');

function onAddProduct(e) 
{
    e.preventDefault();
    uploadNewProduct();
}

function resetForm() 
{
    writeTitle.value = "";
    writePrice.value = "";
    writeFormat.value = "";
    writeStarring.value = "";
    writeRunningTime.value = "";
    writeDiscs.value = "";
    writeImage.src = "static/images/no-image-selected.png";
}
  
function onImageSelected(e)
{
    let file = e.target.files[0];
    console.log(file);
    writeImage.src = URL.createObjectURL(file);
}

async function uploadNewProduct() 
{
    const title = writeTitle.value.trim();
    const price = writePrice.value.trim();
    const format = writeFormat.value.trim();
    const starring = writeStarring.value.trim();
    const runningtime =writeRunningTime.value.trim();
    const discs = writeDiscs.value.trim();
    const file = document.querySelector('#displayImageWrite').files[0];
    
    try 
    {
        const imageRef =     storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'products');
        const image =  await getDownloadURL(imageRef);

        if (title.length > 0 && price.length > 0 && format.length > 0 && starring.length > 0 && runningtime.length > 0 && discs.length > 0)
        {
            const itemRef = await push(dataRef);
            set(itemRef,
            {
                key:itemRef.key,
                sku:`jgs${itemRef.key}`,
                image,
                title,
                price,
                format,
                starring,
                runningtime,
                discs,
            });
            errorMessage.innerHTML = "";
            successMessage.innerHTML = "Upload complete!";
            resetForm();
        }
        else 
        {
            errorMessage.innerHTML = "Warning: product failed to upload.";
            successMessage.innerHTML = "";
        };

    }
    catch 
    {
        errorMessage.innerHTML = "Warning: product failed to upload.";
        successMessage.innerHTML = "";
    };
}