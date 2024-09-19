const createProductCard = (product) => {
  const tagsHtml = product.tags.map((tag) => `<span>${tag}</span>`).join("");
  const magnetHtml = product.magnet
    ? '<div class="magnet-icon"><img src="/images/Magnet.png"></div>'
    : "";
  return `
            <div data-aos="zoom-in-down" data-aos-duration="600" class="product-card">
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
