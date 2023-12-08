const API_URL = "https://be-2-medan-19-production.up.railway.app";

// api start

document.addEventListener('DOMContentLoaded', async() => {
  const response = await fetch(`${API_URL}/menu`);

  const menuData = await response.json();
  console.log(menuData);

  // untuk pilihan menu makanan
  const foodContainer = document.querySelector('#food-swiper');

  menuData.slice(0,5).forEach(item => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide slide";
      slide.dataset.name = `food-${item.menu_id}`;

      const img = document.createElement('img');
      img.src = './images/pizza_1.png';

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
      img.src = './images/drink_1.jpg';

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
      img.src = `./images/pizza_1.png`;

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

// next api

// api end

let navbar = document.querySelector('.header .navbar');
let menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () =>{
  menuBtn.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

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