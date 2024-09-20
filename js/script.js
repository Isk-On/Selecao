const showModal = (product) => {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-product-image');
    const modalName = document.getElementById('modal-product-name');
    const modalTags = document.getElementById('modal-product-tags');
    const modalPrice = document.getElementById('modal-product-price');
    const videoContainer = document.getElementById('video-container');
    const youtubeVideo = document.getElementById('youtube-video');
    
    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalTags.innerHTML = product.tags.map(tag => `<span>${tag}</span>`).join("");
    modalPrice.textContent = `${product.price} som`;
    youtubeVideo.src = ''; 
    
    modal.style.display = 'flex';

    const buyButton = document.getElementById('buy-button');
    buyButton.onclick = () => {
        videoContainer.style.display = 'block';
        youtubeVideo.src = 'https://www.youtube.com/embed/op0oJXf0cSI?si=NlJLhmTwpca0alI6';
    };

    const closeButton = document.querySelector('.modal-close');
    closeButton.onclick = () => {
        modal.style.display = 'none'; 
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
};

const createProductCard = (product) => {
    const tagsHtml = product.tags.map(tag => `<span>${tag}</span>`).join("");
    const magnetHtml = product.magnet
        ? '<div class="magnet-icon"><img src="images/Magnet.png"></div>'
        : "";
    
    return `
        <div data-aos="zoom-in-down" data-aos-duration="600" class="product-card" onclick='showModal(${JSON.stringify(product)})'>
            <img src="${product.image}" alt="${product.name}">
            <div class="tags">${tagsHtml}</div>
            <h3>${product.name}</h3>
            <div class="price">${product.price} som</div>
            ${magnetHtml}
        </div>
    `;
};

const displayProducts = async () => {
    try {
        const response = await fetch("js/data.json");
        const products = await response.json();

        const container = document.getElementById("products-container");
        const productCards = products.map(createProductCard).join("");
        container.innerHTML = productCards;
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

displayProducts();
