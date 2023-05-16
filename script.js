// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const search = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
    },
    {
        id: 2,
        name: 'Banana',
        price: 10,
    },
    {
        id: 3,
        name: 'Orange',
        price: 2.2,
    },
    {
        id: 4,
        name: 'Pear',
        price: 2.7,
    },
    {
        id: 5,
        name: 'Peach',
        price: 3,
    },
    {
        id: 6,
        name: 'Watermelon',
        price: 15,
    },
    {
        id: 7,
        name: 'Mango',
        price: 4.2,
    },
    {
        id: 8,
        name: 'Kiwi',
        price: 3.5,
    },
    {
        id: 9,
        name: 'Grape',
        price: 4.5,
    },
    {
        id: 10,
        name: 'Strawberry',
        price: 1,
    },
    {
        id: 11,
        name: 'Cherry',
        price: 0.4,
    },
    {
        id: 12,
        name: 'Pineapple',
        price: 8,
    },
];

let cart = [];

// An example function that creates HTML elements using the DOM.
function fillItemsGrid(items) {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" onClick=addToCart(${item.id}) data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

function addToCart(itemId){
    let item = items.find(v => v.id === itemId);
    cart.push(item);
    refreshCart();
    refreshCartButton();
}

function removeFromCart(itemId){
    let item = cart.find(v => v.id === itemId);
    cart.splice(cart.indexOf(item), 1);
    refreshCart();
    refreshCartButton();
}

function refreshCartButton(){
    cartBadge.innerHTML = cart.length;
}

function refreshCart(){
    cartItemsList.innerHTML = ""
    cart.forEach(v => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${v.name}</h3>
            <p>$${v.price}</p>
            <button class="remove-from-cart-btn" onClick=removeFromCart(${v.id}) data-id="${v.id}">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
    })
    let total = 0.00;
    cart.forEach(v => total += v.price);
    cartTotal.innerHTML=`$${total.toFixed(2)}`;
}

function buyItems(){
    if(cart.length === 0){
        alert("Cart is empty")
    }
    else{
        cart = []
        refreshCart()
        refreshCartButton()
        alert("Buying successful")
    }
}

function handleSearch(){
    let filteredItems = items.filter(v => v.name.toLowerCase().includes(search.value.toLowerCase()))
    itemsGrid.innerHTML = ""
    fillItemsGrid(filteredItems)
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

// Call fillItemsGrid function when page loads
fillItemsGrid(items);

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener("click", buyItems)
searchButton.addEventListener("click", handleSearch)