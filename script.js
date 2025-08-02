
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

function calculateDose() {
  const selectedDrug = document.getElementById('drugName').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // clear previous

  if (isNaN(weight) || weight <= 0) {
    resultDiv.textContent = "Please enter a valid weight.";
    return;
  }

  const matchingDrugs = medications.filter(d => d.name === selectedDrug);

  if (matchingDrugs.length === 0) {
    resultDiv.textContent = "No data available for this drug.";
    return;
  }

  const ul = document.createElement('ul');
  matchingDrugs.forEach(drug => {
    const dose = drug.MaxdosePerKg * weight;
    const li = document.createElement('li');
    li.textContent = `${drug.concentration}: ${dose} ${drug.concentrationUnit}`;
    ul.appendChild(li);
  });

  resultDiv.appendChild(document.createElement('hr'));
  resultDiv.appendChild(document.createTextNode(`Recommended doses for ${selectedDrug}:`));
  resultDiv.appendChild(ul);
}
