import { ref as dataRef, get } from 'firebase/database';
import { db } from './libs/firebase/firebaseConfig';
import { productTemplate } from './templates/productTemplate';

async function pageInit()
{
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef);
    const data = productSnapShot.val();
    Object.values(data).map(product=>
    {
        const card = productTemplate(product);
        document.body.append(card);
    });
}

pageInit();