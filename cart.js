let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.textContent = 'Ziemlich leer hier...';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('div');
        const rowTotal = item.quantity * item.price;
        row.textContent = `${item.title} - ${item.quantity} x ${item.price.toFixed(2)} € = ${rowTotal.toFixed(2)} €`;
        total += rowTotal;
        cartContainer.appendChild(row);
    });

    const totalRow = document.createElement('div');
    totalRow.innerHTML = `<strong>Gesamt: ${total.toFixed(2)} €</strong>`;
    cartContainer.appendChild(totalRow);
}

function buyCart() {
    if (cart.length === 0) {
        alert("Herzlichen Glückwunsch! \nSie haben einen leeren Warenkorb bestellt");
        return;
    }

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Danke für ihren Einkauf! \nBitte senden sie ihre Bankdaten an mich, um den Einkauf abzuschließen :)");
    showCart();
}

document.getElementById('buyButton').addEventListener('click', buyCart);

showCart();
