
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
    const drugName = med.Name?.trim();
    if (drugName && !uniqueNames.has(drugName)) {
      uniqueNames.add(drugName);

      const option = document.createElement('option');
      option.value = drugName; // use name instead of index
      option.text = drugName;
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

  const matchingDrugs = medications.filter(d => d.Name === selectedDrug);

  if (matchingDrugs.length === 0) {
    resultDiv.textContent = "No data available for this drug.";
    return;
  }

  const ul = document.createElement('ul');
  matchingDrugs.forEach(drug => {
    const dose = drug.MaxdosePerKg * weight;
    const li = document.createElement('li');
    //concentrationUnit need more calculation
    li.textContent = `${drug.Concentration}: ${dose} ${drug.concentrationUnit}`;
    ul.appendChild(li);
  });

  resultDiv.appendChild(document.createElement('hr'));
  resultDiv.appendChild(document.createTextNode(`Recommended doses for ${selectedDrug}:`));
  resultDiv.appendChild(ul);
}
