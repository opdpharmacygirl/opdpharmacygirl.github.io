document.getElementById('doseForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  if (!weight) return;

  const maxDose = 2000; // mg
  const usualLow = 20 * weight;
  const usualHigh = 50 * weight;
  const highLow = 80 * weight;
  const highHigh = 90 * weight;

  // Convert mg/day to ml/day (250 mg per 5 ml)
  const mgPerMl = 250 / 5;
  const usualMlLow = (usualLow / mgPerMl).toFixed(1);
  const usualMlHigh = (usualHigh / mgPerMl).toFixed(1);
  const highMlLow = (highLow / mgPerMl).toFixed(1);
  const highMlHigh = (highHigh / mgPerMl).toFixed(1);

  // Capsules 500 mg
  const capDose = Math.min(2, Math.floor(maxDose / 500));

  // Display results
  document.getElementById('usualMl').innerText = `${usualMlLow} - ${usualMlHigh} ml/day (Usual)`;
  document.getElementById('highMl').innerText = `${highMlLow} - ${highMlHigh} ml/day (High)`;
  document.getElementById('capsuleDose').innerText = `${capDose} cap/day`;

  document.getElementById('result').classList.remove('hidden');
});


let medications = [];

// Load and parse the CSV
Papa.parse('meds.csv', {
  download: true,
  header: true,
  complete: function(results) {
    medications = results.data;
    populateDropdown();
  }
});


function populateDropdown() {
  const select = document.getElementById('drugName');
  const uniqueNames = new Set();

  medications.forEach((med, index) => {
    const name = med.name?.trim();
    if (name && !uniqueNames.has(name)) {
      uniqueNames.add(name);

      const option = document.createElement('option');
      option.value = name; // use name instead of index
      option.text = name;
      select.appendChild(option);
    }
  });
}