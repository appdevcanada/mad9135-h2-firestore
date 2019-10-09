$(document).ready(function () {
    var docTitle = "";

    $('#createEmployee').click(function () {
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Save Changes')
    });

    $('#dynamicBtn').click(function () {
        //employee form values
        var fname = $("#fname").val();
        var lname = $("#lname").val();

        //check if you need to create or update an employee
        if ($(this).text() == "Save Changes") {

            var docRef = cat.doc(fname);
            var itemList = [];

            docRef.get().then(function (item) {
                if (item.data()) {
                    itemList = item.data().titles
                }
                itemList.push(lname);
                docRef.set({ titles: itemList })
                    // docRef.update({ titles: firebase.firestore.FieldValue.arrayUnion(lname) })
                    .then(function () {
                        $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Item or/and Category created</div>');
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
                closeForm();
                console.log("here 2...");
            }).catch(function (error) {
                $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure! </strong> Category/Item NOT created with Error: ' + error.message + '</div>');
            })
        } else {
            updateArray();
        }
    });

    // Cancel the Employee form
    $('#cancel').click(function () {
        closeForm();
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click", "td.editEmployee", function () {
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Category/Item');

        $("#fname").val($(this).closest('tr').find('.fname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
        docTitle = $("#lname").val();
    });

    // Delete employee
    $("tbody.tbodyData").on("click", "td.deleteEmployee", function () {
        //Get the Employee Data
        var fName = $(this).closest('tr').find('.fname').text(); //Category
        var lName = $(this).closest('tr').find('.lname').text(); //Item

        var docRef = cat.doc(fName);

        docRef.get().then(function (item) {
            docRef.update({ titles: firebase.firestore.FieldValue.arrayRemove(lName) });
            $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Item or/and Category deleted</div>');
            console.log(item.data().titles.length);
            if (item.data().titles.length == 1) {
                docRef.delete();
            }
        }).catch(function (error) {
            $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure! </strong> Category/Item NOT deleted with Error: ' + error.message + '</div>');
        })
    });

    function closeForm() {
        $("#fname").val("");
        $("#lname").val("");
        $('.employeeForm').css("display", "none");
    }

    async function updateArray() {
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var docRef = cat.doc(fname);
        await docRef.get()
            .then(function (item) {
                var document = item.data().titles;
                document.forEach(function (title) {
                    if (title == docTitle) {
                        docRef.update({ titles: firebase.firestore.FieldValue.arrayRemove(docTitle) });
                        docRef.update({ titles: firebase.firestore.FieldValue.arrayUnion(lname) });
                    };
                })
                docTitle = "";
                $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Category/Item updated</div>');
                closeForm();
            })
            .catch(function (error) {
                $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure! </strong> Category/Item NOT updated with Error: ' + error.message + '</div>');
            })
    }
});
