// Datos quemados para el ejemplo
const userData = {
    email: "mateolisintuna@gmail.com",
    password: "admin123"
};

function validateLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    if (email === userData.email && password === userData.password) {
        alert('Login exitoso!');
        window.location.href = 'index.html';
    } else {
        alert('Email o contraseña incorrectos');
    }
}