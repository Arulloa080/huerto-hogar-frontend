/**
 * Valida un Run chileno
 * @param {string} run 
 * @returns {boolean} 
 */
function validarRUN(run) {

    run = run.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '').toUpperCase();

    if (run.length < 7 || run.length > 9) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    if (!/^\d$/.test(dv) && dv !== 'K') {
        return false;
    }


    let suma = 0;
    let multiplicador = 2;

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
 * @param {string} run 
 * @returns {string} 
 */
function formatearRUN(run) {
    run = run.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '').toUpperCase();
    if (run.length <= 1) return run;

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    let cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpoFormateado}-${dv}`;
}

/**
 * Aplica la validación en tiempo real al campo de RUN.
 * Debe llamarse cuando el DOM esté cargado.
 */
function aplicarValidacionRUN() {
    const inputRUN = document.getElementById('rut');
    const feedbackRUN = document.getElementById('rut').nextElementSibling;

    if (!inputRUN) return; 

    inputRUN.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9kK]/g, '').toUpperCase();

        const runLimpio = this.value.replace(/\./g, '').replace(/-/g, '');

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

    inputRUN.addEventListener('blur', function () {
        const runLimpio = this.value.replace(/\./g, '').replace(/-/g, '');
        if (runLimpio.length >= 7) {
            this.value = formatearRUN(runLimpio);
        }
    });

 
    inputRUN.addEventListener('focus', function () {
        this.value = this.value.replace(/\./g, '').replace(/-/g, '');
    });
}


/**
 * Valida que el correo tenga un formato correcto
 * @param {string} email 
 * @returns {boolean}
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

    if (!regex.test(email)) return false;


    return dominiosPermitidos.some(dominio => email.toLowerCase().endsWith(dominio));
}

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



function aplicarLimiteCaracteres() {
    const textarea = document.getElementById('comentario');
    const contador = document.getElementById('contadorCaracteres');

    if (!textarea) return;

    textarea.setAttribute('maxlength', '500');

    textarea.addEventListener('input', function () {
        const restantes = 500 - this.value.length;

        if (contador) {
            contador.textContent = `${this.value.length}/500 caracteres`;

            if (restantes <= 50) {
                contador.classList.add('text-danger');
            } else {
                contador.classList.remove('text-danger');
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    aplicarValidacionRUN();
    aplicarValidacionEmail();
    aplicarLimiteCaracteres();

    console.log(' Validaciones de HuertoHogar cargadas correctamente');
});