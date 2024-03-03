import { loginForm } from "./loginForm.js";

$(function() {
    // Call the loginForm function
    loginForm();
});

$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        // Your encryption method goes here
        // For demonstration purposes, let's assume encryption is handled by a function called encryptData()
        const encryptedUsername = encryptData(username);
        const encryptedPassword = encryptData(password);


        // Fetch user data from local storage (or local file)
        $.getJSON('LoginFolder/users.json', function(data) {
            console.log(data)
            // Decrypt and check if user exists
            const user = data.find(u => u.username === encryptedUsername && u.password === encryptedPassword);
            if (user) {
                alert('Login successful');
                $('body').fadeOut(1000, function() {
                    window.location.href = 'mainScreen.html'; // Redirect to main page
                });
                
            } else {
                alert('Invalid username or password');
            }
        });
    });

    // Dummy encryption and decryption functions for demonstration purposes
    function encryptData(data) {
        // Dummy encryption, replace with actual encryption method
        return btoa(data); // Base64 encoding for simplicity
    }

    function decryptData(data) {
        // Dummy decryption, replace with actual decryption method
        return atob(data); // Base64 decoding for simplicity
    }
});
