let cart = [];
let total = 0;

function addToCart(button) {
    const productDiv = button.parentElement;
    const productName = productDiv.getAttribute('data-name');
    const productPrice = parseFloat(productDiv.getAttribute('data-price'));

    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCart();
}

function removeFromCart(index) {
    total -= cart[index].price; // Giảm tổng tiền khi xóa sản phẩm
    cart.splice(index, 1); // Xóa sản phẩm khỏi mảng
    updateCart(); // Cập nhật lại giao diện giỏ hàng
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartItemsList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-btn" onclick="removeFromCart(${index})">Xóa</button>`;
        cartItemsList.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2);
}
