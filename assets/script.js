let isLoggedIn = false;

// Fungsi untuk menampilkan form login atau registrasi
function toggleForm(form) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (form === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
    }
}

// Fungsi untuk menangani login
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('https://moreda-backend-lts-502593199332.asia-southeast2.run.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login berhasil!');
            
            // Add fade-out effect to the login page
            document.body.classList.add('fade');
            
            // Wait for the fade-out to complete (1 second)
            setTimeout(() => {
                // Redirect to the search page
                window.location.href = 'search.html';
            }, 1000);
        } else {
            alert(`Login gagal: ${result.message}`);
        }
    } catch (error) {
        alert('Terjadi kesalahan saat login');
    }
}


// Fungsi untuk menangani registrasi
async function handleRegister() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch('https://moreda-backend-lts-502593199332.asia-southeast2.run.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registrasi berhasil!\nSilakan login menggunakan akun Anda.');
            toggleForm('login');
        } else {
            alert(`Registrasi gagal: ${result.message}`);
        }
    } catch (error) {
        alert('Terjadi kesalahan saat registrasi');
    }
}

// Fungsi untuk mencari film
async function searchMovie() {
    const title = document.getElementById('search-title').value;
    const genre = document.getElementById('search-genre').value;

    // Pastikan setidaknya satu field diisi
    if (!title && !genre) {
        alert('Please enter a search query');
        return;
    }

    // Tentukan endpoint berdasarkan data yang diisi
    let endpoint = '';
    if (title && genre) {
        endpoint = 'https://moreda-backend-lts-502593199332.asia-southeast2.run.app/movies/search';  // Pencarian berdasarkan title dan genre
    } else if (title) {
        endpoint = 'https://moreda-backend-lts-502593199332.asia-southeast2.run.app/movies/search/title';  // Pencarian hanya berdasarkan title
    } else if (genre) {
        endpoint = 'https://moreda-backend-lts-502593199332.asia-southeast2.run.app/movies/search/genre';  // Pencarian hanya berdasarkan genre
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genres: genre })  // Mengirim data dalam bentuk JSON
        });

        const movies = await response.json();
        console.log('Movies:', movies);  // Melihat data yang diterima dari server
        
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (movies.length > 0) {
            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.textContent = movie.title; // Ganti dengan properti film sesuai data
                resultsDiv.appendChild(movieElement);
            });
        } else {
            resultsDiv.textContent = 'No results found';
        }
    } catch (error) {
        console.error('Error:', error);  // Log error ke konsol
        alert('Error while fetching movies');
    }
}


