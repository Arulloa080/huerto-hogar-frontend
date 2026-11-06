const datosChile = {
    "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Las Condes", "Providencia", "Ñuñoa", "San bernardo"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz", "Nacimiento"],
    "Región de La Araucanía": ["Temuco", "Villarrica", "Pucón", "Padre Las Casas"],
    "Región de Los Lagos": ["Puerto Montt", "Puerto Varas", "Osorno"]
};

document.addEventListener('DOMContentLoaded', function() {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    
    if (selectRegion) {
        for (let region in datosChile) {
            let option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        }

        
        selectRegion.addEventListener('change', function() {
           
            selectComuna.innerHTML = '<option value="" selected disabled>Seleccione una comuna...</option>';
            
            const regionSeleccionada = this.value;
            
            if (regionSeleccionada && datosChile[regionSeleccionada]) {
                datosChile[regionSeleccionada].forEach(function(comuna) {
                    let option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
                
                selectComuna.disabled = false;
            } else {
                selectComuna.disabled = true;
            }
        });
    }
});

