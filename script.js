document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.escuelajs.co/api/v1/products';
    const productList = document.getElementById('product-list');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error-message');

    // Hàm gọi API
    async function fetchProducts() {
        try {
            // Hiển thị loading
            loadingElement.classList.remove('hidden');
            
            // Gọi API (Lấy 20 sản phẩm đầu tiên để demo cho nhanh)
            // Chúng ta có thể dùng parameter ?offset=0&limit=20 nếu API hỗ trợ, 
            // nhưng ở đây ta gọi link gốc như yêu cầu và xử lý mảng trả về.
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`);
            }

            const data = await response.json();

            // Ẩn loading
            loadingElement.classList.add('hidden');

            // Kiểm tra dữ liệu
            if (!Array.isArray(data) || data.length === 0) {
                showError('Không tìm thấy sản phẩm nào.');
                return;
            }

            // Hiển thị sản phẩm (Lấy tối đa 20 sản phẩm mới nhất)
            renderProducts(data.slice(0, 20));

        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            loadingElement.classList.add('hidden');
            showError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
        }
    }

    // Hàm hiển thị sản phẩm ra HTML
    function renderProducts(products) {
        productList.innerHTML = ''; // Xóa nội dung cũ
        productList.classList.remove('hidden');

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Xử lý ảnh: lấy ảnh đầu tiên hoặc ảnh mặc định nếu lỗi
            // API này trả về mảng images, đôi khi là chuỗi JSON stringify bị lỗi, cần clean nếu cần thiết
            // Nhưng để đơn giản ta lấy phần tử đầu tiên.
            let imageUrl = 'https://placehold.co/600x400?text=No+Image';
            if (product.images && product.images.length > 0) {
                // Một số dữ liệu từ API này bị lỗi format ["[\"url\"]"], ta cứ lấy raw trước
                // Cải thiện: check clean URL
                let cleanUrl = product.images[0];
                if (cleanUrl.startsWith('["') && cleanUrl.endsWith('"]')) {
                     try {
                        cleanUrl = JSON.parse(cleanUrl)[0];
                     } catch (e) {}
                }
                // Xử lý trường hợp ảnh bị ngoặc vuông bao quanh chuỗi (lỗi dữ liệu phổ biến ở API này)
                if (cleanUrl.startsWith('[') && cleanUrl.endsWith(']')) {
                    cleanUrl = cleanUrl.slice(2, -2);
                }
                imageUrl = cleanUrl;
            }

            card.innerHTML = `
                <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://placehold.co/600x400?text=Error+Image'">
                <div class="product-info">
                    <div class="product-category">${product.category ? product.category.name : 'Uncategorized'}</div>
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
                </div>
            `;

            productList.appendChild(card);
        });
    }

    // Hàm hiển thị lỗi
    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    // Bắt đầu gọi hàm
    fetchProducts();
});