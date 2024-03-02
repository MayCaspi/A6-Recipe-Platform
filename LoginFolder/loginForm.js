function loginForm() {
    
    var container = document.createElement('div');
    container.id = 'container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.maxWidth = '1300px'; // Increased max width
    container.style.margin = 'auto';
    container.style.marginTop = '100px';
    container.style.backgroundColor = '#fff';
    container.style.boxShadow = '0 4px 20px 0 rgba(0,0,0,0.2)';
    container.style.overflow = 'hidden';
    container.style.height = '500px'; // Set a fixed height for the container
    container.style.alignContent = 'center';
    container.style.borderRadius = '10px';


    // Create left side (for image)
    var leftSide = document.createElement('div');
    leftSide.id = 'leftSide';
    leftSide.style.width = '70%';
    leftSide.style.position = 'relative';

    // Insert image
    var image = document.createElement('img');
    image.src = 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg';
    image.alt = 'Welcome Image';
    image.style.width = '950px';
    image.style.height = '750px';

    leftSide.appendChild(image);

    // Create right side (for form)
    var rightSide = document.createElement('div');
    rightSide.id = 'rightSide';
    rightSide.style.width = '50%';
    rightSide.style.backgroundColor = '#fff';
    rightSide.style.display = 'flex';
    rightSide.style.flexDirection = 'column';
    rightSide.style.justifyContent = 'center';
    rightSide.style.alignItems = 'center';
    rightSide.style.padding = '40px';

    // Title
    var title = document.createElement('h2');
    title.textContent = 'User Login';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.color = '#595959';
    document.body.style.fontFamily = " Josefin Sans, sans-serif";
    rightSide.appendChild(title);

    // Form
    var form = document.createElement('form');
    form.id = 'loginForm';
    form.style.width = '80%';

    // Username Input
    var usernameInput = createInput('text', 'username', 'Enter your username');
    
    // Password Input
    var passwordInput = createInput('password', 'password', 'Enter your password');

    // Submit Button
    var submitButton = createButton('Login', 'submit');

    // Append elements to form
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(submitButton);

    // Append form to right side
    rightSide.appendChild(form);

    // Append left and right sides to container
    container.appendChild(leftSide);
    container.appendChild(rightSide);

    // Append container to body
    document.body.appendChild(container);
    document.body.style.margin = '0'; // Remove default margin
    document.body.style.height = '100vh'; // Full viewport height
    document.body.style.display = 'flex'; 
    document.body.style.alignItems = 'center';
    document.body.style.justifyContent = 'center';
    // Radial gradient from center to the edges
    document.body.style.backgroundImage = 'radial-gradient(circle at center, hsl(60, 70%, 80%), hsl(120, 70%, 80%) 100%)'
}

// Helper function to create input elements
function createInput(type, id, placeholder) {
    var input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    input.required = true;
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.marginBottom = '15px';
    input.style.borderRadius = '5px';
    input.style.border = '1px solid #ddd';
    return input;
}

// Helper function to create button
function createButton(value, id) {
    var button = document.createElement('input');
    button.type = 'submit';
    button.id = id;
    button.value = value;
    button.style.fontFamily =" Josefin Sans, sans-serif";
    button.style.width = '100%';
    button.style.padding = '10px';
    button.style.borderRadius = '5px';
    button.style.border = 'none';
    button.style.backgroundColor = '#green-500';
    button.style.color = 'white';
    button.style.marginTop = '10px';
    button.style.cursor = 'pointer';
    return button;
}
export {loginForm}
