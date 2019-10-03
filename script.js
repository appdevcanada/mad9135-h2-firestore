$(document).ready(function () {
    //get all the data on app startup
    loadData();

    function loadData() {
        cat.get().then(function (querySnapshot) {
            loadCategories(querySnapshot)
        });
    }

    function loadCategories(querySnapshot) {
        var table = '';
        querySnapshot.forEach(function (doc) {
            var document = doc.data();
            document.titles.forEach(function (title) {
                table += '<tr>';
                table += '<td class="fname">' + doc.id + '</td>';
                table += '<td class="lname">' + title + '</td>';
                table += '<td class="editEmployee" style="text-align:center;"><i class="fa fa-pencil" aria-hidden="true" style="color:blue;"></i></td>';
                table += '<td class="deleteEmployee" style="text-align:center;"><i class="fa fa-trash" aria-hidden="true" style="color:red;"></i></td>';
                table += '</tr>';
            })
        });
        $('tbody.tbodyData').html(table);
    }

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
            var docCat = fname;
            db.collection("categories").doc(docCat).set({
                titles: [lname]
            }).then(function (docRef) {
                $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Category/Item created</div>');
                $('.employeeForm').css('display', 'none');
                loadData();
            });
        }
        else {
            var docCat = fname;
            db.collection("categories").doc(docCat).set({
                titles: [lname]
            }, merge = true
            ).then(function (docRef) {
                $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Category/Item updated</div>');
                $('.employeeForm').css('display', 'none');
                loadData();
            });
        }
    });

    // Cancel the Employee form
    $('#cancel').click(function () {
        $('.employeeForm').css("display", "none");
    });

    // Get the data of the employee you want to edit
    $("tbody.tbodyData").on("click", "td.editEmployee", function () {
        $('.employeeForm').css("display", "block");
        $('#dynamicBtn').text('Update Category/Item');

        $("#fname").val($(this).closest('tr').find('.fname').text());
        $("#lname").val($(this).closest('tr').find('.lname').text());
        $("#email").val($(this).closest('tr').find('.email').text());
        $("#age").val($(this).closest('tr').find('.age').text());
        $("#gender").val($(this).closest('tr').find('.gender').text());
        $("#yearsOfExperience").val($(this).closest('tr').find('.yearsofexperience').text());
        $("#isFullTime").prop('checked', $(this).closest('tr').find('.isfulltime').text() === 'true');
    });

    // Delete employee
    $("tbody.tbodyData").on("click", "td.deleteEmployee", function () {
        //Get the Employee Data
        var fName = $(this).closest('tr').find('.fname').text(); //Category
        var lName = $(this).closest('tr').find('.lname').text(); //Item

        db.collection('categories').doc(fName).delete().then(function () {
            $('#operationStatus').html('<div class="alert alert-success"><strong>Success! </strong> Item or/and Category deleted</div>');
            loadData();
        }).catch(function (error) {
            $('#operationStatus').html('<div class="alert alert-danger"><strong>Failure! </strong> Category/Item NOT deleted with Error: ' + error.message + '</div>');
        })
    });

    $("#searchEmployee").change(function () {
        console.log('You entered: ', $(this).val());
    });
});