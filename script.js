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

  // Image and data filename prefixes
  const prefix1 = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}`;
  const prefix2 = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}`;
  const prefix3 = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}`;
  const prefix4 = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}`;
  const convPrefix = `ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}`;

  const minmaxMax = `minmax=max_improv={${improv}}`;
  const minmaxMin = `minmax=min_improv={${improv}}`;

  // Set Amplitude images
  img1.src = `images/Amplitude/${prefix1}_${minmaxMax}.png`;
  img2.src = `images/Amplitude/${prefix1}_${minmaxMin}.png`;

  // Set Amplitude data download links
  const downloadAmplitudeMax = document.getElementById("downloadAmplitudeMax");
  const downloadAmplitudeMin = document.getElementById("downloadAmplitudeMin");
  
  // Set ComplexAmplitude data download links
  const downloadComplexAmplitudeMax = document.getElementById("downloadComplexAmplitudeMax");
  const downloadComplexAmplitudeMin = document.getElementById("downloadComplexAmplitudeMin");
  
  // Set cid data download links
  const downloadcidMax = document.getElementById("downloadcidMax");
  const downloadcidMin = document.getElementById("downloadcidMin");

  downloadAmplitudeMax.href = `data/Amplitude/${prefix1}_${minmaxMax}.txt`;
  downloadAmplitudeMax.download = `${prefix1}_${minmaxMax}.txt`;
  downloadAmplitudeMin.href = `data/Amplitude/${prefix1}_${minmaxMin}.txt`;
  downloadAmplitudeMin.download = `${prefix1}_${minmaxMin}.txt`;
  
  downloadMMax.href = `data/M/${prefix4}_${minmaxMax}.txt`;
  downloadMMax.download = `${prefix4}_${minmaxMax}.txt`;
  downloadMMin.href = `data/M/${prefix4}_${minmaxMin}.txt`;
  downloadMMin.download = `${prefix4}_${minmaxMin}.txt`;
  
  downloadComplexAmplitudeMax.href = `data/ComplexAmplitude/${prefix1}_${minmaxMax}.txt`;
  downloadComplexAmplitudeMax.download = `${prefix2}_${minmaxMax}.txt`;
  downloadComplexAmplitudeMin.href = `data/ComplexAmplitude/${prefix1}_${minmaxMin}.txt`;
  downloadComplexAmplitudeMin.download = `${prefix2}_${minmaxMin}.txt`;
  
  downloadcidMax.href = `data/ci(d)/${prefix3}_${minmaxMax}.txt`;
  downloadcidMax.download = `${prefix3}_${minmaxMax}.txt`;
  downloadcidMin.href = `data/ci(d)/${prefix3}_${minmaxMin}.txt`;
  downloadcidMin.download = `${prefix3}_${minmaxMin}.txt`;

  // ComplexAmplitude images
  img3.src = `images/ComplexAmplitude/${prefix2}_minmax=max_improv={${improv}}.png`;
  img4.src = `images/ComplexAmplitude/${prefix2}_minmax=min_improv={${improv}}.png`;

  // Convergence plot images
  convImgMax.src = `images/ConvergencePlot/${convPrefix}_minmax=max_improv={${improv}}.png`;
  convImgMin.src = `images/ConvergencePlot/${convPrefix}_minmax=min_improv={${improv}}.png`;

  // Almond plot images
  almondGrid.innerHTML = "";
  almondCoords.forEach(([x, y]) => {
    const almondPrefix = `Almond_d=${d}_x=${x}_y=${y}_lmax=${lmax}_Nmax=${Nmax}`;
    const img = document.createElement("img");
    img.src = `images/Almond/${almondPrefix}_improv={${improv}}.png`;
    img.alt = `Almond (${x},${y})`;
    almondGrid.appendChild(img);
  });

  // CI(d) images
  updateCidImages();
}


[dSlider, LSlider, lmaxSlider, NmaxSlider, improvSelect].forEach(el =>
  el.addEventListener("input", updateImages)
);

// --- Unified config object with allowed values ---
const configByD = {
  3: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  3.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  4: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  4.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  5: {
    paramCI: { min: 0, max: 0, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  4.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  6: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  6.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  7: {
    paramCI: { min: 0, max: 0, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  7.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  8: {
    paramCI: { min: 0, max: 0, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  8.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  9: {
    paramCI: { min: 0, max: 0, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  9.5: {
    paramCI: { min: 0, max: 3, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  },
  10: {
    paramCI: { min: 0, max: 0, step: 1, allowed: [0] },
    paramL: { min: 0, max: 2, step: 2 },
    paramLmax: { min: 16, max: 16, step: 2 },
    paramNmax: { min: 11, max: 11, step: 1 },
  }
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
  
  document.querySelectorAll('[data-toggle-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle-target');
      const content = document.getElementById(targetId);
      if (content) {
        const isHidden = getComputedStyle(content).display === "none";
        content.style.display = isHidden ? "block" : "none";
      }
    });
  });
  
  
  
function triggerDownload(filename, label) {
  const link = document.createElement("a");
  link.href = filename;
  link.setAttribute("download", label);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("downloadAmplitudeMax").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`;
  triggerDownload(`data/Amplitude/${prefix}`, prefix);
});

document.getElementById("downloadAmplitudeMin").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`;
  triggerDownload(`data/Amplitude/${prefix}`, prefix);
});

document.getElementById("downloadComplexAmplitudeMax").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`;
  triggerDownload(`data/ComplexAmplitude/${prefix}`, prefix);
});

document.getElementById("downloadComplexAmplitudeMin").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`;
  triggerDownload(`data/ComplexAmplitude/${prefix}`, prefix);
});


document.getElementById("downloadcidMax").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`;
  triggerDownload(`data/ci(d)/${prefix}`, prefix);
});

document.getElementById("downloadcidMin").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`;
  triggerDownload(`data/ci(d)/${prefix}`, prefix);
});

document.getElementById("downloadMMax").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`;
  triggerDownload(`data/M/${prefix}`, prefix);
});

document.getElementById("downloadMMin").addEventListener("click", function (e) {
  e.preventDefault();
  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  const improv = improvSelect.value;
  const prefix = `M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`;
  triggerDownload(`data/M/${prefix}`, prefix);
});


