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
                    <p class="card-text">${item.desc}</p>
                    <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity; // Calculate total price
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// Function to remove a specific item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove item from cart array
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Save updated cart to local storage
    updateCart(); // Update the cart display
}

// Event listener for remove buttons
document.getElementById("cart-items").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        removeItem(index);
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