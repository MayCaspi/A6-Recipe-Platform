function loginForm() {
    // Create form element
    var form = $('<form></form>');
    form.attr('id', 'loginForm');

    // Create username label and input
    var usernameLabel = $('<label></label>');
    usernameLabel.attr('for', 'username');
    usernameLabel.text('Username:');

    var usernameInput = $('<input>');
    usernameInput.attr({
        'type': 'text',
        'id': 'username',
        'name': 'username',
        'required': 'required'
    });

    // Create password label and input
    var passwordLabel = $('<label></label>');
    passwordLabel.attr('for', 'password');
    passwordLabel.text('Password:');

    var passwordInput = $('<input>');
    passwordInput.attr({
        'type': 'password',
        'id': 'password',
        'name': 'password',
        'required': 'required'
    });

    // Create submit button
    var submitButton = $('<input>');
    submitButton.attr({
        'type': 'submit',
        'value': 'Login'
    });

    // Append elements to form
    form.append(usernameLabel, '<br>', usernameInput, '<br>', passwordLabel, '<br>', passwordInput, '<br><br>', submitButton);

    // Append form to body
    $('body').append(form);
}

// Exporting loginForm function
export { loginForm };
