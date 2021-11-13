const data      = [];
let currency    = 'USD';
const getData = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.open( 'GET', 'http://localhost:8080/get-data', true );
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.onload = () => {
        if(xhttp.status == 200){
            data.push(JSON.parse(xhttp.responseText)['products']);
            renderData();
        }
    }
    xhttp.send();        
}

const renderData = () => {
    let html = ''
    data[0].forEach( e => {
        html += `
            <div class="cont-prod">
                <div class="cont-img">
                    <img src="${ e.image.src }" class="w-75">
                </div>
                <p>${ e.title.substr( 0, 20 ) }</p>
                <strong>${ (currency == 'USD') ? '$ '+e.variants[0].price : '€ ' + number_format( (parseFloat(e.variants[0].price) * 0.87), 2) }</strong>
            </div>
        `;
    } );
    document.getElementById('cont-products').innerHTML = html;

}

const number_format = (amount, decimals) => {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

const change_currency = (e) => {
    currency = e;
    renderData();
}

getData(); 