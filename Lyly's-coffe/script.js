
let isLoggedIn = false; 
let cart = [];
let registeredUser = "admin";
let registeredPass = "admin123";


function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const activePage = document.getElementById('page-' + pageId);
    if(activePage) {
        activePage.classList.add('active');
    }

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if(window.event && window.event.target && window.event.target.classList.contains('nav-btn')) {
        window.event.target.classList.add('active');
    } else {
        if (pageId === 'auth-box') document.getElementById('auth-nav-btn').classList.add('active');
        if (pageId === 'brew') document.getElementById('btn-nav-brew').classList.add('active');
        if (pageId === 'bites') document.getElementById('btn-nav-bites').classList.add('active');
        if (pageId === 'cart') document.getElementById('btn-nav-cart').classList.add('active');
        if (pageId === 'home') document.getElementById('btn-nav-home').classList.add('active');
        if (pageId === 'about') document.getElementById('btn-nav-about').classList.add('active');
    }
}

function toggleAuthForm(target) {
    const loginBox = document.getElementById('box-login');
    const registerBox = document.getElementById('box-register');
    if(target === 'register') {
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    } else {
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    }
}

function registerAction() {
    const name = document.getElementById('reg-name').value;
    const user = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;

    if(name.trim() !== "" && user.trim() !== "" && pass.trim() !== "") {
        registeredUser = user;
        registeredPass = pass;
        alert('Pendaftaran Berhasil! Silakan masuk menggunakan akun baru Anda.');
        toggleAuthForm('login');
    } else {
        alert('Mohon lengkapi semua data pendaftaran!');
    }
}

function loginAction() {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    if(user === registeredUser && pass === registeredPass) {
        alert('Selamat datang kembali, ' + user + '!');
        document.getElementById('auth-nav-btn').innerText = "👤 " + user;
        isLoggedIn = true; 
        showPage('home');
    } else {
        alert('Username atau Password salah! (Default: admin / admin123)');
    }
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
    alert(name + " berhasil ditambahkan ke keranjang!");
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if(cart.length === 0) {
        cartList.innerHTML = `<p style="color:#6d594f; text-align:center;">Keranjang Anda masih kosong.</p>`;
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
        return;
    }

    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item) => {
        total += item.price;
        cartList.innerHTML += `
            <div class="cart-item">
                <span><strong>${item.name}</strong></span>
                <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
        `;
    });

    document.getElementById('total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
    cartTotal.style.display = 'block';
    checkoutBtn.style.display = 'block';
}

function checkout() {
    if (!isLoggedIn) {
        alert('Akses Ditolak: Anda harus Login atau Register terlebih dahulu sebelum melakukan transaksi checkout!');
        showPage('auth-box'); 
        return;
    }
    alert('Terima kasih telah memesan di Lyly\'s Brew & Bites! Pesanan Anda sedang diproses.');
    cart = [];
    updateCartUI();
    showPage('home');
}
