function getFormData() {
  const form = document.getElementById('fitnessForm');
  const formData = new FormData(form);

  const exercises = [...form.querySelectorAll('input[name="exercise[]"]:checked')].map(
    el => el.value
  );

  const data = {
    gender: formData.get('gender'),
    age: formData.get('age'),
    pushups: formData.get('pushups'),
    exercises,
    duration: formData.get('duration'),
    sport: formData.get('sport'),
  };

  localStorage.setItem('fitnessData', JSON.stringify(data));

  return data;
}

function validateRequiredFields(data) {
  if (!data.gender || !data.age || !data.pushups || !data.sport) {
    alert('Будь ласка, заповніть усі обов’язкові поля (стать, вік, віджимання, вид спорту).');
    return false;
  }
  return true;
}

function saveAsJSON() {
  const data = getFormData();
  if (!validateRequiredFields(data)) return;

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'form_data.json';
  link.click();
}

function saveAsXML() {
  const data = getFormData();
  if (!validateRequiredFields(data)) return;

  const xml = `
<user>
  <gender>${data.gender}</gender>
  <age>${data.age}</age>
  <pushups>${data.pushups}</pushups>
  <exercise>${data.exercises.map(e => `<item>${e}</item>`).join('')}</exercise>
  <duration>${data.duration}</duration>
  <sport>${data.sport}</sport>
</user>`.trim();

  const blob = new Blob([xml], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'form_data.xml';
  link.click();
}

function getLabelTextByValue(name, value) {
  const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) {
    const label = input.closest('label');
    return label ? label.textContent.trim() : value;
  }
  return value;
}

function getOptionTextByValue(selectId, value) {
  const option = document.querySelector(`#${selectId} option[value="${value}"]`);
  return option ? option.textContent.trim() : value;
}

function loadData() {
  if (!validateRequiredFields(getFormData())) return;
  const storedData = localStorage.getItem('fitnessData');

  const data = JSON.parse(storedData);
  const outputDiv = document.getElementById('output');

  const genderText = getLabelTextByValue('gender', data.gender);
  const pushupsText = getLabelTextByValue('pushups', data.pushups);
  const durationText = getOptionTextByValue('duration', data.duration);
  const sportText = getOptionTextByValue('sports', data.sport) || data.sport;

  const exercisesText = data.exercises?.length
    ? data.exercises.map(val => getLabelTextByValue('exercise[]', val)).join(', ')
    : 'Нічого не вибрано';

  outputDiv.innerHTML = `
    <h2 class="output-header">Збережені дані</h2>
    <p><span>Стать:</span> ${genderText}</p>
    <p><span>Вік:</span> ${data.age}</p>
    <p><span>Віджимання:</span> ${pushupsText}</p>
    <p><span>Регулярні вправи:</span> ${exercisesText}</p>
    <p><span>Тривалість тренування:</span> ${durationText}</p>
    <p><span>Основний вид спорту:</span> ${sportText}</p>
  `;
}

function clearData() {
  if (confirm('Очистити збережені дані?')) {
    localStorage.removeItem('fitnessData');

    // Очищення полів форми
    const form = document.getElementById('fitnessForm');
    form.reset();

    // Очищення виводу
    document.getElementById('output').innerHTML = '';
  }
}
