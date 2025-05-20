async function fetchCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return await res.json();
}

async function showCategoryLinks() {
    const categories = await fetchCategories();
    const sidebar = document.getElementById('sidebar');

    categories.forEach(category => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = category;
        link.style.cursor = 'pointer';

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const welcome = document.getElementById('welcomeMessage');
            if (welcome) welcome.style.display = 'none';
            showCategory(category);
        });

        sidebar.appendChild(link);
    });
}

async function getProductsByCategory(category) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
    return await res.json();
}

async function showCategory(category) {
    const products = await getProductsByCategory(category);
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <strong>${product.price.toFixed(2)} €</strong>
        `;

        const button = document.createElement('button');
        button.textContent = 'Kaufen';
        button.addEventListener('click', () => addToCart(product));
        card.appendChild(button);

        container.appendChild(card);
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} ist im Warenkorb!`);
}

showCategoryLinks();
