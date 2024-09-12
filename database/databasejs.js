document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.querySelector('input[name="full-name"]').value;
    const foodName = document.querySelector('input[name="food-name"]').value;
    const orderDetails = document.querySelector('input[name="order-details"]').value;
    const address = document.querySelector('textarea[name="your-address"]').value;
    const number = document.querySelector('input[name="number"]').value;
    const howMuch = document.querySelector('input[name="how-much"]').value;
    const whenYouWant = document.querySelector('input[name="when-you-want"]').value;

    const order = {
        fullName,
        foodName,
        orderDetails,
        address,
        number,
        howMuch,
        whenYouWant,
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    document.getElementById('orderForm').reset();
});
