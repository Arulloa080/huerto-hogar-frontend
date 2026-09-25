//LÓGICA COMPLETA DE USUARIOS

document.addEventListener('DOMContentLoaded', function() {
    let usuarios = [
        { rut: '12.345.678-9', nombre: 'Sofía', apellidos: 'Catalán', correo: 'sofia@duoc.cl', tipo: 'Administrador', region: 'Región Metropolitana', comuna: 'Santiago' },
        { rut: '9.876.543-2', nombre: 'Juan', apellidos: 'Pérez', correo: 'juan@gmail.com', tipo: 'Cliente', region: 'Valparaíso', comuna: 'Viña del Mar' },
        { rut: '15.123.456-7', nombre: 'María', apellidos: 'González', correo: 'maria@profesor.duoc.cl', tipo: 'Vendedor', region: 'Región del Biobío', comuna: 'Concepción' }
    ];

    const cuerpoTabla = document.getElementById('cuerpoTablaUsuarios');
    const formUsuario = document.getElementById('formUsuario');
    const modalUsuarioEl = document.getElementById('modalUsuario');
    const modalUsuario = modalUsuarioEl ? new bootstrap.Modal(modalUsuarioEl) : null;

    function renderizarTabla() {
        if (!cuerpoTabla) return;
        
        cuerpoTabla.innerHTML = '';

        usuarios.forEach((usuario, index) => {
            const fila = document.createElement('tr');
            
            let badgeClass = 'bg-secondary';
            if (usuario.tipo === 'Administrador') badgeClass = 'bg-primary';
            if (usuario.tipo === 'Vendedor') badgeClass = 'bg-info text-dark';
            if (usuario.tipo === 'Cliente') badgeClass = 'bg-success';

            fila.innerHTML = `
                <td>${usuario.rut}</td>
                <td>${usuario.nombre} ${usuario.apellidos}</td>
                <td>${usuario.correo}</td>
                <td><span class="badge ${badgeClass}">${usuario.tipo}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarUsuario(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            `;
            
            cuerpoTabla.appendChild(fila);
        });
    }

    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();

            const nuevoUsuario = {
                rut: document.getElementById('rut').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                correo: document.getElementById('correo').value,
                tipo: document.getElementById('tipoUsuario').value,
                region: document.getElementById('region').value,
                comuna: document.getElementById('comuna').value
            };

            usuarios.push(nuevoUsuario);
            renderizarTabla();
            formUsuario.reset();
            
            // Limpiar validaciones visuales
            document.getElementById('rut').classList.remove('is-valid', 'is-invalid');
            document.getElementById('correo').classList.remove('is-valid', 'is-invalid');
            
            if (modalUsuario) modalUsuario.hide();
        });
    }

    window.eliminarUsuario = function(index) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            usuarios.splice(index, 1);
            renderizarTabla();
        }
    };

    window.editarUsuario = function(index) {
        const usuario = usuarios[index];
        document.getElementById('rut').value = usuario.rut;
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('apellidos').value = usuario.apellidos;
        document.getElementById('correo').value = usuario.correo;
        document.getElementById('tipoUsuario').value = usuario.tipo;
        document.getElementById('region').value = usuario.region;
        
        // Disparar evento change para cargar comunas
        document.getElementById('region').dispatchEvent(new Event('change'));
        
        setTimeout(() => {
            document.getElementById('comuna').value = usuario.comuna;
        }, 100);
        
        usuarios.splice(index, 1);
        renderizarTabla();
        
        if (modalUsuario) modalUsuario.show();
    };

    renderizarTabla();
});