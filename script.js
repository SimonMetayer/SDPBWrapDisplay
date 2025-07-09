const dSlider = document.getElementById("paramD");
const ciSlider = document.getElementById("paramCI");
const LSlider = document.getElementById("paramL");
const lmaxSlider = document.getElementById("paramLmax");
const NmaxSlider = document.getElementById("paramNmax");
const improvSelect = document.getElementById("paramImprov");

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");

const convImgMax = document.getElementById("convImgMax");
const convImgMin = document.getElementById("convImgMin");

const almondGrid = document.getElementById("almondGrid");
const cidImgMax = document.getElementById("cidImgMax");
const cidImgMin = document.getElementById("cidImgMin");

const almondCoords = [
  [0, 2],
  [0, 3],
  [2, 3]
];

function updateLabels() {
  document.getElementById("valD").textContent = dSlider.value;
  document.getElementById("valCI").textContent = ciSlider.value;
  document.getElementById("valL").textContent = LSlider.value;
  document.getElementById("valLmax").textContent = lmaxSlider.value;
  document.getElementById("valNmax").textContent = NmaxSlider.value;
}

function updateCidImages() {
  const ci = ciSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;

  cidImgMax.src = `images/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  cidImgMin.src = `images/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
}

function updateImages() {
  updateLabels();

  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;

  const prefix1 = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}`;
  const prefix2 = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}`;

  img1.src = `images/${prefix1}_minmax=max_improv={${improv}}.png`;
  img2.src = `images/${prefix1}_minmax=min_improv={${improv}}.png`;
  img3.src = `images/${prefix2}_minmax=max_improv={${improv}}.png`;
  img4.src = `images/${prefix2}_minmax=min_improv={${improv}}.png`;

  const convPrefix = `ConvergenceTable_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}`;
  convImgMax.src = `images/${convPrefix}_minmax=max_improv={${improv}}.png`;
  convImgMin.src = `images/${convPrefix}_minmax=min_improv={${improv}}.png`;

  almondGrid.innerHTML = "";
  almondCoords.forEach(([x, y]) => {
    const almondPrefix = `Almond_d=${d}_x=${x}_y=${y}_lmax=${lmax}_Nmax=${Nmax}`;
    const img = document.createElement("img");
    img.src = `images/${almondPrefix}_improv={${improv}}.png`;
    img.alt = `Almond (${x},${y})`;
    almondGrid.appendChild(img);
  });

  updateCidImages();
}

[dSlider, LSlider, lmaxSlider, NmaxSlider, improvSelect].forEach(el =>
  el.addEventListener("input", updateImages)
);

// Allowed discrete values for ci slider
const allowedCIValues = [0, 2, 3];

function snapCIValue(val) {
  return allowedCIValues.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );
}

ciSlider.addEventListener("input", () => {
  const snappedVal = snapCIValue(Number(ciSlider.value));
  if (snappedVal !== Number(ciSlider.value)) {
    ciSlider.value = snappedVal;
  }
  updateImages();
});

updateImages();

// Fetch and render LaTeX explanation
fetch('explanation.tex')
  .then(response => response.text())
  .then(tex => {
    const container = document.getElementById('latex-explanation');
    container.innerHTML = tex;

    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset();
    }
  })
  .catch(err => {
    console.error("Could not load explanation.tex:", err);
  });

