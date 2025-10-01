class ProductCard extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' }) // Shadow DOM ব্যবহার করা হচ্ছে
	}

	async connectedCallback() {
		const productId = this.getAttribute('product-id')

		// Shopify Storefront API থেকে ডাটা ফেচ করা
		const res = await fetch(`/products/${productId}.js`)
		const product = await res.json()

		this.render(product)
	}

	render(product) {
		this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          font-family: sans-serif;
        }
        img {
          max-width: 100%;
          border-radius: 8px;
        }
        h2 {
          font-size: 18px;
          margin: 8px 0;
        }
        .price {
          font-weight: bold;
          color: green;
        }
        button {
          background: black;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
      </style>

      <div class="card">
        <img src="${product.images[0]}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p class="price">$${(product.price / 100).toFixed(2)}</p>
        <button>Add to Cart</button>
      </div>
    `
	}
}

customElements.define('product-card', ProductCard)
