const form = document.getElementById("upload-form");
const resultImage = document.getElementById("result-image");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("image-input");
  const file = fileInput.files[0];

  if (!file) {
    alert("Select image first");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/remove-bg", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    alert("API Error");
    return;
  }

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  resultImage.src = imageUrl;
});
