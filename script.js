document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.escuelajs.co/api/v1/products';
    const productList = document.getElementById('product-list');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error-message');
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');

    // Hàm xử lý URL ảnh
    function cleanImageUrl(imageUrl) {
        if (!imageUrl) return 'https://placehold.co/600x400?text=No+Image';
        
        let cleanUrl = imageUrl;
        if (cleanUrl.startsWith('["') && cleanUrl.endsWith('"]')) {
            try {
                cleanUrl = JSON.parse(cleanUrl)[0];
            } catch (e) {}
        }
        if (cleanUrl.startsWith('[') && cleanUrl.endsWith(']')) {
            cleanUrl = cleanUrl.slice(2, -2);
        }
        return cleanUrl || 'https://placehold.co/600x400?text=No+Image';
    }

    // Hàm gọi API
    async function fetchProducts() {
        try {
            loadingElement.classList.remove('hidden');
            
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`);
            }

            const data = await response.json();
            loadingElement.classList.add('hidden');

            if (!Array.isArray(data) || data.length === 0) {
                showError('Không tìm thấy sản phẩm nào.');
                return;
            }

            renderProducts(data.slice(0, 20));

        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            loadingElement.classList.add('hidden');
            showError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
        }
    }

    // Hàm hiển thị sản phẩm
    function renderProducts(products) {
        productList.innerHTML = '';
        productList.classList.remove('hidden');

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.cursor = 'pointer';

            const imageUrl = cleanImageUrl(product.images?.[0]);
            const price = product.price ? product.price.toLocaleString('vi-VN') : 'N/A';
            const categoryName = product.category?.name || 'Uncategorized';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://placehold.co/600x400?text=Error+Image'">
                <div class="product-info">
                    <div class="product-category">${categoryName}</div>
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${price}</p>
                    <button class="btn-details">Xem Chi Tiết</button>
                </div>
            `;

            card.addEventListener('click', () => showProductDetail(product));
            productList.appendChild(card);
        });
    }

    // Hàm hiển thị chi tiết sản phẩm
    function showProductDetail(product) {
        const imageUrl = cleanImageUrl(product.images?.[0]);
        const createdDate = new Date(product.creationAt).toLocaleDateString('vi-VN');
        const updatedDate = new Date(product.updatedAt).toLocaleDateString('vi-VN');

        document.getElementById('modal-image').src = imageUrl;
        document.getElementById('modal-image').onerror = () => {
            document.getElementById('modal-image').src = 'https://placehold.co/600x400?text=Error+Image';
        };
        
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-category').textContent = `Danh mục: ${product.category?.name || 'N/A'}`;
        document.getElementById('modal-description').textContent = product.description || 'Không có mô tả';
        document.getElementById('modal-price').textContent = `$${product.price.toLocaleString('vi-VN')}`;
        document.getElementById('modal-slug').textContent = product.slug || 'N/A';
        document.getElementById('modal-id').textContent = product.id;
        document.getElementById('modal-created').textContent = createdDate;
        document.getElementById('modal-updated').textContent = updatedDate;

        // Hiển thị danh sách ảnh
        const imagesList = document.getElementById('modal-images-list');
        imagesList.innerHTML = '';
        if (product.images && product.images.length > 0) {
            product.images.forEach((img, index) => {
                const cleanImg = cleanImageUrl(img);
                const imgElement = document.createElement('img');
                imgElement.src = cleanImg;
                imgElement.alt = `Ảnh ${index + 1}`;
                imgElement.className = 'thumbnail';
                imgElement.onerror = () => {
                    imgElement.src = 'https://placehold.co/600x400?text=Error';
                };
                imagesList.appendChild(imgElement);
            });
        } else {
            imagesList.innerHTML = '<p>Không có ảnh nào</p>';
        }

        modal.classList.remove('hidden');
    }

    // Đóng modal
    function closeModal() {
        modal.classList.add('hidden');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Hàm hiển thị lỗi
    function showError(message) {
        errorElement.innerHTML = `<span class="error-icon">⚠️</span><p>${message}</p>`;
        errorElement.classList.remove('hidden');
    }

    fetchProducts();
});