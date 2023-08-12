$(document).ready(() => {
    initPage().then(() => {
        routePages();
        initModal();
        populateUserTypesSelection();
        populateTable();
    });
});

async function refreshTable() {
    $("#userTableBody").empty();
    await getUsers();
    populateTable();
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

function populateTable() {
    let model = Model.getInstance();

    var tableBody = $("#userTableBody");


    console.log(model.getUsers());

    model.getUsers().forEach(function (user) {
        var row = $("<tr>");

        row.attr("data-user-id", user._id);

        row.append($("<td>").text(user.username));
        row.append($("<td>").text(user.fname));
        row.append($("<td>").text(user.lname));
        row.append($("<td>").text(user.email));
        row.append($("<td>").text(user.phone));

        var actionsCell = $("<td>");
        var editButton = $("<button>").addClass("btn btn-primary mr-2").click(function () {
            var userId = $(this).closest("tr").data("user-id");
            handleEditButtonClick(userId); // opens edit modal with user's data
        });

        const pencilIcon = $('<i>').addClass('bi bi-pencil');
        editButton.append(pencilIcon);

        var deleteButton = $("<button>").addClass("btn btn-danger").click(function () {
            // Handle delete button click
            // You can implement delete functionality here
            var userId = $(this).closest("tr").data("user-id");
            $.ajax({
                url: '/delete_user',
                type: 'DELETE',
                data: {
                    userId: userId
                },
                success: function (res) {
                    console.log('deleted');
                    refreshTable();
                }
            });

            alert("Delete button clicked for user with ID: " + userId);
        });
        const trashIcon = $('<i>').addClass('bi bi-trash');
        deleteButton.append(trashIcon);


        actionsCell.append(editButton, deleteButton);
        row.append(actionsCell);

        tableBody.append(row);
    });
}

function initModal() {
    var editForm = $("#editUserForm");

    $("#saveChangesBtn").click(function () {
        var formData = editForm.serialize();
        console.log(formData);
        // You can send the formData using an AJAX request to the backend
        // alert("Sending request to update user with ID: " + editUserIdField.val());
        $.ajax({
            url: '/update_user',
            type: 'PUT',
            data: formData,
            success: function (res) {
                console.log('ok');
                refreshTable();
            }
        });
        $("#editModal").modal("hide");
    });

    $("#closeModalBtn1").click(() => {
        $("#editModal").modal("hide");
    });

    $("#closeModalBtn2").click(() => {
        $("#editModal").modal("hide");
    });

}


function handleEditButtonClick(userId) {

    let model = Model.getInstance();

    var user = model.getUsers().find(function (user) {
        return user._id === userId;
    });

    $("#editUserId").val(user._id);
    $("#editUserName").val(user.username);
    $("#editFirstName").val(user.fname);
    $("#editLastName").val(user.lname);
    $("#editEmail").val(user.email);
    $("#editPhone").val(user.phone);

    $("#editPassword").val("");
    $("#editBirthday").val("");

    if (user.birthday) {
        var dateTime = new Date(user.birthday);
        var formattedDate = dateTime.toISOString().split("T")[0]; // Extract date portion
        $("#editBirthday").val(formattedDate);
    }

    $("#editCity").val(user.address.city);
    $("#editStreet").val(user.address.street);
    $("#editHouseNumber").val(user.address.house_number);

    $("#userType").val(user.type);

    $("#editModal").modal("show");
}
