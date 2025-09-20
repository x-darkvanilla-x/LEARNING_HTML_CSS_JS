/*
  Author: Dipesh Adelkar
  Linkedin: Dipesh Adelkar
  Instagram: @x_darkvanilla_x 
  Github: @x-darkvanilla-x
*/

function insert(num) {
  document.form1.textview.value += num;
}

function equal() {
  const exp = document.form1.textview.value;
  if (exp) {
    try {
      document.form1.textview.value = eval(exp);
    } catch {
      document.form1.textview.value = "Error";
    }
  }
}

function backspace() {
  const exp = document.form1.textview.value;
  document.form1.textview.value = exp.substring(0, exp.length - 1);
}

// Dark mode toggle
const darkModeToggle = document.querySelector("#dark-mode-toggle input");
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
