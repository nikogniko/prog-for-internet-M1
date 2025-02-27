async function loadXML(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, 'text/xml');
}

function executeXPath(xml, query) {
  return document.evaluate(query, xml, null, XPathResult.ANY_TYPE, null);
}

function printResults(xml, query, label) {
  let result = executeXPath(xml, query);
  let node;
  console.log(`\n${label}:`);
  while ((node = result.iterateNext())) {
    console.log(node.textContent.trim());
  }
}

async function runXPathQueries() {
  const xml = await loadXML('index.xml');

  printResults(xml, '//person', 'Всі люди у документі');
  printResults(xml, '//fullname', 'Імена всіх людей');
  printResults(xml, '//person[age > 30]/fullname', 'Люди старші за 30 років');
  printResults(xml, "//person[gender='Чоловік']/fullname", 'Чоловіки у документі');
  printResults(xml, "//person[gender='Жінка' and weight < 60]/fullname", 'Жінки вагою менше 60 кг');
  printResults(xml, "//person[blood_type='O+']/fullname", 'Люди з групою крові O+');
  printResults(xml, '//height', 'Всі значення росту (в см) в документі');
  printResults(xml, '//person[BMI > 25]/fullname', 'Люди з BMI більше 25');
  printResults(xml, '//person[1]', 'Перша людина у списку');
  printResults(xml, '//person[last()]', 'Остання людина у списку');
  printResults(xml, '//person[height > 175]/fullname', 'Люди з ростом більше 175 см');
  printResults(xml, '//text()', 'Весь текст у документі');
}

runXPathQueries();
