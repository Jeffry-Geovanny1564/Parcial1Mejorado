llamadaDepartamentos();
llamadaMunicipio();
function llamadaDepartamentos(){
    
  // Ruta del archivo JSON
  const jsonFileURL = 'Departamentos.json';
  
  // Realizar una solicitud HTTP GET para obtener el archivo JSON
  fetch(jsonFileURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON.');
      }
      return response.json(); // Parsear la respuesta como JSON
    })
    .then(jsonData => {
      // Trabajar con el objeto JSON
  
      
  
  
     
      // Obtener el elemento de combo box
      const comboBox = document.getElementById('cmbseleccionar');
  
      // Recorrer el JSON y agregar opciones al combo box
      jsonData.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.CodDepto;
          optionElement.textContent = option.DescDepto;
          comboBox.appendChild(optionElement);
  
          
      });
  
    console.log(jsonData);
  
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  
  
  }
  function llamadaMunicipio(){
    
    // Ruta del archivo JSON
    const jsonFileURL = 'Municipios.json';
    
    // Realizar una solicitud HTTP GET para obtener el archivo JSON
    fetch(jsonFileURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON.');
        }
        return response.json(); // Parsear la respuesta como JSON
      })
      .then(jsonData => {
        // Trabajar con el objeto JSON
    
        // Obtener el elemento de combo box
        const comboBox = document.getElementById('cmbseleccionarmunicipio');
    
        // Recorrer el JSON y agregar opciones al combo box
        jsonData.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.CodMunicipio;
            optionElement.textContent = option.Descr;
            comboBox.appendChild(optionElement);
    
            
        });
    
      console.log(jsonData);
    
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    
    
    }
    

document.addEventListener("DOMContentLoaded", function () {
    const fetchButton = document.getElementById("fetchButton");
    const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    const cmbseleccionar = document.getElementById("cmbseleccionar");
    const cmbseleccionarmunicipio = document.getElementById("cmbseleccionarmunicipio");

    fetchButton.addEventListener("click", function () {

        fetch(`https://censopoblacion.gt/indicadores/${cmbseleccionar.value}/${cmbseleccionarmunicipio.value}`)
            .then(response => response.json())
            .then(data => {
                // Limpia la tabla antes de agregar nuevos datos
                dataTable.innerHTML = "";

                const newRow = dataTable.insertRow();
                newRow.innerHTML = `
                    <td>${data[0].nombre}</td>
                    <td>${data[0].capital}</td>
                    <td>${data[0].ext_territorial}</td>
                    <td>${data[0].indice_masculinidad}</td>
                    <td>${data[0].prom_personas_hogar}</td>
                    <td>${data[0].total_sexo_hombre}</td>
                    <td>${data[0].total_sexo_mujeres}</td>
                `;
                var ctx = document.getElementById('pieChart').getContext('2d');
                var myChart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: ['Hombres','Mujeres'],
                    datasets: [{
                      data: [data[0].total_sexo_hombre,data[0].total_sexo_mujeres],
                      backgroundColor: ['yellow', 'green']
                    }]
                  },
                  options: {
                    title: {
                      display: true,
                      text: 'Pie Chart'
                    }
                  }
                });
            })
            .catch(error => {
                dataTable.innerHTML = `<tr><td colspan="7">Error al obtener los datos.</td></tr>`;
                console.error(error);
            });

    });
});
