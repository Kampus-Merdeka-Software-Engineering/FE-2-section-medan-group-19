// API url
const API_URL = "https://be-2-medan-19-production.up.railway.app";

// Mengambil data dari database untuk slide menu makanan
document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch(`${API_URL}/menu`);

  const menuData = await response.json();
  const foodContainer = document.querySelector('#food-swiper');

  menuData.slice(0,5).forEach(item => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide slide";
      slide.dataset.name = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.png`;

      const h3 = document.createElement('h3');
      h3.textContent = item.name;

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = `$${item.price}`;

      slide.appendChild(img);
      slide.appendChild(h3);
      slide.appendChild(price);

      foodContainer.appendChild(slide);
  })

 // Mengambil data dari database untuk slide menu minuman
  const drinkContainer = document.querySelector('#drink-swiper');

  menuData.slice(5,10).forEach(item => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide slide";
      slide.dataset.name = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.png`;

      const h3 = document.createElement('h3');
      h3.textContent = item.name;

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = `$${item.price}`;

      slide.appendChild(img);
      slide.appendChild(h3);
      slide.appendChild(price);

      drinkContainer.appendChild(slide);
  })

  // Mengambil data dari database untuk preview menu
  const menuPreviewContainer = document.querySelector('#menu-previews');
  
  menuData.forEach(item => {
      const foodPreview = document.createElement('div');
      foodPreview.className = 'food-preview';
      foodPreview.dataset.target = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.png`;

      const h3 = document.createElement('h3');
      h3.textContent = item.name;

      const p = document.createElement('p');
      p.textContent = item.description;

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = `$${item.price}`;

      const addToCartBtn = document.createElement('button');
      addToCartBtn.className = 'btn';
      addToCartBtn.textContent = 'add to cart';

      addToCartBtn.addEventListener('click', ( ) =>{
        fetch(`${API_URL}/cart/${item.menu_id}`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
        })
        .then(response => {
          UpdateCart();

          document.querySelector('.food-preview.active').classList.remove('active');
          document.querySelector('.food-preview-container').style.display = 'none';
        })
      })

      foodPreview.appendChild(img);
      foodPreview.appendChild(h3);
      foodPreview.appendChild(p);
      foodPreview.appendChild(price);
      foodPreview.appendChild(addToCartBtn);
    
      menuPreviewContainer.appendChild(foodPreview);
    });

    let previewContainer = document.querySelector('.food-preview-container');
    previewContainer.querySelector('#close-preview').onclick = () =>{
    previewContainer.style.display = 'none';
    previewBox.forEach(close =>{
    close.classList.remove('active');
    });
  };

  // untuk menampilkan preview menu yang dipilih 
    let previewBox = previewContainer.querySelectorAll('.food-preview');
    document.querySelectorAll('.food .slide').forEach(food=>{
      food.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = food.getAttribute('data-name');
        previewBox.forEach(preview =>{
          let target = preview.getAttribute('data-target');
          if(name == target){
            preview.classList.add('active');
          }
        });
      };
    });
});

// function untuk memperbarui cart apabila ada perubahan
async function UpdateCart() {
  const response = await fetch(`${API_URL}/cart`);
  
  const cartData = await response.json();

  // menghapus menu yang sebelumnya
  const cartList = document.querySelector('.cart-list');
  while (cartList.firstChild){
    cartList.removeChild(cartList.firstChild);
  }

  // untuk bagian pilihan menu
  cartData.forEach(item => {
      const list = document.createElement('li');

      const foodImageDiv = document.createElement('div');
      foodImageDiv.className = 'food-img';
      const foodImage = document.createElement('img');
      foodImage.src = `./images/menu_${item.menu_id}.png`;
      foodImageDiv.appendChild(foodImage);

      const foodNameDiv = document.createElement('div');
      foodNameDiv.className = 'food-name';
      foodNameDiv.textContent = item.name;

      const cartAddRemoveDiv = document.createElement('div');
      cartAddRemoveDiv.className = 'cart-add-remove';

      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      
      decreaseButton.addEventListener('click', ( ) =>{
        fetch(`${API_URL}/cart/${item.menu_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
          },
        })
        .then(response => {
          console.log('Item deleted from cart!');
          UpdateCart();
        })
      })

      const countDiv = document.createElement('div');
      countDiv.className = 'count';
      countDiv.textContent = item.quantity;

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';

      increaseButton.addEventListener('click', ( ) =>{
        fetch(`${API_URL}/cart/${item.menu_id}`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
        })
        .then(response => {
          console.log('Item added to cart!');
          UpdateCart();
        })
      })

      cartAddRemoveDiv.appendChild(decreaseButton);
      cartAddRemoveDiv.appendChild(countDiv);
      cartAddRemoveDiv.appendChild(increaseButton);

      list.appendChild(foodImageDiv);
      list.appendChild(foodNameDiv);
      list.appendChild(cartAddRemoveDiv);

      cartList.appendChild(list);
  });

  // untuk bagian harga
  const priceSummary = document.querySelector('.price-summary');
  let total = 0.0;
  while (priceSummary.rows.length > 0){
    priceSummary.deleteRow(0);
  }

  cartData.forEach(item => {
    total += item.price * item.quantity;
    const tableRow = document.createElement('tr');

    const foodNameCell = document.createElement('td');
    foodNameCell.textContent = item.name;

    const cartPriceCell = document.createElement('td');
    cartPriceCell.className = 'cart-price';
    cartPriceCell.textContent = `$${item.price * item.quantity}`;

    tableRow.appendChild(foodNameCell);
    tableRow.appendChild(cartPriceCell);

    priceSummary.appendChild(tableRow);
  });
  const tableRow = document.createElement('tr');
  const totalPriceCell = document.createElement('td');
  const totalPriceText = document.createElement('h3');
  totalPriceText.innerText = "Total";
  const totalPrice = document.createElement('td');
  totalPrice.className = "cart-price";
  const totalPriceBold = document.createElement('h3');
  totalPriceBold.innerText = `$${total}`;

  totalPriceCell.appendChild(totalPriceText);
  totalPrice.appendChild(totalPriceBold);
  tableRow.appendChild(totalPriceCell);
  tableRow.appendChild(totalPrice);

  priceSummary.appendChild(tableRow);
}

// function membuat order
  async function createOrder() {
    const dataInfo = document.querySelectorAll('.data-info');
  
    dataInfo.forEach(element => {
      if (element.tagName.toLowerCase() === 'ul'){
        while (element.firstChild)
        {
          element.removeChild(element.firstChild);
        }
      }
      else{
        element.textContent = '';
      } 
    });
  
    const response = await fetch(`${API_URL}/order`);
    const orderData = await response.json();
    const id = orderData.length-1;
    console.log(orderData[id]);
    console.log(orderData[id].full_name);
  
    document.getElementById('order-id').textContent = orderData[id].order_id;
    const debug = document.getElementById('full-name-info').textContent = orderData[id].full_name;
    document.getElementById('number-info').textContent = orderData[id].number;
    document.getElementById('address-info').textContent = orderData[id].address;
    let total = 0.0;
  
  
    const orderedMenuList = document.getElementById('ordered-menu');
    orderData[id].ordered_menu.forEach(item => {
      total += item.price * item.quantity;
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <div class="food-name">${item.name}</div>
          <div class="food-quantity">x ${item.quantity}</div>
          <div class="food-total-price">$${item.quantity * item.price}</div>
      `;
          orderedMenuList.appendChild(listItem);
    });
  
    const totalListItem = document.createElement('li');
    totalListItem.innerHTML = `
          <div class="food-name"><h3>Total</h3></div>
          <div></div>
          <div class="food-total-price"><h3>$${total}</h3></div>
      `;
      orderedMenuList.appendChild(totalListItem);
  }
  
  // memberi function membuat order pada tombol order
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('orderButton').addEventListener('click', async () =>{
        const fullName = document.getElementById("full-name").value;
        const number = document.getElementById("number").value;
        const address = document.getElementById("address").value;
  
        const response = await fetch(`${API_URL}/cart`);
        const cartData = await response.json();
  
        if(cartData.length < 1){
          alert("Please choose your menu to order");
          return;
        }
        if(!fullName || !number || !address)
        {
          alert("Please fill your information");
          return;
        }
  
        fetch(`${API_URL}/order`, {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               full_name: fullName,
               number: number,
               address: address,
           })
          })
          .then (response => {
            UpdateCart();
            orderDetail.classList.toggle('active');
            cartForm.classList.remove('active');
            createOrder();
            document.getElementById('order-form').reset();
          })
    });
  });

// melakukan update cart saat membuka halaman
document.addEventListener('DOMContentLoaded', async() => {
  UpdateCart();
})

let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () =>{
  menuBtn.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

let cartForm = document.querySelector('.cart-container');

document.querySelector('#cart-btn').onclick = () =>{
  cartForm.classList.toggle('active');
}

document.querySelector('#close-cart-btn').onclick = () =>{
  cartForm.classList.remove('active');
}

let orderDetail = document.querySelector('.order-detail-container');

document.querySelector('.order-data .btn').onclick = () =>{
  orderDetail.classList.remove('active');
}


var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});



var swiper = new Swiper(".food-slider", {
  centeredSlides:true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".menu-slider", {
  grabCursor:true,
  loop:true,
  autoHeight:true,
  centeredSlides:true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


var swiper = new Swiper(".blogs-slider", {
  grabCursor:true,
  loop:true,
  centeredSlides:true,
  spaceBetween: 20,
  autoHeight:true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});

