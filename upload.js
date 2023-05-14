// upload.js

// Animista



// func. uploadfiles
function uploadFiles(files) {
    let formData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('file', file);
    }
  
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(`Se han subido los siguientes archivos: \n${data.join('\n')}`);

      var element_ul = document.querySelector("#output_uploads");
      var textInner= "";
      
       data.forEach(element => {
        console.log(element);
        textInner += "<li>"+element+"</li>";
       });
       element_ul.innerHTML = textInner;
       

    })
    .catch(error => console.error(error));
  }
  
  //evento drop
  document.getElementById('drop_zone').addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
  
    uploadFiles(e.dataTransfer.files);
  });
  
  //evento dragover
  document.getElementById('drop_zone').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  });

  //evento change
  document.getElementById('file_input').addEventListener('change', function(e) {
    uploadFiles(e.target.files);
  });