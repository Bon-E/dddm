$(document).ready(() => {
    initPage().then(() => {
        routePages();
        getUsers().then(() => {

            initModal();
            populateTable();

        });
    });
});

async function getUsers() {
    let model = Model.getInstance();
    const users = await $.get('/get_users');
    model.setUsers(users);
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
        var editButton = $("<button>").addClass("btn btn-primary mr-2").text("Edit").click(function () {
            var userId = $(this).closest("tr").data("user-id");
            handleEditButtonClick(userId); // opens edit modal with user's data
        });

        var deleteButton = $("<button>").addClass("btn btn-danger").text("Delete").click(function () {
            // Handle delete button click
            // You can implement delete functionality here


            alert("Delete button clicked for user with ID: " + userId);
        });

        actionsCell.append(editButton, deleteButton);
        row.append(actionsCell);

        tableBody.append(row);
    });
}

function initModal() {

    var editModal = $("#editModal");
    var editForm = $("#editUserForm");
    var saveChangesBtn = $("#saveChangesBtn");

    saveChangesBtn.click(function () {
        var formData = editForm.serialize();
        // You can send the formData using an AJAX request to the backend
        // alert("Sending request to update user with ID: " + editUserIdField.val());
        editModal.modal("hide");
    });

}


function handleEditButtonClick(userId) {

    let model = Model.getInstance();

    var editModal = $("#editModal");

    var editUserId = $("#editUserId");
    var editUserName = $("#editUserName");
    var editPassword = $("#editPassword");
    var editFirstName = $("#editFirstName");
    var editLastName = $("#editLastName");
    var editEmail = $("#editEmail");
    var editPhone = $("#editPhone");

    var editBirthday = $("#editBirthday");

    var user = model.getUsers().find(function (user) {
        return user._id === userId;
    });

    editUserId.val(user._id);
    editUserName.val(user.username);
    editFirstName.val(user.fname);
    editLastName.val(user.lname);
    editEmail.val(user.email);
    editPhone.val(user.phone);

    var dateTime = new Date(user.birthday);
    var formattedDate = dateTime.toISOString().split("T")[0]; // Extract date portion
    editBirthday.val(formattedDate);

    editModal.modal("show");
}
