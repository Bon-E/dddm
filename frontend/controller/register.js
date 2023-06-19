$(document).ready(() => {
    document.getElementById('loginBtn').addEventListener('click', function() {
        window.location.href = '/login';
    });
    document.getElementById('homebtn').addEventListener('click', function() {
        window.location.href = '/';
    });
    document.getElementById('registerbtn').addEventListener('click', function() {
         window.location.href = '/register';
    });
    document.getElementById('console').addEventListener('click', function() {
        window.location.href = '/consoles';
    });
    document.getElementById('allGames').addEventListener('click', function() {
        window.location.href = '/games';
    });
});

const handle_register  = (event) => {
    event.preventDefault(); 
    if(comparePasswords(event)){
        // continue
        alert("chupapi");
        $.post("/new_user", {fname: "chupapi"});
    }};

    const createUserData = () => {
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        const fname = $('#firstName').val();
        const lname = $('#lastName').val();
        const phone = $('#homenumber').val();
        const birthday = $('#dateOfBirth').val();
        const city = $('#city').val();
        const street = $('#street').val();
        const house_number = $('#homenumber').val();
        const address = `${street}, ${house_number}, ${city}`;
    
        const userData = {
            username,
            password,
            email,
            fname,
            lname,
            phone,
            birthday,
            address
        };
    
        return userData;
    };
    
    const addNewUser = (userData) => {
        $.post('/new_user', userData)
            .done(savedUser => {
                console.log('User registered successfully:', savedUser);
            })
            .fail(error => {
                console.error('Error registering user:', error);
            });
    };

function comparePasswords(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    return password === confirmPassword; 
} 
