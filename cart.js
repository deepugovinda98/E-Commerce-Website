// cart.js
let cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Load cart items from local storage

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let total = 0;
    cartItemsContainer.innerHTML = ''; // Clear current cart items display

    // Loop through each cart item and display it
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("col-md-4");
        itemDiv.innerHTML = `
            <div class="card mb-3">
                <img src="${item.img}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-secondary decrement-btn" data-index="${index}">-</button>
                        <input type="text" class="form-control text-center quantity-input" style="width: 50px;" value="${item.quantity}" data-index="${index}">
                        <button class="btn btn-secondary increment-btn" data-index="${index}">+</button>
                    </div>
                    <p><strong>Total for item:</strong> $<span class="item-total">${(item.price * item.quantity).toFixed(2)}</span></p>
                    <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity; // Calculate total price for all items
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// Function to handle increment and decrement of item quantity
function updateQuantity(index, isIncrement) {
    const quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);
    let quantity = parseInt(quantityInput.value);

    if (isIncrement) {
        quantity += 1;
    } else if (quantity > 1) {
        quantity -= 1;
    }

    cartItems[index].quantity = quantity; // Update quantity in cart array
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Save updated cart to local storage
    updateCart(); // Update the cart display
}

// Function to remove a specific item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove item from cart array
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Save updated cart to local storage
    updateCart(); // Update the cart display
}

// Event listener for increment and decrement buttons
document.getElementById("cart-items").addEventListener("click", (event) => {
    const index = parseInt(event.target.getAttribute("data-index"));
    if (event.target.classList.contains("decrement-btn")) {
        updateQuantity(index, false); // Decrement quantity
    } else if (event.target.classList.contains("increment-btn")) {
        updateQuantity(index, true); // Increment quantity
    } else if (event.target.classList.contains("remove-item")) {
        removeItem(index); // Remove item
    }
});

// Event listener for the "Remove All" button
document.getElementById("remove-btn").addEventListener("click", () => {
    cartItems = []; // Empty the cart
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Save empty cart to local storage
    updateCart(); // Update the cart display
});

// Initial cart update when the page loads
updateCart();