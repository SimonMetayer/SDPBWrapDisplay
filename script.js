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

const dimensionDefaults = {
  paramCI: { min: 0, max: 3, step: 1, allowed: [0, 2] },
  paramL: { min: 0, max: 10, step: 2 },
  paramLmax: { min: 16, max: 16, step: 2 },
  paramNmax: { min: 10, max: 30, step: 1 }
};

const configByD = Object.fromEntries(
  allowedD.map(dimension => [dimension, dimensionDefaults])
);

function setSectionOpen(button, open) {
  const content = document.getElementById(button.dataset.toggleTarget);
  if (!content) return;

  content.classList.toggle("collapsed", !open);
  button.setAttribute("aria-expanded", String(open));
}

document.querySelectorAll(".toggle-button").forEach(button => {
  const targetId = button.dataset.toggleTarget;
  const content = document.getElementById(targetId);
  if (!content) return;

  button.setAttribute("role", "button");
  button.setAttribute("tabindex", "0");
  button.setAttribute("aria-controls", targetId);
  setSectionOpen(button, button.dataset.start === "open");

  button.addEventListener("click", () => {
    setSectionOpen(button, content.classList.contains("collapsed"));
  });
  button.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setSectionOpen(button, content.classList.contains("collapsed"));
  });
});


// ⭐ AUTO-MODE PATCH ------------------------------
const improvByDimension = {
  3: "TH, subTH, ftTH, SPC",
  3.5: "TH, SPC",
  4: "TH, SPC",
  4.5: "TH, subTH, SPC",
  5: "TH, subTH, ftTH, SPC",
  5.5: "TH, subTH, subTHcorr, subTHcorr2, SPC",
  6: "TH, subTH, SPC",
  6.5: "TH, subTH, SPC",
  7: "TH, subTH, ftTH, SPC",
  7.5: "TH, subTH, subTHcorr, subTHcorr2, SPC",
  8: "TH, subTH, SPC",
  8.5: "TH, subTH, SPC",
  9: "TH, subTH, ftTH, SPC",
  9.5: "TH, subTH, subTHcorr, subTHcorr2, SPC",
  10: "TH, subTH, SPC",
  10.5: "TH, subTH, SPC",
  11: "TH, subTH, ftTH, SPC",
  11.5: "TH, subTH, subTHcorr, SPC",
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


function attachPlotFallbacks() {
  document.querySelectorAll(".image-container img, .image-container-almond img").forEach(image => {
    image.addEventListener("error", () => {
      image.hidden = true;
      if (image.id === "almondImg1") {
        document.getElementById("almondPointOverlay").style.visibility = "hidden";
      }
    });
    image.addEventListener("load", () => {
      image.hidden = false;
      if (image.id === "almondImg1" && almondTravelerPoints.length) {
        updateAlmondPointMarker(Number(document.getElementById("paramAlmond02").value));
      }
    });
  });
}

attachPlotFallbacks();

let almondTravelerRequestId = 0;
let almondTravelerChoices = [];
let almondTravelerPoints = [];
let thresholdRequestId = 0;
let boundTableRequestId = 0;

function thresholdPowerTex(power) {
  const quarters = Math.round(power * 4);
  let numerator = quarters;
  let denominator = 4;
  if (numerator % 2 === 0) {
    numerator /= 2;
    denominator /= 2;
  }
  if (numerator % 2 === 0 && denominator === 2) {
    numerator /= 2;
    denominator = 1;
  }
  const sign = numerator < 0 ? "-" : "";
  const magnitude = Math.abs(numerator);
  if (denominator === 1) return `${sign}${magnitude}`;
  return `${sign}\\frac{${magnitude}}{${denominator}}`;
}

function parseMathematicaNumber(raw) {
  const normalized = raw.trim().replace(/`[0-9.]*/g, "").replace(/\*\^/g, "e");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function parseThresholdCoefficients(sdpbText) {
  const pattern = /Rule\[\s*\\\[Alpha\]0x0x([01])x(\d+),\s*([^\]]+)\]/g;
  const coefficients = new Map();
  for (const match of sdpbText.matchAll(pattern)) {
    const group = Number(match[1]); // 0 = TH, 1 = subTH
    const index = Number(match[2]);
    const value = parseMathematicaNumber(match[3]);
    if (value !== null) coefficients.set(`${group}:${index}`, { group, index, value });
  }
  return [...coefficients.values()].sort((a, b) => a.group - b.group || a.index - b.index);
}

function formatThresholdCoefficient(value) {
  const formatted = value.toPrecision(5).replace(/(?:\.0+|(\.\d*?)0+)(?=e|$)/, "$1");
  const scientific = formatted.match(/^(-?\d+(?:\.\d+)?)[eE]([+-]?\d+)$/);
  return scientific
    ? `${scientific[1]}\\times 10^{${Number(scientific[2])}}`
    : formatted;
}

function thresholdTermPower(d, group, index) {
  const alpha = (d - 3) / 2;
  if (Number.isInteger(d) && d % 2 === 1) {
    const logBlockSize = Math.floor(alpha) + 1;
    const localIndex = group === 0 ? index : index - 1;
    return {
      power: Math.max(0, alpha - (localIndex % logBlockSize)),
      logPower: group === 0 ? 1 : 2
    };
  }

  const step = Number.isInteger(d) ? 0.5 : 0.25;
  const termIndex = group === 0 ? index : index;
  return { power: Math.max(0, alpha - termIndex * step), logPower: 0 };
}

function thresholdDelta(d, alpha) {
  if (Number.isInteger(d) && d % 2 === 1) {
    return { factor: Math.round(Math.cos(Math.PI * alpha)), logPower: 1 };
  }
  return { factor: Math.sin(Math.PI * alpha), logPower: 0 };
}

function thresholdTermTex(coefficient, d, deltaFactor) {
  const { group, index, value } = coefficient;
  const { power, logPower } = thresholdTermPower(d, group, index);
  const effectiveValue = value * deltaFactor;
  const coefficientLabel = `\\alpha_{0,0,${group},${index}}`;
  const sigma = power > 0 ? `\\sigma_s^{-${thresholdPowerTex(power)}}` : "";
  const log = logPower > 0 ? `\\log_s^{-${logPower}}` : "";
  return `\\underset{${coefficientLabel}}{${formatThresholdCoefficient(effectiveValue)}}${sigma}${log}`;
}

function thresholdFormula(coefficients, d) {
  const alpha = (d - 3) / 2;
  const { factor: deltaFactor } = thresholdDelta(d, alpha);
  const terms = coefficients.map(coefficient => thresholdTermTex(coefficient, d, deltaFactor));
  const crossed = [...terms, "(s\\to t)", "(s\\to u)"].join("+");
  return `\\[A_{\\rm th}(s,t)=n_d\\left[${crossed}\\right],\\qquad \\sigma_x=\\frac{4-x}{4}\\]`;
}

function splitMathematicaFields(source) {
  const fields = [];
  let depth = 0;
  let quoted = false;
  let start = 0;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (character === '"' && source[index - 1] !== "\\") quoted = !quoted;
    if (quoted) continue;
    if ("[{(".includes(character)) depth += 1;
    if ("]})".includes(character)) depth -= 1;
    if (character === "," && depth === 0) {
      fields.push(source.slice(start, index).trim());
      start = index + 1;
    }
  }
  fields.push(source.slice(start).trim());
  return fields;
}

function parseBoundCell(source) {
  const around = source.match(/^Around\[(.*)\]$/);
  if (around) {
    const [centerRaw, errorRaw] = splitMathematicaFields(around[1]);
    const center = parseMathematicaNumber(centerRaw);
    const error = parseMathematicaNumber(errorRaw);
    return center === null ? null : { center, error: error === null ? null : Math.abs(error) };
  }

  const value = parseMathematicaNumber(source.replace(/^"|"$/g, ""));
  return value === null ? null : { center: value, error: null };
}

function parseExtrapolationBounds(source) {
  const bounds = new Map();
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) continue;
    const fields = splitMathematicaFields(trimmed.slice(1, -1));
    if (fields.length < 2) continue;
    const dimension = parseMathematicaNumber(fields[0]);
    const bound = parseBoundCell(fields[1]);
    if (dimension !== null && bound) bounds.set(dimension, bound);
  }
  return bounds;
}

function formatBoundNumber(value, significantDigits = 3) {
  if (value === 0) return "0";
  const formatted = value.toPrecision(significantDigits).replace(/(?:\.0+|(\.\d*?)0+)(?=e|$)/, "$1");
  const scientific = formatted.match(/^(-?\d+(?:\.\d+)?)[eE]([+-]?\d+)$/);
  return scientific
    ? `${scientific[1]}\\times 10^{${Number(scientific[2])}}`
    : formatted;
}

function boundValueTex(bound) {
  if (bound.error === null || bound.error === 0) return formatBoundNumber(bound.center, 4);
  return `${formatBoundNumber(bound.center)}\\,\\pm\\,${formatBoundNumber(bound.error)}`;
}

function bestBoundTableTex(minBounds, maxBounds, coefficient) {
  const body = allowedD.map(dimension => {
    const min = minBounds.has(dimension) ? boundValueTex(minBounds.get(dimension)) : "\\times";
    const max = maxBounds.has(dimension) ? boundValueTex(maxBounds.get(dimension)) : "\\times";
    return `${formatBoundNumber(dimension, 3)}&${min}&${max}\\\\`;
  }).join("");
  return `\\[\\begin{array}{c|r|r}d&\\mathrm{Min}\;c_{${coefficient}}(d)&\\mathrm{Max}\;c_{${coefficient}}(d)\\\\\\hline${body}\\end{array}\\]`;
}

async function updateBestBoundTables(Nmax) {
  const requestId = ++boundTableRequestId;
  const targets = [
    { ci: 0, element: document.getElementById("boundc0Table") },
    { ci: 2, element: document.getElementById("boundc2Table") }
  ];

  if (location.protocol === "file:") {
    targets.forEach(({ element }) => {
      window.MathJax?.typesetClear?.([element]);
      element.textContent = "Run ./serve-local.sh in the repository folder, then open http://127.0.0.1:8000/ to load local data.";
    });
    return;
  }

  targets.forEach(({ element, ci }) => {
    window.MathJax?.typesetClear?.([element]);
    element.textContent = `Loading c${ci} bounds…`;
  });

  const loadBounds = async url => {
    try {
      const response = await fetch(url);
      return response.ok ? parseExtrapolationBounds(await response.text()) : new Map();
    } catch {
      return new Map();
    }
  };

  await Promise.all(targets.map(async ({ ci, element }) => {
    const root = `data/ci(d)v2fitted/ci(d)v2fitted_ci=${ci}_lmax=16_Nmax=${Nmax}`;
    const [minBounds, maxBounds] = await Promise.all([
      loadBounds(`${root}_minmax=min_improv=best.txt`),
      loadBounds(`${root}_minmax=max_improv=best.txt`)
    ]);
    if (requestId !== boundTableRequestId) return;
    element.innerHTML = bestBoundTableTex(minBounds, maxBounds, ci);
    if (window.MathJax?.typesetPromise) await window.MathJax.typesetPromise([element]);
  }));
}

async function updateThreshold(d, ci, lmax, Nmax, improv) {
  const requestId = ++thresholdRequestId;
  const maxTarget = document.getElementById("thresholdMaxFormula");
  const minTarget = document.getElementById("thresholdMinFormula");
  const hasThresholdImprovement = /\bTH(?:fixed)?\b/.test(improv);

  if (location.protocol === "file:") {
    [maxTarget, minTarget].forEach(target => {
      window.MathJax?.typesetClear?.([target]);
      target.textContent = "Local data is blocked when index.html is opened directly. Run ./serve-local.sh in this folder, then open http://127.0.0.1:8000/.";
    });
    return;
  }

  if (!hasThresholdImprovement) {
    [maxTarget, minTarget].forEach(target => {
      window.MathJax?.typesetClear?.([target]);
      target.textContent = "No threshold term is included in this improvement.";
    });
    return;
  }

  [maxTarget, minTarget].forEach(target => {
    window.MathJax?.typesetClear?.([target]);
    target.textContent = "Loading threshold terms…";
  });

  const buildUrls = minmax => ({
    amplitude: `data/M/M_d=${d}_ci=${ci}_L=${LSlider.value}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.txt`,
    solution: `data/SDPB/SDPB_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.txt`
  });

  for (const [minmax, target] of [["max", maxTarget], ["min", minTarget]]) {
    try {
      const urls = buildUrls(minmax);
      const [amplitudeResponse, solutionResponse] = await Promise.all([
        fetch(urls.amplitude),
        fetch(urls.solution)
      ]);
      if (!amplitudeResponse.ok || !solutionResponse.ok) {
        throw new Error("No saved amplitude or optimization result is available for this selection.");
      }
      const [amplitudeText, solutionText] = await Promise.all([
        amplitudeResponse.text(),
        solutionResponse.text()
      ]);
      if (requestId !== thresholdRequestId) return;
      if (!amplitudeText.trim()) throw new Error("The saved amplitude is empty.");
      const coefficients = parseThresholdCoefficients(solutionText);
      if (!coefficients.length) throw new Error("The optimization output contains no threshold coefficients.");
      target.innerHTML = thresholdFormula(coefficients, Number(d));
      if (window.MathJax?.typesetPromise) await window.MathJax.typesetPromise([target]);
    } catch (error) {
      if (requestId !== thresholdRequestId) return;
      target.textContent = error.message;
    }
  }
}
function parseAlmondPoint(line) {
  const values = line.trim().replace(/[{}]/g, '').split(',');
  if (values.length < 2) return null;

  const point = values.slice(0, 2).map(value => Number(value.trim().replaceAll('*^', 'e')));
  return point.every(Number.isFinite) ? point : null;
}

function sameAlmondPoint(a, b) {
  return a && b && a.every((value, index) =>
    Math.abs(value - b[index]) <= 1e-12 * Math.max(1, Math.abs(value), Math.abs(b[index]))
  );
}

function orderAlmondPoints(points) {
  if (points.length < 2) return points;

  const center = points.reduce(([sumX, sumY], [x, y]) => [sumX + x, sumY + y], [0, 0])
    .map(value => value / points.length);
  const ordered = [...points].sort((a, b) =>
    Math.atan2(a[1] - center[1], a[0] - center[0]) -
    Math.atan2(b[1] - center[1], b[0] - center[0])
  );

  // Start at the c2 minimum, then follow the boundary counterclockwise. The
  // input files can start at any vertex and may traverse the almond either way.
  let start = 0;
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i][1] < ordered[start][1] ||
        (ordered[i][1] === ordered[start][1] && ordered[i][0] < ordered[start][0])) {
      start = i;
    }
  }
  return ordered.slice(start).concat(ordered.slice(0, start));
}

function makeAlmondTravelerChoices(d, L, lmax, Nmax, improv, pointCount) {
  const extraPairCount = Math.max(0, Math.ceil((pointCount - 4) / 2));
  const amplitudeChoice = (ci, minmax) => ({
    name: `c${ci} ${minmax}`,
    image: `images/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.png`,
    data: `data/Amplitude/Amplitude_d=${d}_ci=${ci}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.txt`
  });
  const almondChoice = (label, minmax) => ({
    name: `label ${label} ${minmax}`,
    image: `images/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=${label}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.png`,
    data: `data/AlmondAmplitude/AlmondAmplitude_d=${d}_x=0_y=2_label=${label}_L=${L}_lmax=${lmax}_Nmax=${Nmax}_minmax=${minmax}_improv={${improv}}.txt`
  });

  const labelsMin = Array.from({ length: extraPairCount }, (_, i) => almondChoice(i, 'min'));
  const labelsMax = Array.from({ length: extraPairCount }, (_, i) =>
    almondChoice(extraPairCount - i - 1, 'max')
  );
  const boundaryChoices = [
    ...labelsMin,
    amplitudeChoice(2, 'min'),
    amplitudeChoice(0, 'max'),
    ...labelsMax,
    amplitudeChoice(2, 'max'),
    amplitudeChoice(0, 'min')
  ];

  const choices = boundaryChoices.slice(0, pointCount);
  const c2Minimum = choices.findIndex(choice => choice.name === 'c2 min');
  if (c2Minimum > 0) return choices.slice(c2Minimum).concat(choices.slice(0, c2Minimum));
  return choices;
}

function updateAlmondPointMarker(index) {
  const overlay = document.getElementById("almondPointOverlay");
  const marker = document.getElementById("almondPointMarker");
  const point = almondTravelerPoints[index];
  const almondImage = document.getElementById("almondImg1");

  if (!point || !almondImage.naturalWidth) {
    overlay.style.visibility = "hidden";
    return;
  }

  const [x, y] = point;
  // Almond plots use fixed axes: c0 in [-10, 10] and c2 in [-0.5, 1.5].
  const xPixel = 54 + ((x + 10) / 20) * (526 - 54);
  const yPixel = 49 + ((1.5 - y) / 2) * (427 - 49);
  marker.setAttribute("cx", xPixel.toFixed(2));
  marker.setAttribute("cy", yPixel.toFixed(2));
  overlay.style.visibility = "visible";
}

function renderAlmondTraveler() {
  const slider = document.getElementById('paramAlmond02');
  const image = document.getElementById('almond02Image');
  const label = document.getElementById('valparamAlmond02');
  const download = document.getElementById('downloadAlmond02Traveler');
  const downloadM = document.getElementById('downloadAlmond02TravelerM');
  const selected = almondTravelerChoices[Number(slider.value)];

  if (!selected || slider.disabled) return;

  const position = Number(slider.value) + 1;
  label.textContent = `Point ${position} / ${almondTravelerChoices.length} · ${selected.name}`;
  updateAlmondPointMarker(Number(slider.value));
  image.src = selected.image;
  image.alt = `Amplitude at almond point ${position}: ${selected.name}`;
  for (const link of [download, downloadM]) {
    link.href = selected.data;
    link.download = selected.data.split('/').pop();
  }
}

document.getElementById('paramAlmond02').addEventListener('input', renderAlmondTraveler);

async function updateAlmondTraveler(dataUrl, d, L, lmax, Nmax, improv) {
  const requestId = ++almondTravelerRequestId;
  const slider = document.getElementById('paramAlmond02');
  const label = document.getElementById('valparamAlmond02');
  const image = document.getElementById('almond02Image');
  slider.disabled = true;
  almondTravelerPoints = [];
  document.getElementById('almondPointOverlay').style.visibility = 'hidden';
  label.textContent = 'Loading almond points…';

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`Almond data request failed: ${response.status}`);
    const rows = (await response.text()).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const rawPoints = rows.map(parseAlmondPoint).filter(Boolean);
    if (rawPoints.length > 1 && sameAlmondPoint(rawPoints[0], rawPoints[rawPoints.length - 1])) rawPoints.pop();
    if (!rawPoints.length) throw new Error('Almond data contains no points');
    if (requestId !== almondTravelerRequestId) return;

    almondTravelerPoints = orderAlmondPoints(rawPoints);
    almondTravelerChoices = makeAlmondTravelerChoices(d, L, lmax, Nmax, improv, almondTravelerPoints.length);
    slider.min = '0';
    slider.max = String(almondTravelerChoices.length - 1);
    slider.value = String(Math.min(Number(slider.value) || 0, almondTravelerChoices.length - 1));
    slider.disabled = false;
    renderAlmondTraveler();
  } catch (error) {
    if (requestId !== almondTravelerRequestId) return;
    almondTravelerChoices = [];
    almondTravelerPoints = [];
    document.getElementById('almondPointOverlay').style.visibility = 'hidden';
    slider.min = '0';
    slider.max = '0';
    slider.value = '0';
    label.textContent = 'No almond data available';
    slider.disabled = true;
    image.removeAttribute('src');
  }
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
  
  downloadSDPBMax.href = `data/SDPB/SDPB_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadSDPBMax.download = `SDPB_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMax}.txt`;
  downloadSDPBMin.href = `data/SDPB/SDPB_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  downloadSDPBMin.download = `SDPB_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_${minmaxMin}.txt`;
  
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
  //almondImg2.src = `images/Almond/Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.png`;
  //almondImg3.src = `images/Almond/Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.png`;
  
  downloadAlmond02.href = `data/Almond/Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  downloadAlmond02.download = `$Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  //downloadAlmond03.href = `data/Almond/Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  //downloadAlmond03.download = `$Almond_d=${d}_x=0_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  //downloadAlmond23.href = `data/Almond/Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  //downloadAlmond23.download = `$Almond_d=${d}_x=2_y=3_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}_${minmaxMax}.txt`;
  
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


  updateBestBoundTables(Nmax);
    
  img5.src = `images/ReggeTrajectories/ReggeTrajectories_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=max_improv={${improv}}.png`;
  img6.src = `images/ReggeTrajectories/ReggeTrajectories_d=${d}_ci=${ci}_lmax=${lmax}_Nmax=${Nmax}_minmax=min_improv={${improv}}.png`;
 
  const almondDataUrl = `data/Almond/Almond_d=${d}_x=0_y=2_lmax=${lmax}_Nmax=${Nmax}_improv={${improv}}.txt`;
  updateAlmondTraveler(almondDataUrl, d, L, lmax, Nmax, improv);
  updateThreshold(d, ci, lmax, Nmax, improv);
  
  //slider03.oninput = function() {
  //  const index = parseInt(this.value);
  //  const selectedImg = almond03FilesImg[index];
  //  const selectedTxt = almond03FilesTxt[index];
  //  const selectedName = almond03Names[index];
  //  document.getElementById("valparamAlmond03").textContent = selectedName;
  //  document.getElementById("almond03Image").src = selectedImg;
  //  const dl = document.getElementById("downloadAlmond03Traveler");
  //  const dlM = document.getElementById("downloadAlmond03TravelerM");
  //  dl.href = selectedTxt;
  //  dlM.href = selectedTxt;
  //  dl.download = selectedTxt + ".txt"
  //  dlM.download = selectedTxt + ".txt"
  //};
  
  //slider23.oninput = function() {
  //  const index = parseInt(this.value);
  //  const selectedImg = almond23FilesImg[index];
  //  const selectedTxt = almond23FilesTxt[index];
  //  const selectedName = almond23Names[index];
  //  document.getElementById("valparamAlmond23").textContent = selectedName;
  //  document.getElementById("almond23Image").src = selectedImg;
  //  const dl = document.getElementById("downloadAlmond23Traveler");
  //  const dlM = document.getElementById("downloadAlmond23TravelerM");
  //  dl.href = selectedTxt;
  //  dlM.href = selectedTxt;
  //  dl.download = selectedTxt + ".txt"
  //  dlM.download = selectedTxt + ".txt"
  //};

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



// Read the generated plot index without letting stale metadata break the page.
const imageInfo = window.imageInfo ?? {};
const plotCount = Number(imageInfo.count);
document.getElementById("image-count").textContent = Number.isSafeInteger(plotCount)
  ? `${plotCount.toLocaleString()} plots in the gallery`
  : "Plot count unavailable";

const generatedAt = Date.parse(imageInfo.last_updated ?? "");
const formattedDate = Number.isNaN(generatedAt)
  ? null
  : new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC"
    }).format(generatedAt);
document.getElementById("last-update").textContent = formattedDate
  ? `Index generated ${formattedDate} UTC`
  : "Plot index timestamp unavailable";
  
  


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


document.getElementById("close-all").addEventListener("click", () => {
  document.querySelectorAll(".toggle-button").forEach(button => setSectionOpen(button, false));
});

document.getElementById("open-all").addEventListener("click", () => {
  document.querySelectorAll(".toggle-button").forEach(button => setSectionOpen(button, true));
});




