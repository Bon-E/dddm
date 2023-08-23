$(document).ready(() => {
    initPage().then(() => {
        routePages();
        initModal();
        populateUserTypesSelection();
        let model = Model.getInstance();
        populateTableWithFilteredUsers(model.getUsers());
    });

    $('#search-form').submit(function (event) {
        event.preventDefault();
        const query = $('#search').val();
        performUserSearch(query);
    });
});
function performUserSearch(query) {
    $.get('/get_users')
        .done((users) => {
            const filteredUsers = filterUsers(users, query);
            populateTableWithFilteredUsers(filteredUsers);
        })
        .fail((error) => {
            console.error('Error fetching user data:', error);
        });
}

function filterUsers(users, query) {
    return users.filter((user) => {
        return user.username.toLowerCase().includes(query.toLowerCase()) || user.fname.toLowerCase().includes(query.toLowerCase()) || user.lname.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase()) || user.phone.toLowerCase().includes(query.toLowerCase());
    });
}

function populateTableWithFilteredUsers(users) {
    let model = Model.getInstance();
    var tableBody = $('#userTableBody');

    tableBody.empty();

    users.forEach(function (user) {
        var row = $('<tr>');

        row.attr('data-user-id', user._id);

        row.append($('<td>').text(user.username));
        row.append($('<td>').text(user.fname));
        row.append($('<td>').text(user.lname));
        row.append($('<td>').text(user.email));
        row.append($('<td>').text(user.phone));

        var actionsCell = $('<td>');
        var editButton = $('<button>')
            .addClass('btn btn-primary mr-2')
            .click(function () {
                var userId = $(this).closest('tr').data('user-id');
                handleEditButtonClick(userId); // opens edit modal with user's data
            });

        const pencilIcon = $('<i>').addClass('bi bi-pencil');
        editButton.append(pencilIcon);

        var deleteButton = $('<button>')
            .addClass('btn btn-danger')
            .click(function () {
                var userId = $(this).closest('tr').data('user-id');
                $.ajax({
                    url: '/delete_user',
                    type: 'DELETE',
                    data: {
                        userId: userId
                    },
                    success: function (res) {
                        console.log('deleted');
                        refreshTable();
                    },
                    error: function (error) {
                        alert(error.responseText ? error.responseText : 'Error, cannot delete user');
                    }
                });
            });
        const trashIcon = $('<i>').addClass('bi bi-trash');
        deleteButton.append(trashIcon);

        actionsCell.append(editButton, deleteButton);
        row.append(actionsCell);

        tableBody.append(row);
    });
}

async function refreshTable() {
    $('#userTableBody').empty();
    await getUsers();
    let model = Model.getInstance();
    populateTableWithFilteredUsers(model.getUsers());
}

async function getUsers() {
    let model = Model.getInstance();
    const users = await $.get('/get_users');
    model.setUsers(users);
}

function populateUserTypesSelection() {
    let model = Model.getInstance();
    $.each(model.getUserTypes(), (index, item) => {
        let option = $('<option>', {
            value: item._id,
            text: item.type
        });
        $('#userType').append(option);
    });
}

function initModal() {
    var editForm = $('#editUserForm');

    $('#saveChangesBtn').click(function () {
        var formData = editForm.serialize();
        // You can send the formData using an AJAX request to the backend
        // alert("Sending request to update user with ID: " + editUserIdField.val());
        $.ajax({
            url: '/update_user',
            type: 'PUT',
            data: formData,
            success: function (res) {
                refreshTable();
            }
        });
        $('#editModal').modal('hide');
    });

    $('#closeModalBtn1').click(() => {
        $('#editModal').modal('hide');
    });

    $('#closeModalBtn2').click(() => {
        $('#editModal').modal('hide');
    });
}

function handleEditButtonClick(userId) {
    let model = Model.getInstance();

    var user = model.getUsers().find(function (user) {
        return user._id === userId;
    });

    $('#editUserId').val(user._id);
    $('#editUserName').val(user.username);
    $('#editFirstName').val(user.fname);
    $('#editLastName').val(user.lname);
    $('#editEmail').val(user.email);
    $('#editPhone').val(user.phone);

    $('#editPassword').val('');
    $('#editBirthday').val('');

    if (user.birthday) {
        var dateTime = new Date(user.birthday);
        var formattedDate = dateTime.toISOString().split('T')[0]; // Extract date portion
        $('#editBirthday').val(formattedDate);
    }

    $('#editCity').val(user.address.city);
    $('#editStreet').val(user.address.street);
    $('#editHouseNumber').val(user.address.house_number);

    $('#userType').val(user.type);

    $('#editModal').modal('show');
}
