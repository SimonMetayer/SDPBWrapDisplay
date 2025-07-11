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

  cidImgMax.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  cidImgMin.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
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

  img1.src = `images/Amplitude/${prefix1}_minmax=max_improv={${improv}}.png`;
  img2.src = `images/Amplitude/${prefix1}_minmax=min_improv={${improv}}.png`;
  img3.src = `images/ComplexAmplitude/${prefix2}_minmax=max_improv={${improv}}.png`;
  img4.src = `images/ComplexAmplitude/${prefix2}_minmax=min_improv={${improv}}.png`;

  const convPrefix = `ConvergenceTable_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}`;
  convImgMax.src = `images/ConvergenceTable/${convPrefix}_minmax=max_improv={${improv}}.png`;
  convImgMin.src = `images/ConvergenceTable/${convPrefix}_minmax=min_improv={${improv}}.png`;

  almondGrid.innerHTML = "";
  almondCoords.forEach(([x, y]) => {
    const almondPrefix = `Almond_d=${d}_x=${x}_y=${y}_lmax=${lmax}_Nmax=${Nmax}`;
    const img = document.createElement("img");
    img.src = `images/Almond/${almondPrefix}_improv={${improv}}.png`;
    img.alt = `Almond (${x},${y})`;
    almondGrid.appendChild(img);
  });

  updateCidImages();
}

[dSlider, LSlider, lmaxSlider, NmaxSlider, improvSelect].forEach(el =>
  el.addEventListener("input", updateImages)
);

// --- Unified config object with allowed values ---
const configByD = {
  4: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0, 2, 3] },
    paramL: { min: 0, max: 6, step: 2 },
    paramLmax: { min: 14, max: 16, step: 2 },
    paramNmax: { min: 10, max: 11, step: 1 },
  },
  6: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0, 2, 3] },
    paramL: { min: 0, max: 6, step: 2 },
    paramLmax: { min: 14, max: 16, step: 2 },
    paramNmax: { min: 10, max: 11, step: 1 },
  },
};

function snapCIValue(val, allowed) {
  return allowed.reduce((prev, curr) =>
    Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
  );
}

function updateSlider(sliderId, config) {
  const slider = document.getElementById(sliderId);
  const valSpan = document.getElementById(`val${sliderId.slice(5)}`);

  slider.min = config.min;
  slider.max = config.max;
  slider.step = config.step;

  let newVal = +slider.value;
  if (newVal < config.min || newVal > config.max) {
    newVal = config.min;
  }

  if (sliderId === "paramCI" && config.allowed) {
    newVal = snapCIValue(newVal, config.allowed);
  }

  slider.value = newVal;
  valSpan.textContent = newVal;
}

document.getElementById("paramD").addEventListener("input", function () {
  const d = this.value;
  document.getElementById("valD").textContent = d;

  const config = configByD[d];
  if (!config) return;

  for (const [id, conf] of Object.entries(config)) {
    updateSlider(id, conf);
  }

  updateImages();
});

ciSlider.addEventListener("input", () => {
  const d = +dSlider.value;
  const allowed = configByD[d]?.paramCI?.allowed || [];
  const snappedVal = snapCIValue(Number(ciSlider.value), allowed);
  if (snappedVal !== Number(ciSlider.value)) {
    ciSlider.value = snappedVal;
  }
  document.getElementById("valCI").textContent = ciSlider.value;
  updateImages();
});

["paramCI", "paramL", "paramLmax", "paramNmax"].forEach(id => {
  const slider = document.getElementById(id);
  const valSpan = document.getElementById(`val${id.slice(5)}`);
  slider.addEventListener("input", () => {
    valSpan.textContent = slider.value;
  });
});

// Initial render
updateImages();

// LaTeX content load
fetch('explanation.tex')
  .then(res => res.text())
  .then(tex => {
    tex = tex.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
    tex = tex.replace(/\\section\*?\{([^}]+)\}/g, '<h2>$1</h2>');
    document.getElementById('latex-explanation').innerHTML = tex;
    if (window.MathJax?.typeset) MathJax.typeset();
  });

// Load image metadata
fetch('image_count.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('image-count').textContent = `Total plots: ${data.count}`;
    document.getElementById('last-update').textContent = `Last updated: ${new Date(data.last_updated).toLocaleString()}`;
  })
  .catch(error => {
    console.error('Error loading image count:', error);
  });
