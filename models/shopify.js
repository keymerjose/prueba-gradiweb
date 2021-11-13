const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class Shopify {
    constructor(){
        this.shopurl = process.env.SHOPURL;
        this.APIKEY = process.env.APIKEY;
        this.PASSWORD = process.env.PASSWORD;
        this.xhttp = new XMLHttpRequest();
    }

    getData(){
        return new Promise( (resolve, rejected) => {
            // const xhttp = new XMLHttpRequest();
            this.xhttp.open("GET", `${ this.shopurl }/admin/api/2021-10/products.json`, true);
            this.xhttp.setRequestHeader("Content-type", "application/json");            
            this.xhttp.setRequestHeader('X-Shopify-Access-Token', this.PASSWORD);

            this.xhttp.onload = () => {
                if(this.xhttp.status == 200){
                    resolve( JSON.parse(this.xhttp.responseText) );
                }else{
                    rejected();
                }
            }

            this.xhttp.send();
        } );        
    }
}

module.exports = Shopify;