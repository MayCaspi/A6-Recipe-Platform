function loginForm() {
    // Create container element
    var container = document.createElement('div');
    container.id = 'container';
    container.style.display = 'flex';
    container.style.width = '80%';
    container.style.margin = 'auto';

    // Create left side (for image)
    var leftSide = document.createElement('div');
    leftSide.id = 'leftSide';
    leftSide.style.flex = '1';
    leftSide.style.padding = '3px';
    leftSide.style.marginRight = '50px';

    // Insert image tag with your picture URL
    var image = document.createElement('img');
    image.src = 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg';
    image.alt = 'Your Image';
    image.style.width = '100%'; // Adjusted width
    image.style.maxHeight = '100%';
    image.style.borderRadius = '15px';

    leftSide.appendChild(image);

    // Create right side (for title and login form)
    var rightSide = document.createElement('div');
    rightSide.id = 'rightSide';
    rightSide.style.borderRadius = '8px';
    rightSide.style.display = 'flex';
    rightSide.style.flexDirection = 'column'; // Set flex direction to column
    rightSide.style.alignItems = 'center';
    rightSide.style.justifyContent = 'center'

    // Create login form
    var form = document.createElement('form');
    form.id = 'loginForm';
    form.style.width = '300px';
    form.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)';

    // Create username label and input
    var usernameLabel = createInputLabel('Username', 'username');
    var usernameInput = createInput('text', 'username', 'Enter your username', true);

    // Create password label and input
    var passwordLabel = createInputLabel('Password', 'password');
    var passwordInput = createInput('password', 'password', 'Enter your password', true);

    // Create submit button
    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Login';
    submitButton.style.backgroundColor = '#4caf50';
    submitButton.style.color = '#fff';
    submitButton.style.cursor = 'pointer';

    // Create "I forgot my password" button
    var forgotPasswordButton = createButton('Forgot Password', 'forgotPasswordButton');

    // Create "New user - create an account" button
    var createAccountButton = createButton('New user - Create an Account', 'createAccountButton');

    // Append elements to form
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);
    form.appendChild(document.createElement('br')); // Added space
    form.appendChild(forgotPasswordButton);
    form.appendChild(document.createElement('br')); // Added space
    form.appendChild(createAccountButton);

    // Append form to right side
    rightSide.appendChild(form);

    // Append left and right sides to container
    container.appendChild(leftSide);
    container.appendChild(rightSide);

    // Append container to body
    document.body.appendChild(container);
}

// Helper function to create button
function createButton(text, id) {
    var button = document.createElement('button');
    button.textContent = text;
    button.id = id;
    button.style.cursor = 'pointer';
    button.style.marginTop = '8px'; // Added space
    return button;
}

// Helper function to create input label
function createInputLabel(text, htmlFor) {
    var label = document.createElement('label');
    label.textContent = text;
    label.htmlFor = htmlFor;
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    return label;
}

// Helper function to create input element
function createInput(type, id, placeholder, required) {
    var input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.required = required;
    input.style.width = '100%';
    input.style.padding = '8px';
    input.style.marginBottom = '16px';
    input.style.boxSizing = 'border-box';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    return input;
}

export {loginForm}
