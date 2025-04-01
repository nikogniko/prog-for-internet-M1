let maxValue = 0;
let operand1 = 0;
let operand2 = 0;
let inputValue = '';
let sign = '+'; // поточна арифметична операція

// Встановлення операції: +, - або *
function setSign(x) {
  if (x === '+' || x === '-' || x === '*') {
    sign = x;
  }
  return true;
}

// Генерація випадкового цілого числа від 0 до (max - 1)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Генеруємо перший операнд
function generateOperand1() {
  operand1 = getRandomInt(maxValue);
  return operand1;
}

// Генеруємо другий операнд залежно від обраної операції
function generateOperand2() {
  switch (sign) {
    case '+':
      // Щоб сума не перевищувала maxValue
      operand2 = getRandomInt(maxValue - operand1);
      break;
    case '-':
      // Щоб результат був невід'ємним
      operand2 = operand1 > 0 ? getRandomInt(operand1) : 0;
      break;
    case '*':
      // Якщо operand1 рівний 0, то результат завжди 0, тому генеруємо operand2 в діапазоні 0-maxValue
      if (operand1 === 0) {
        operand2 = getRandomInt(maxValue);
        break;
      }
      // Обмежуємо operand2 так, щоб добуток не перевищував maxValue
      const maxOperand2 = Math.floor(maxValue / operand1);
      operand2 = maxOperand2 > 0 ? getRandomInt(maxOperand2 + 1) : 0;
      break;

    default:
      operand2 = 0;
  }

  return operand2;
}

// Оновлення відображення операндів і скидання введеного числа
function updateDisplay() {
  document.forms['test']['op1'].value = operand1;
  document.forms['test']['s_sign'].value = sign;
  document.forms['test']['op2'].value = operand2;
  document.forms['test']['result'].value = inputValue;
  document.forms['test']['r0'].value = '???';
}

// Генерація нового завдання
function main_calc() {
  generateOperand1();
  generateOperand2();
  inputValue = '';
  updateDisplay();
}

// Обробка вводу цифр та перевірка відповіді
function input_sign(x) {
  // Якщо натиснуто кнопку "OK" (позначена як "10")
  if (x === '10') {
    const userResult = parseInt(inputValue, 10);
    let correctResult;
    switch (sign) {
      case '+':
        correctResult = operand1 + operand2;
        break;
      case '-':
        correctResult = operand1 - operand2;
        break;
      case '*':
        correctResult = operand1 * operand2;
        break;
      default:
        correctResult = NaN;
    }

    if (userResult === correctResult) {
      document.forms['test']['r0'].value = 'Вірно!';
      return;
    }

    document.forms['test']['r0'].value = 'Спробуй ще!';
    inputValue = '';
    document.forms['test']['result'].value = '';

    return;
  }
  // Додаємо цифру до поточного вводу
  inputValue += x;
  document.forms['test']['result'].value = inputValue;
}
