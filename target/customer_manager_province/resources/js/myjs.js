function loadEditData(id){
    $.ajax({
        type: 'GET',
        url: '/city/api/' + id,
        success: function (city) {
            $('#exampleModalLabelSpan').text("Edit");
            $('#upId').val(city.id);
            $('#upName').val(city.name);
            $('#upCountry').val(city.country.id).change();
            $('#upAcreage').val(city.acreage);
            $('#upPopulation').val(city.population);
            $('#upGDP').val(city.GDP);
            $('#upDescription').val(city.description);
        }
    })
}

function getData(id){
    $.ajax({
        type: 'GET',
        url: '/city/api/' + id,
        success: function (city) {
            $('#exampleModalLabelSpan2').text("View");
            $('#name').val(city.name);
            $('#country').val(city.country.name);
            $('#acreage').val(city.acreage);
            $('#population').val(city.population);
            $('#GDP').val(city.GDP);
            $('#description').val(city.description);
        }
    })
}


function editCity() {
    let id = $('#upId').val();
    let name = $('#upName').val();
    let country = {"id": $('#upCountry').val()};
    let acreage = $('#upAcreage').val();
    let population = $('#upPopulation').val();
    let GDP = $('#upGDP').val();
    let description = $('#upDescription').val();

    let newCity = {
        name: name,
        country: country,
        acreage: acreage,
        population: population,
        GDP: GDP,
        description: description
    }
    console.log(newCity);
    if ((id==0)&&($("#form").valid())){
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newCity),
            url: "/city",
            success: function (city) {
                $('#cityList tbody').prepend(' <tr id="row'+ city.id+'">\n' +
                    '      <td>' + city.id + '</td>\n' +
                    '      <td>' + city.name + '</td>\n' +
                    '      <td>' + city.country.name + '</td>\n' +
                    '      <td><button onclick="loadEditData('+city.id+',this)" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class=" btn btn-outline-primary" ><a><i class="far fa-edit">Edit</i></a></button>' +
                    '      <input type="hidden" id="id" value="' + city.id + '"></td>\n' +
                    '      <td><button class="btn btn-outline-danger" onclick="deleteCity('+ city.id+',this)"><i class="fas fa-trash-alt"></i>Delete</button></td>' +
                    '      <td><button onclick="getData('+city.id+',this)" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo"  class=" btn btn-outline-primary" ><a><i class="fas fa-eye">View</i></a></button>' +
                    '      <input type="hidden" id="id" value="' + city.id + '"></td>\n' +
                    '      </tr>');
                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }else{
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newCity),
            url: '/city/edit/' + id,
            success: function (city) {
                console.log(city);
                $('#row' + id + ' td').remove();
                $('#row' + id).html(`
                        <td>${city.id}</td>
                        <td>${city.name}</td>
                        <td>${city.country.name}</td>
                        <td><button onclick="loadEditData('${city.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="updateCustomer btn btn-outline-primary" href="' + city.id + '"><a><i class="far fa-edit">Edit</i></a></button><input type="hidden" id="id" value="' + city.id + '"></td>
                        <td><button class="btn btn-outline-danger" onclick="deleteCity('${city.id}',this)"><i class="fas fa-trash-alt"></i>Delete</button></td>
                        <td><button onclick="getData('${city.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo"  class="updateCity btn btn-outline-primary" href="' + city.id + '"><a><i class="fas fa-eye">View</i></a></button><input type="hidden" id="id" value="' + city.id + '"></td>`);
                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'You have changed successfully!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

}

function deleteCity(cityID,button){
    let a = button;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `/city/${cityID}`,
                success: function (data) {
                    a.closest ('tr').remove ();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                }
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
    event.preventDefault();
}

function loadAddNew(){
    $('#exampleModalLabelSpan').text("Add New");
    $('#upId').val(0);
    $('#upName').val("");
    $('#upCountry').val("");
    $('#upAcreage').val(0);
    $('#upPopulation').val(0);
    $('#upGDP').val(0);
    $('#upDescription').val("");
}