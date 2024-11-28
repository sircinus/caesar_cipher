// Caesar cipher function to encrypt or decrypt based on the action
function caesarCipher(text, shift, action) {
  let result = "";
  // Ensure the shift is within 0-25 range
  shift = shift % 26;

  if (action === "decrypt") {
    shift = 26 - shift; // For decryption, reverse the shift
  }

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      // Check if it's a letter
      let charCode = text.charCodeAt(i);
      let offset = charCode >= 65 && charCode <= 90 ? 65 : 97; // Determine if uppercase or lowercase

      // Apply the shift and wrap the letter around
      char = String.fromCharCode(((charCode - offset + shift) % 26) + offset);
    }
    result += char; // Append the processed character to the result
  }
  return result;
}

function copyToClipboard() {
  const resultText = document.getElementById("result").textContent;

  if (resultText) {
    // Create a temporary textarea element to copy the text
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = resultText;
    document.body.appendChild(tempTextArea);

    // Select and copy the text
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea element
    document.body.removeChild(tempTextArea);

    // Optional: Show an alert or feedback
    alert("Cipher text copied to clipboard!");
  } else {
    alert("Nothing to copy!");
  }
}

// Event listener for the copy icon click
document.getElementById("copy-icon").addEventListener("click", copyToClipboard);

// Event listener for the form submission
document
  .getElementById("cipher-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get the values from the form
    let text = document.getElementById("text").value;
    let shift = parseInt(document.getElementById("shift").value);
    let action = document.getElementById("action").value;

    // Validate input
    if (text === "" || isNaN(shift)) {
      alert("Please provide both text and shift value!");
      return;
    }

    // Perform the cipher action (encrypt or decrypt)
    let result = caesarCipher(text, shift, action);

    // Display the result
    document.getElementById("result").textContent = result;
  });
