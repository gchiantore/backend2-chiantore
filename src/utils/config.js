import * as url from 'url';


const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
 
     // getter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` },
    USERS_COLLECTION: 'users',
    CARTS_COLLECTION: 'carts',
    PRODUCTS_COLLECTION: 'products',
    ITEMS_PER_PAGE: 10,
    CART_SELECTED_ID:'67240f30ba0a420006254d7f'
};

export default config;
