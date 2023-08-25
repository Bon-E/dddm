$(document).ready(() => {
    initPage().then(() => {
        routePages();
        populate_self_details();
    });
});

async function populate_self_details() {
    const details = await $.get('/get_self_details');

    $('#fname').val(details.fname);
    $('#lname').val(details.lname);
    $('#username').val(details.username);
    $('#email').val(details.email);
    $('#phone_start').val(details.phone.split('-')[0]);
    $('#phoneNumber').val(details.phone.split('-')[1]);

    if (details.birthday) {
        var dateTime = new Date(details.birthday);
        var formattedDate = dateTime.toISOString().split('T')[0]; // Extract date portion
        $('#dateOfBirth').val(formattedDate);
    }

    $('#city').val(details.address.city);
    $('#street').val(details.address.street);
    $('#homenumber').val(details.address.house_number);
}

function comparePasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    return password === confirmPassword;
}

const handle_register = (event) => {
    event.preventDefault();
    if (comparePasswords()) {
        var editForm = $('#editAccountForm');
        var formData = editForm.serialize();

        $.ajax({
            url: '/update_self',
            type: 'PUT',
            data: formData,
            success: function (res) {
                alert('successfully updated');
            }
        });
    } else {
        // TODO:
        // show modal with error
    }
};
