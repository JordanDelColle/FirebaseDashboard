function productTemplate({key, sku, image, title, price, format, starring, runningtime, discs})
{
    const template = `
    <aside class="movie-product">
        <div>
            <figure class="flexbox catalog-entry">
                <div>
                    <img src="${image}" alt="box art of ${title}" class="provided-image" >
                </div>
                <div class="product-details">
                    <figcaption>
                        <h2>${title}</h2>
                    </figcaption>
                    <p>Price: $${price}</p>
                    <p>${format}</p>
                    <p>Starring: ${starring}</p>
                    <p>Running time: ${runningtime} minutes</p>
                    <p>No. discs: ${discs}</p>
                    <div class="flexbox">
                        <button id="edit" data-key="${key}" data-sku="${sku}" data-image="${image}" data-title="${title}" data-price="${price}" data-format="${format}" data-starring="${starring}" data-runningtime="${runningtime}" data-discs="${discs}" >edit</button>
                        <button id="delete" data-key="${key}" data-sku="${sku}" data-image="${image}" data-title="${title}" data-price="${price}" data-format="${format}" data-starring="${starring}" data-runningtime="${runningtime}" data-discs="${discs}">delete</button>
                </div>
                </div>
            </figure>
            <div>
            </div>
        </div>
    </aside>
    `;
    const element = document.createRange().createContextualFragment(template).children[0];
    addButtonControls(element);
    return element;
}

function addButtonControls(product)
{
    product.querySelector('#edit').addEventListener('click', onEditProduct);
    product.querySelector('#delete').addEventListener('click', onRemoveProduct);
}

function assignValues(e)
{
    const key = e.target.dataset.key;
    const sku = e.target.dataset.sku;
    const image = e.target.dataset.image;
    const title = e.target.dataset.title;
    const price = e.target.dataset.price;
    const format = e.target.dataset.format;
    const starring = e.target.dataset.starring;
    const runningtime = e.target.dataset.runningtime;
    const discs = e.target.dataset.discs;
    sessionStorage.setItem('key', key);
    sessionStorage.setItem('sku', sku);
    sessionStorage.setItem('image', image);
    sessionStorage.setItem('title', title);
    sessionStorage.setItem('price', price);
    sessionStorage.setItem('format', format);
    sessionStorage.setItem('starring', starring);
    sessionStorage.setItem('runningtime', runningtime);
    sessionStorage.setItem('discs', discs);
}

function onEditProduct(e)
{
    assignValues(e);
    window.location.assign('update.html');
}

function onRemoveProduct(e)
{
    assignValues(e);
    window.location.assign('delete.html');
}

export {productTemplate};