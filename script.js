document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let total = 0;

    items.forEach(item => {
        const addToCartButton = item.querySelector('.add-to-cart');
        const quantityDisplay = document.createElement('span');
        let quantity = 0;

        addToCartButton.addEventListener('click', function () {
            const itemName = item.dataset.name;
            const itemPrice = parseFloat(item.dataset.price);

            // Check if item is already in the cart
            const existingCartItem = Array.from(cartItems.children).find(cartItem =>
                cartItem.dataset.name === itemName
            );

            if (existingCartItem) {
                // If item already in cart, just update quantity
                quantity++;
                existingCartItem.querySelector('.quantity').textContent = quantity;
            } else {
                // Add item to cart
                const cartItem = document.createElement('li');
                cartItem.dataset.name = itemName;
                cartItem.classList.add('cart-item');
                quantity++;

                cartItem.innerHTML = `
                    ${itemName} - $${itemPrice.toFixed(2)} 
                    <span class="quantity">(${quantity})</span>
                    <button class="delete-item">Delete</button>
                    <button class="like-item">❤️</button>
                `;
                cartItems.appendChild(cartItem);

                // Delete item from cart
                const deleteButton = cartItem.querySelector('.delete-item');
                deleteButton.addEventListener('click', function () {
                    cartItems.removeChild(cartItem);
                    total -= itemPrice * quantity;
                    cartTotal.textContent = total.toFixed(2);
                });

                // Like item
                const likeButton = cartItem.querySelector('.like-item');
                likeButton.addEventListener('click', function () {
                    likeButton.classList.toggle('liked');
                });
            }

            // Update total
            total += itemPrice;
            cartTotal.textContent = total.toFixed(2);
        });
    });
});
