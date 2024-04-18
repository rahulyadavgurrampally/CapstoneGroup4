document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display uploaded image
        var imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `<img src="${URL.createObjectURL(fileInput.files[0])}" alt="Uploaded Image" style="max-width: 100%; max-height: 300px; margin-bottom: 20px;">`;
        
        // Display result
        var result = document.getElementById('result');
        result.innerHTML = `Result: <span class="highlight">${data.result}</span>`;
        
        // Display success message
        var successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerText = 'Image successfully submitted!';
        imagePreview.appendChild(successMessage);
    })
    .catch(error => console.error('Error:', error));
});
