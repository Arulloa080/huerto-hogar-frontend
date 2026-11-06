//LÓGICA DE MENSAJES DE CONTACTO


document.addEventListener('DOMContentLoaded', function() {
    let mensajes = [
        { id: 1, fecha: '25/09/2026', remitente: 'juan.perez@gmail.com', asunto: 'Consulta sobre despacho a Puerto Montt', mensaje: 'Hola, quisiera saber si realizan despachos a Puerto Montt y cuál es el tiempo de entrega.', estado: 'No leído' },
        { id: 2, fecha: '24/09/2026', remitente: 'maria.gonzalez@duoc.cl', asunto: 'Problema con mi último pedido #4590', mensaje: 'Buenos días, recibí mi pedido pero faltaban 2 productos. ¿Cómo puedo reclamar?', estado: 'Leído' },
        { id: 3, fecha: '23/09/2026', remitente: 'contacto@empresa.cl', asunto: 'Propuesta de alianza comercial', mensaje: 'Somos una empresa de logística y nos gustaría proponer una alianza comercial.', estado: 'Leído' }
    ];

    const tablaCuerpo = document.getElementById('cuerpoTablaMensajes');
    const modalMensajeEl = document.getElementById('modalMensaje');
    const modalMensaje = modalMensajeEl ? new bootstrap.Modal(modalMensajeEl) : null;

    function renderizarTabla() {
        if (!tablaCuerpo) return;
        
        tablaCuerpo.innerHTML = '';

        mensajes.forEach((msg, index) => {
            const fila = document.createElement('tr');
            
            if (msg.estado === 'No leído') {
                fila.classList.add('table-active', 'fw-bold');
            }

            const badgeClass = msg.estado === 'No leído' ? 'bg-warning text-dark' : 'bg-success';

            fila.innerHTML = `
                <td>${msg.fecha}</td>
                <td>${msg.remitente}</td>
                <td>${msg.asunto}</td>
                <td><span class="badge ${badgeClass}">${msg.estado}</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="verMensaje(${index})">Ver</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarMensaje(${index})">Eliminar</button>
                </td>
            `;
            
            tablaCuerpo.appendChild(fila);
        });
    }

    window.verMensaje = function(index) {
        const msg = mensajes[index];
        
        document.getElementById('verRemitente').textContent = msg.remitente;
        document.getElementById('verAsunto').textContent = msg.asunto;
        document.getElementById('verFecha').textContent = msg.fecha;
        document.getElementById('verMensajeTexto').textContent = msg.mensaje;
        
        // Marcar como leído
        msg.estado = 'Leído';
        renderizarTabla();
        
        if (modalMensaje) modalMensaje.show();
    };

    window.eliminarMensaje = function(index) {
        if (confirm('¿Estás seguro de eliminar este mensaje?')) {
            mensajes.splice(index, 1);
            renderizarTabla();
        }
    };

    renderizarTabla();
});