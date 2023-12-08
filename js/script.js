const API_URL = "https://be-2-medan-19-production.up.railway.app";

// api start

document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch(`${API_URL}/menu`);

  const menuData = await response.json();

  // untuk pilihan menu makanan
  const foodContainer = document.querySelector('#food-swiper');

  menuData.slice(0,5).forEach(item => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide slide";
      slide.dataset.name = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.jpg`;

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

  // untuk pilihan menu minuman
  const drinkContainer = document.querySelector('#drink-swiper');

  menuData.slice(5,10).forEach(item => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide slide";
      slide.dataset.name = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.jpg`;

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

  // untuk priview menu
  const menuPreviewContainer = document.querySelector('#menu-previews');
  
  menuData.forEach(item => {
      const foodPreview = document.createElement('div');
      foodPreview.className = 'food-preview';
      foodPreview.dataset.target = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = `./images/menu_${item.menu_id}.jpg`;

      const h3 = document.createElement('h3');
      h3.textContent = item.name;

      const stars = document.createElement('div');
      stars.className = 'stars';
      for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      star.className = 'fas fa-star';
      stars.appendChild(star);
      }

      const p = document.createElement('p');
      //p.textContent = item.description;

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
          console.log('Item added to cart!');
          UpdateCart();
        })
      })

      foodPreview.appendChild(img);
      foodPreview.appendChild(h3);
      foodPreview.appendChild(stars);
      foodPreview.appendChild(p);
      foodPreview.appendChild(price);
      foodPreview.appendChild(addToCartBtn);
    
      // Append dynamic food preview to the container
      menuPreviewContainer.appendChild(foodPreview);
    });

    // preview menu box
    let previewContainer = document.querySelector('.food-preview-container');
    previewContainer.querySelector('#close-preview').onclick = () =>{
    previewContainer.style.display = 'none';
    previewBox.forEach(close =>{
    close.classList.remove('active');
    });
  };
    let previewBox = previewContainer.querySelectorAll('.food-preview');
    document.querySelectorAll('.food .slide').forEach(food=>{
      food.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = food.getAttribute('data-name');
        previewBox.forEach(preview =>{
          let target = preview.getAttribute('data-target');
          if(name == target){
            console.log("test");
            preview.classList.add('active');
          }
        });
      };
    });
});

// to be corrected

async function UpdateCart() {
  const response = await fetch(`${API_URL}/cart`);
  
  const cartData = await response.json();

  // cart item list

  const cartList = document.querySelector('.cart-list');
  while (cartList.firstChild){
    cartList.removeChild(cartList.firstChild);
  }
  cartData.forEach(item => {
      const list = document.createElement('li');

      const foodImageDiv = document.createElement('div');
      foodImageDiv.className = 'food-img';
      const foodImage = document.createElement('img');
      foodImage.src = `./images/menu_${item.menu_id}.jpg`;
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

  // item in order list
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

document.addEventListener('DOMContentLoaded', async() => {
  fetch(`${API_URL}/cart/`, {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
    },
  })
  UpdateCart();
})

// api end

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