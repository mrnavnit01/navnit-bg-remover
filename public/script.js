fileInput.addEventListener('change', async function() {

    const file = this.files[0];
    if (!file) return;

    outputSection.style.display = 'block';
    inputImg.src = URL.createObjectURL(file);

    loaderContainer.style.display = 'block';
    outputImg.style.display = 'none';
    downloadBtn.style.display = 'none';

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("/remove-bg", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert("Server Error: " + errorText);
            loaderContainer.style.display = 'none';
            return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        loaderContainer.style.display = 'none';
        outputImg.src = url;
        outputImg.style.display = 'block';

        downloadBtn.href = url;
        downloadBtn.download = "Navnit_Result.png";
        downloadBtn.style.display = 'inline-block';

    } catch (err) {
        alert("Network Error");
        loaderContainer.style.display = 'none';
    }
});
