// 1. Validacio del rut chileno
/**
 * Valida un Run chileno
 * @param {string} run - Run sin puntos ni guión 
 * @returns {boolean} 
 */
function validarRUN(run) {
    // Limpia el campo del Run(puntos, guiones, espacios)
    run = run.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '').toUpperCase();

    // Valida la longitud del Run (7 a 9 caracteres incluido el digito verificador)
    if (run.length < 7 || run.length > 9) {
        return false;
    }

    // Separa el numero del run principal y dígito verificador
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    // Valida que el run sean solo numeros(sin dv)
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    // Valida que el dv sea número o K
    if (!/^\d$/.test(dv) && dv !== 'K') {
        return false;
    }

    //Calcular procesos roboticos
    let suma = 0;
    let multiplicador = 2;

    // Recorrer el run de derecha a izquierda
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado;

    if (resto === 11) {
        dvEsperado = '0';
    } else if (resto === 10) {
        dvEsperado = 'K';
    } else {
        dvEsperado = resto.toString();
    }

    return dv === dvEsperado;
}

/**
 * Convierte el run a un formato con puntos y con guion
 * @param {string} run - RUN sin formato
 * @returns {string} - RUN con formato
 */
function formatearRUN(run) {
    run = run.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '').toUpperCase();
    if (run.length <= 1) return run;

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    // Agregar puntos cada 3 dígitos desde la derecha
    let cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpoFormateado}-${dv}`;
}


// 2.Validacion en tiempo real del rut
/**
 * Aplica la validación en tiempo real al campo de RUN.
 * Debe llamarse cuando el DOM esté cargado.
 */
function aplicarValidacionRUN() {
    const inputRUN = document.getElementById('rut');
    const feedbackRUN = document.getElementById('rut').nextElementSibling;

    if (!inputRUN) return; // Si no existe el campo, salir

    // Evento que valida si esta correcto mientras escribe
    inputRUN.addEventListener('input', function () {
        // Solo permitir números y la letra K/k
        this.value = this.value.replace(/[^0-9kK]/g, '').toUpperCase();

        const runLimpio = this.value.replace(/\./g, '').replace(/-/g, '');

        // Validar longitud mínima del rut
        if (runLimpio.length >= 7) {
            if (validarRUN(runLimpio)) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                if (feedbackRUN) {
                    feedbackRUN.textContent = 'RUN válido ✓';
                    feedbackRUN.classList.remove('invalid-feedback');
                    feedbackRUN.classList.add('valid-feedback');
                }
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
                if (feedbackRUN) {
                    feedbackRUN.textContent = 'RUN inválido. Verifica el dígito verificador.';
                    feedbackRUN.classList.remove('valid-feedback');
                    feedbackRUN.classList.add('invalid-feedback');
                }
            }
        } else {
            this.classList.remove('is-valid', 'is-invalid');
            if (feedbackRUN) {
                feedbackRUN.textContent = 'Ingrese un RUN válido (mínimo 7 caracteres).';
                feedbackRUN.classList.remove('valid-feedback');
                feedbackRUN.classList.add('invalid-feedback');
            }
        }
    });

    // Evento 'blur' para formatear al salir del campo
    inputRUN.addEventListener('blur', function () {
        const runLimpio = this.value.replace(/\./g, '').replace(/-/g, '');
        if (runLimpio.length >= 7) {
            this.value = formatearRUN(runLimpio);
        }
    });

    // Evento 'focus' para limpiar el formato al entrar
    inputRUN.addEventListener('focus', function () {
        this.value = this.value.replace(/\./g, '').replace(/-/g, '');
    });
}


// 3.Validar el correo
/**
 * Valida que el correo tenga un formato correcto
 * @param {string} email - Correo a validar
 * @returns {boolean}
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

    if (!regex.test(email)) return false;

    // Verificar que termine con uno de los dominios permitidos
    return dominiosPermitidos.some(dominio => email.toLowerCase().endsWith(dominio));
}

//Aplica validación al campo de correo. 
function aplicarValidacionEmail() {
    const inputEmail = document.getElementById('correo');
    const feedbackEmail = document.getElementById('correo').nextElementSibling;

    if (!inputEmail) return;

    inputEmail.addEventListener('input', function () {
        const email = this.value.trim();

        if (email.length === 0) {
            this.classList.remove('is-valid', 'is-invalid');
            return;
        }

        if (validarEmail(email)) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            if (feedbackEmail) {
                feedbackEmail.textContent = 'Correo inválido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com';
            }
        }
    });
}


// 4. validacion de limite de caracteres
//Aplica limite de caracteres en el text area

function aplicarLimiteCaracteres() {
    const textarea = document.getElementById('comentario');
    const contador = document.getElementById('contadorCaracteres');

    if (!textarea) return;

    textarea.setAttribute('maxlength', '500');

    textarea.addEventListener('input', function () {
        const restantes = 500 - this.value.length;

        if (contador) {
            contador.textContent = `${this.value.length}/500 caracteres`;

            // Cambiar color de la alerta cuando se acerque al límite
            if (restantes <= 50) {
                contador.classList.add('text-danger');
            } else {
                contador.classList.remove('text-danger');
            }
        }
    });
}


// 5. Iniciar todas la validaciones

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    aplicarValidacionRUN();
    aplicarValidacionEmail();
    aplicarLimiteCaracteres();

    console.log('✅ Validaciones de HuertoHogar cargadas correctamente');
});