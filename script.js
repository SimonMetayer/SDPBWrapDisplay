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

const convv2ImgMax = document.getElementById("convv2ImgMax");
const convv2ImgMin = document.getElementById("convv2ImgMin");

const cidImgMax = document.getElementById("cidImgMax");
const cidImgMin = document.getElementById("cidImgMin");


const allowedD = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

const configByD = {
  3    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  3.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  4    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 8, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1, allowed: [1,2,3,4,10,11,12,13,14,15,16,17,18,19,20] }, },
  4.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  5    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  5.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  6    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 8, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  6.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  7    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  7.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  8    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 8, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  8.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  9    : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  9.5  : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 20, step: 1 }, },
  10   : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 25, step: 1 }, },
  10.5 : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 25, step: 1 }, },
  11   : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 30, step: 1 }, },
  11.5 : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 25, step: 1 }, },
  12   : { paramCI: { min: 0, max: 3, step: 1, allowed: [0,2,3] }, paramL: { min: 0, max: 2, step: 2 }, paramLmax: { min: 16, max: 16, step: 2 }, paramNmax: { min: 10, max: 25, step: 1 }, }
};

document.querySelectorAll('.toggle-button').forEach(button => {
  const targetId = button.getAttribute('data-toggle-target');
  const content = document.getElementById(targetId);
  if (!content) return; // safety check

  // --- INITIAL STATE ---
  const start = button.getAttribute('data-start'); // "open" or "closed"
  content.style.display = start === "open" ? "block" : "none";

  // --- TOGGLE ON CLICK ---
  button.addEventListener('click', () => {
    const isHidden = getComputedStyle(content).display === "none";
    //content.style.display = isHidden ? "block" : "none";
    content.classList.toggle("collapsed");
  });
});


// ⭐ AUTO-MODE PATCH ------------------------------
const improvByDimension = {
  3: "TH, subTH, ftTH, SPC",
  3.5: "TH, SPC",
  4: "TH, SPC",
  4.5: "TH, subTH, SPC",
  5: "TH, subTH, ftTH, SPC",
  5.5: "TH, subTH, SPC",
  6: "TH, subTH, SPC",
  6.5: "TH, subTH, SPC",
  7: "TH, subTH, ftTH, SPC",
  7.5: "TH, subTH, SPC",
  8: "TH, subTH, SPC",
  8.5: "TH, subTH, SPC",
  9: "TH, subTH, ftTH, SPC",
  9.5: "TH, subTH, SPC",
  10: "TH, subTH, SPC",
  10.5: "TH, subTH, SPC",
  11: "TH, subTH, ftTH, SPC",
  11.5: "TH, subTH, SPC",
  12: "TH, subTH, SPC"
};

// Inject AUTO option if missing
if (!Array.from(improvSelect.options).some(o => o.value === "AUTO")) {
  const opt = document.createElement("option");
  opt.value = "AUTO";
  opt.textContent = "Automatic";
  improvSelect.prepend(opt);
}

// Return mapped improvement but KEEP select value = "AUTO"
function getEffectiveImprovement() {
  const d = parseFloat(dSlider.value);

  if (improvSelect.value === "AUTO") {
    if (improvByDimension[d] !== undefined)
      return improvByDimension[d];
    return "SPC"; // fallback
  }

  return improvSelect.value;
}


function updateImages() {
  
  document.getElementById("valD").textContent = dSlider.value;
  document.getElementById("valCI").textContent = ciSlider.value;
  document.getElementById("valL").textContent = LSlider.value;
  document.getElementById("valLmax").textContent = lmaxSlider.value;
  document.getElementById("valNmax").textContent = NmaxSlider.value;

  const d = dSlider.value;
  const ci = ciSlider.value;
  const L = LSlider.value;
  const lmax = lmaxSlider.value;
  const Nmax = NmaxSlider.value;
  
  // ⭐ AUTO-MODE PATCH
  const improv = getEffectiveImprovement();

  const minmaxMax = `minmax=max_improv={${improv}}`;
  const minmaxMin = `minmax=min_improv={${improv}}`;
  
  img1.src = `images/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.png`;
  img2.src = `images/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.png`;
  
  downloadAmplitudeMax.href = `data/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadAmplitudeMax.download = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadAmplitudeMin.href = `data/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  downloadAmplitudeMin.download = `Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  
  downloadMMax.href = `data/M/M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadMMax.download = `M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadMMin.href = `data/M/M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  downloadMMin.download = `M_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  
  img3.src = `images/ComplexAmplitude/ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  img4.src = `images/ComplexAmplitude/ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
  
  downloadComplexAmplitudeMax.href = `data/ComplexAmplitude/ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadComplexAmplitudeMax.download = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadComplexAmplitudeMin.href = `data/ComplexAmplitude/ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  downloadComplexAmplitudeMin.download = `ComplexAmplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
    
  convImgMax.src = `images/ConvergencePlot/ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  convImgMin.src = `images/ConvergencePlot/ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
  
  downloadConvergencePlotMax.href = `data/ConvergencePlot/ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadConvergencePlotMax.download = `ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadConvergencePlotMin.href = `data/ConvergencePlot/ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  downloadConvergencePlotMin.download = `ConvergencePlot_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
    
  almondImg1.src = `images/Almond/Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.png`;
  almondImg2.src = `images/Almond/Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.png`;
  almondImg3.src = `images/Almond/Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.png`;
  
  downloadAlmond02.href = `data/Almond/Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  downloadAlmond02.download = `$Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  downloadAlmond03.href = `data/Almond/Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  downloadAlmond03.download = `$Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  downloadAlmond23.href = `data/Almond/Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  downloadAlmond23.download = `$Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  
  if (improvSelect.value === "AUTO") {
      // Display special fixed CI images
      cidImgMax.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.png`;
      cidImgMin.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.png`;

      downloadcidMax.href = `data/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidMax.download = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidMin.href = `data/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidMin.download = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidfittedMax.href = `data/ci(d)fitted/ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidfittedMax.download = `ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidfittedMin.href = `data/ci(d)fitted/ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidfittedMin.download = `ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      
      cidv2ImgMax.src = `images/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.png`;
      cidv2ImgMin.src = `images/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.png`;

      downloadcidv2Max.href = `data/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidv2Max.download = `ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidv2Min.href = `data/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidv2Min.download = `ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidv2fittedMax.href = `data/ci(d)v2fitted/ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidv2fittedMax.download = `ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv=best.txt`;
      downloadcidv2fittedMin.href = `data/ci(d)v2fitted/ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      downloadcidv2fittedMin.download = `ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv=best.txt`;
      
      convv2ImgMax.src = `images/ConvergencePlotv2/ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
      convv2ImgMin.src = `images/ConvergencePlotv2/ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
      
      downloadConvergencePlotv2Max.href = `data/ConvergencePlotv2/ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadConvergencePlotv2Max.download = `ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadConvergencePlotv2Min.href = `data/ConvergencePlotv2/ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadConvergencePlotv2Min.download = `ConvergencePlotv2_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  } else {
      // Normal mode
      cidImgMax.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
      cidImgMin.src = `images/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;

      downloadcidMax.href = `data/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadcidMax.download = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;  
      downloadcidMin.href = `data/ci(d)/ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidMin.download = `ci(d)_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidfittedMax.href = `data/ci(d)fitted/ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadcidfittedMax.download = `ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;  
      downloadcidfittedMin.href = `data/ci(d)fitted/ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidfittedMin.download = `ci(d)fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;

      cidv2ImgMax.src = `images/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
      cidv2ImgMin.src = `images/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;

      downloadcidv2Max.href = `data/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadcidv2Max.download = `ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;  
      downloadcidv2Min.href = `data/ci(d)v2/ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidv2Min.download = `ci(d)v2_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidv2fittedMax.href = `data/ci(d)v2fitted/ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
      downloadcidv2fittedMax.download = `ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;  
      downloadcidv2fittedMin.href = `data/ci(d)v2fitted/ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      downloadcidv2fittedMin.download = `ci(d)v2fitted_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
      
  }


  if (improvSelect.value === "AUTO") {
      // Special fixed best-bound plots
      boundc0.src = `images/BoundTable/BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv=best.png`;
      boundc2.src = `images/BoundTable/BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv=best.png`;
      boundc3.src = `images/BoundTable/BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv=best.png`;

      downloadboundc0.href = `data/BoundTable/BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv=best.txt`;
      downloadboundc0.download = `BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv=best.txt`;
      downloadboundc2.href = `data/BoundTable/BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv=best.txt`;
      downloadboundc2.download = `BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv=best.txt`;
      downloadboundc3.href = `data/BoundTable/BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv=best.txt`;
      downloadboundc3.download = `BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv=best.txt`;
  }
  else {
      // normal mode
      boundc0.src = `images/BoundTable/BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv={${improv}}.png`;
      boundc2.src = `images/BoundTable/BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv={${improv}}.png`;
      boundc3.src = `images/BoundTable/BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv={${improv}}.png`;

      downloadboundc0.href = `data/BoundTable/BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
      downloadboundc0.download = `BoundTable_ci=0_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
      downloadboundc2.href = `data/BoundTable/BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
      downloadboundc2.download = `BoundTable_ci=2_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
      downloadboundc3.href = `data/BoundTable/BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
      downloadboundc3.download = `BoundTable_ci=3_lmax=16_Nmax=${Nmax}_improv={${improv}}.txt`;
  }
    
  img5.src = `images/ReggeTrajectories/ReggeTrajectories_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  img6.src = `images/ReggeTrajectories/ReggeTrajectories_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
 
  const almond02FilesImg = [
  `images/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`
  ];
  
  const almond03FilesImg = [
  `images/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.tpngxt`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`
  ];
  
  const almond23FilesImg = [
  `images/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=2_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`,
  `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=2_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`,
  ];
  
   const almond02Names = [
  "Max c0",
  "Min c0",
  "Max c2",
  "Min c2",
  "Max midpoint",
  "Min midpoint"
  ];
  
  const almond03Names = [
  "Max c0",
  "Min c0",
  "Max c3",
  "Min c3",
  "Max midpoint",
  "Min midpoint"
  ];
  
  const almond23Names = [
  "Max c2",
  "Min c2",
  "Max c3",
  "Min c3",
  "Max midpoint",
  "Min midpoint"
  ];

  const almond02FilesTxt = [
  `data/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`
  ];
  
  const almond03FilesTxt = [
  `data/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`
  ];
  
  const almond23FilesTxt = [
  `data/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=2_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/Amplitude/Amplitude_d=${d}_ci=3_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=2_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.txt`,
  `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=2_y=3_label=0_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.txt`,
  ];
  
  const slider02 = document.getElementById("paramAlmond02");
  const slider03 = document.getElementById("paramAlmond03");
  const slider23 = document.getElementById("paramAlmond23");

  slider02.oninput = function() {
    const index = parseInt(this.value);
    const selectedImg = almond02FilesImg[index];
    const selectedTxt = almond02FilesTxt[index];
    const selectedName = almond02Names[index];
    document.getElementById("valparamAlmond02").textContent = selectedName;
    document.getElementById("almond02Image").src = selectedImg;
    const dl = document.getElementById("downloadAlmond02Traveler");
    const dlM = document.getElementById("downloadAlmond02TravelerM");
    dl.href = selectedTxt;
    dlM.href = selectedTxt;
    dl.download = selectedTxt + ".txt"
    dlM.download = selectedTxt + ".txt"
  };
  
  slider03.oninput = function() {
    const index = parseInt(this.value);
    const selectedImg = almond03FilesImg[index];
    const selectedTxt = almond03FilesTxt[index];
    const selectedName = almond03Names[index];
    document.getElementById("valparamAlmond03").textContent = selectedName;
    document.getElementById("almond03Image").src = selectedImg;
    const dl = document.getElementById("downloadAlmond03Traveler");
    const dlM = document.getElementById("downloadAlmond03TravelerM");
    dl.href = selectedTxt;
    dlM.href = selectedTxt;
    dl.download = selectedTxt + ".txt"
    dlM.download = selectedTxt + ".txt"
  };
  
  slider23.oninput = function() {
    const index = parseInt(this.value);
    const selectedImg = almond23FilesImg[index];
    const selectedTxt = almond23FilesTxt[index];
    const selectedName = almond23Names[index];
    document.getElementById("valparamAlmond23").textContent = selectedName;
    document.getElementById("almond23Image").src = selectedImg;
    const dl = document.getElementById("downloadAlmond23Traveler");
    const dlM = document.getElementById("downloadAlmond23TravelerM");
    dl.href = selectedTxt;
    dlM.href = selectedTxt;
    dl.download = selectedTxt + ".txt"
    dlM.download = selectedTxt + ".txt"
  };

  slider02.oninput();
  slider03.oninput();
  slider23.oninput();
}


[dSlider, LSlider, lmaxSlider, NmaxSlider, improvSelect].forEach(el =>
  el.addEventListener("input", updateImages)
);


function snapToAllowed(val, allowed) {
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

  if ((sliderId === "paramCI" || sliderId === "paramNmax") && config.allowed) {
    newVal = snapToAllowed(newVal, config.allowed);
  }

  slider.value = newVal;
  valSpan.textContent = newVal;
}

document.getElementById("paramD").addEventListener("input", function () {
  let d = Number(this.value);
  d = snapToAllowed(d, allowedD);
  this.value = d;
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
  const snappedVal = snapToAllowed(Number(ciSlider.value), allowed);
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

updateImages();

fetch('explanation.tex')
  .then(res => res.text())
  .then(tex => {
    tex = tex.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
    tex = tex.replace(/\\section\*?\{([^}]+)\}/g, '<h2>$1</h2>');
    document.getElementById('latex-explanation').innerHTML = tex;
    if (window.MathJax?.typeset) MathJax.typeset();
  });



// Safely read the generated data from image_count.js
const data = window.imageInfo || {};

// Update the image count
const count = data.count ?? "N/A";
document.getElementById("image-count").textContent =
  `Total plots: ${count}/18876`;

// Format the last update time
const last = data.last_updated
  ? new Date(data.last_updated).toLocaleString()
  : "Unknown";

// Update the last update info in the footer
document.getElementById("last-update").textContent =
  `Last updated: ${last}`;
  
  


function triggerDownload(filename, label) {
  const link = document.createElement("a");
  link.href = filename;
  link.setAttribute("download", label);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


function stepToAllowed(current, step, allowed) {
  const idx = allowed.indexOf(current);
  if (idx === -1) {
    // fallback if current is not exactly in allowed
    return snapToAllowed(current + step, allowed);
  }
  let newIdx = idx + (step > 0 ? 1 : -1);
  newIdx = Math.max(0, Math.min(allowed.length - 1, newIdx));
  return allowed[newIdx];
}

document.querySelectorAll(".slider-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const sliderId = btn.getAttribute("data-target");
    const step = parseFloat(btn.getAttribute("data-step"));
    const slider = document.getElementById(sliderId);

    let newVal;

    // special lookup: does this slider have an "allowed" array?
    let allowed;
    if (sliderId === "paramD") {
      allowed = allowedD;
    } else {
      const d = +dSlider.value;
      const conf = configByD[d]?.[sliderId];
      if (conf?.allowed) allowed = conf.allowed;
    }

    if (allowed) {
      newVal = stepToAllowed(+slider.value, step, allowed);
    } else {
      // fall back to simple step increments
      const sliderStep = parseFloat(slider.step) || 1;
      newVal = +slider.value + step * sliderStep;
      newVal = Math.max(+slider.min, Math.min(+slider.max, newVal));
    }

    slider.value = newVal;

    // update label
    const valSpan = document.getElementById(`val${sliderId.slice(5)}`);
    if (valSpan) valSpan.textContent = newVal;

    // trigger update
    slider.dispatchEvent(new Event("input", { bubbles: true }));
  });
});


const autoPlayIntervals = {}; // store intervals per slider

function startAutoPlay(sliderId, btn, speed) {
  const slider = document.getElementById(sliderId);
  const valSpan = document.getElementById(`val${sliderId.slice(5)}`);

  // get allowed values (if any)
  let allowed = null;
  if (sliderId === "paramD") {
    allowed = allowedD;
  } else {
    const d = +dSlider.value;
    allowed = configByD[d]?.[sliderId]?.allowed || null;
  }

  let values;
  if (allowed && allowed.length > 0) {
    values = allowed;
  } else {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const step = parseFloat(slider.step) || 1;
    values = [];
    for (let v = min; v <= max; v += step) {
      values.push(+v.toFixed(6)); // avoid floating point drift
    }
  }

  let currentIndex = values.indexOf(Number(slider.value));
  if (currentIndex < 0) currentIndex = 0;
  let direction = 1;

  autoPlayIntervals[sliderId] = setInterval(() => {
    currentIndex += direction;

    if (currentIndex >= values.length) {
      currentIndex = values.length - 2;
      direction = -1;
    } else if (currentIndex < 0) {
      currentIndex = 1;
      direction = 1;
    }

    const newVal = values[currentIndex];
    slider.value = newVal;
    valSpan.textContent = newVal;
    slider.dispatchEvent(new Event("input"));
  }, speed);

  btn.textContent = "⏸";
}

function stopAutoPlay(sliderId, btn) {
  clearInterval(autoPlayIntervals[sliderId]);
  delete autoPlayIntervals[sliderId];
  btn.textContent = "▶";
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".autoPlayBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sliderId = btn.dataset.target;
      const speed = parseInt(btn.dataset.speed, 10) || 1000;

      if (autoPlayIntervals[sliderId]) {
        stopAutoPlay(sliderId, btn);
      } else {
        startAutoPlay(sliderId, btn, speed);
      }
    });
  });
});


// ===== CLOSE ALL SECTIONS BUTTON =====
document.getElementById("close-all").addEventListener("click", () => {
  document.querySelectorAll(".collapsible-content").forEach(section => {
    section.classList.add("collapsed");
  });
});

// ===== OPEN ALL SECTIONS BUTTON =====
document.getElementById("open-all").addEventListener("click", () => {
  document.querySelectorAll(".collapsible-content").forEach(section => {
    section.classList.remove("collapsed");
  });
});




