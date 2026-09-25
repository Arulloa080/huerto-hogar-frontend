document.addEventListener('DOMContentLoaded', function() {
    function esCorreoValido(correo) {
        return correo.endsWith('@duoc.cl') ||
               correo.endsWith('@profesor.duoc.cl') ||
               correo.endsWith('@gmail.com');
    }
    const correoLogin = document.getElementById('correoLogin');
    const passLogin = document.getElementById('passLogin');
    const btnLogin = document.getElementById('btnLogin');
    const errorCorreoLogin = document.getElementById('errorCorreoLogin');
    const errorPassLogin = document.getElementById('errorPassLogin');

    if (correoLogin && passLogin && btnLogin) {
        
        correoLogin.addEventListener('input', function(e) {
            const valor = e.target.value;
            if (!esCorreoValido(valor)) {
                errorCorreoLogin.className = "mensaje-error";
                errorCorreoLogin.textContent = "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
                btnLogin.disabled = true;
            } else {
                errorCorreoLogin.textContent = "";
                verificarBotonLogin();
            }
        });

        passLogin.addEventListener('input', function(e) {
            const valor = e.target.value;
            if (valor.length < 4 || valor.length > 10) {
                errorPassLogin.className = "mensaje-error";
                errorPassLogin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                btnLogin.disabled = true; 
            } else {
                errorPassLogin.textContent = "";
                verificarBotonLogin();
            }
        });

        function verificarBotonLogin() {
            if (esCorreoValido(correoLogin.value) && passLogin.value.length >= 4 && passLogin.value.length <= 10) {
                btnLogin.disabled = false;
            }
        }

        btnLogin.addEventListener('click', function(e) {
            e.preventDefault(); 
            const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioHuertoHogar'));
            
            if (usuarioGuardado && usuarioGuardado.correo === correoLogin.value && usuarioGuardado.password === passLogin.value) {
                errorCorreoLogin.className = "mensaje-exito";
                errorCorreoLogin.textContent = "¡Inicio de sesión correcto! Bienvenido.";
                window.location.href = "index.html";
            } else {
                errorCorreoLogin.className = "mensaje-error";
                errorCorreoLogin.textContent = "Credenciales incorrectas o usuario no registrado.";
            }
        });
    }

    const correoReg = document.getElementById('correoReg');
    const passReg = document.getElementById('passReg');
    const btnRegistro = document.getElementById('btnRegistro');
    const errorCorreoReg = document.getElementById('errorCorreoReg');
    const errorPassReg = document.getElementById('errorPassReg');
    
    if (correoReg && passReg && btnRegistro) {
        
        correoReg.addEventListener('input', function(e){
            const valor = e.target.value;
            if (!esCorreoValido(valor)) {
                errorCorreoReg.className = "mensaje-error";
                errorCorreoReg.textContent = "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
                btnRegistro.disabled = true; 
            } else {
                errorCorreoReg.textContent = "";
                verificarBotonRegistro();
            }
        });

        passReg.addEventListener('input', function(e) {
            const valor = e.target.value;
            if (valor.length < 4 || valor.length > 10) {
                errorPassReg.className = "mensaje-error";
                errorPassReg.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
                btnRegistro.disabled = true;
            } else {
                errorPassReg.textContent = "";
                verificarBotonRegistro();
            }
        });

        function verificarBotonRegistro() {
            if (esCorreoValido(correoReg.value) && passReg.value.length >= 4 && passReg.value.length <= 10) {
                btnRegistro.disabled = false;
            }
        }

        btnRegistro.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const usuarioNuevo = {
                correo: correoReg.value,
                password: passReg.value
            };
            
            localStorage.setItem('usuarioHuertoHogar', JSON.stringify(usuarioNuevo));
            
            errorCorreoReg.className = "mensaje-exito";
            errorCorreoReg.textContent = "¡Registro exitoso! Ya puedes iniciar sesión.";
            
            document.getElementById('formRegistro').reset();
            btnRegistro.disabled = true;
        });
    }
});