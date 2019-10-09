$(document).ready(function () {
    $('#categoryF').click(function () {
        console.log('Category Filter executed');
        cat.where("id", "==", "books")
            .onSnapshot(function (querySnapshot) {
                loadCategories(querySnapshot);
            });
    });

    $('#clearFilter').click(function () {
        console.log('Clear Filter executed');
        cat.get().then(function (querySnapshot) {
            loadCategories(querySnapshot);
        })
    });

    $("#searchEmployee").change(function () {
        console.log('You entered: ', $(this).val());
        var searchTitle = $(this).val();
        cat.where("titles", "==", searchTitle)
            .onSnapshot(function (querySnapshot) {
                loadCategories(querySnapshot);
            });
    });
});

db.collection("categories").onSnapshot(function (snapShot) {
    console.log('Something changed');
    loadCategories(snapShot);
})

function loadCategories(querySnapshot) {
    var table = '';
    var count = 0;
    $('tbody.tbodyData').html(table);
    querySnapshot.forEach(function (doc) {
        var document = doc.data();
        count = 0;
        document.titles.forEach(function (title) {
            table += '<tr>';
            table += '<td class="fname">' + doc.id + '</td>';
            table += '<td class="lname">' + title + '</td>';
            table += '<td class="editEmployee" style="text-align:center;"><i class="fa fa-pencil" aria-hidden="true" style="color:blue;"></i></td>';
            table += '<td class="deleteEmployee" style="text-align:center;"><i class="fa fa-trash" aria-hidden="true" style="color:red;"></i></td>';
            table += '</tr>';
            count += 1;
        })
        console.log(doc.id + "..." + count);
    });
    $('tbody.tbodyData').html(table);
}
