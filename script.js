const iSlider = document.getElementById('paramI');
const jSlider = document.getElementById('paramJ');
const kSlider = document.getElementById('paramK');
const img = document.getElementById('outputImage');

function updateImage() {
  const i = iSlider.value;
  const j = jSlider.value;
  const k = kSlider.value;

  document.getElementById('valI').textContent = i;
  document.getElementById('valJ').textContent = j;
  document.getElementById('valK').textContent = k;

  const filename = `c${i}(c${j})k${k}.png`;
  img.src = `images/${filename}`;
}

// Attach event listeners
[iSlider, jSlider, kSlider].forEach(slider => {
  slider.addEventListener('input', updateImage);
});
