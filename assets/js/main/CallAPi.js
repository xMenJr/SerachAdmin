
async function GetAllUniversity() {
    let response = await fetch('http://localhost:5086/api/University');
    let data = await response.json();
    const tableBody = document.querySelector('table tbody');
    
    data.result.forEach((element) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${element.code}</td>
            <td>${element.name}</td>
            <td>${element.type}</td>
            <td>${element.trainingSystem}</td>
            <td>${element.address}</td>
            <td>${element.phoneNumber}</td>
            <td>${element.email}</td>
            <td>${element.website}</td>
            <td class="text-danger" style="cursor: pointer;">
                <div onClick="GetUniversityById('${element.id}')">
                    <svg data-bs-toggle="modal" data-bs-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                    </svg>
                </div>
                <div  onClick="DeleteUniversity('${element.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function AddUniversity() {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const type = document.getElementById('type').value;
    const trainingSystem = document.getElementById('training').value;
    const address = document.getElementById('address').value;
    const phoneNumber = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const idArea = document.getElementById('area').value;

    try {
        let response = await fetch(`http://localhost:5086/api/University/AddUniversity?Token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code,
                type: type,
                trainingSystem: trainingSystem,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                website: website,
                idArea: idArea
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function GetUniversityById(id) {
    localStorage.setItem('iduniversity', id);
    try {
        let response = await fetch(`http://localhost:5086/api/University/gethUniversityById?Id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        
        if (data.result) {
            document.getElementById('namefix').value = data.result[0].name;
            document.getElementById('codefix').value = data.result[0].code;
            document.getElementById('typefix').value = data.result[0].type;
            document.getElementById('trainingfix').value = data.result[0].trainingSystem;
            document.getElementById('addressfix').value = data.result[0].address;
            document.getElementById('phonefix').value = data.result[0].phoneNumber;
            document.getElementById('emailfix').value = data.result[0].email;
            document.getElementById('websitefix').value = data.result[0].website;
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch area data. Please try again later.');
    }
}

async function UpdateUniversity() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('iduniversity');
    const name = document.getElementById('namefix').value;
    const code = document.getElementById('codefix').value;
    const type = document.getElementById('typefix').value;
    const trainingSystem = document.getElementById('trainingfix').value;
    const address = document.getElementById('addressfix').value;
    const phoneNumber = document.getElementById('phonefix').value;
    const email = document.getElementById('emailfix').value;
    const website = document.getElementById('websitefix').value;
    const idArea = document.getElementById('areafix').value;

    try {
        let response = await fetch(`http://localhost:5086/api/University?Token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                code: code,
                type: type,
                trainingSystem: trainingSystem,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                website: website,
                idArea: idArea
            })
        });

        if (response.ok) {
            alert('Cập nhật thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function DeleteUniversity(id) {
    if(confirm('Tất cả dữ liệu liên quan sẽ bị xóa, bạn có chắc chắn muốn xóa không?')) {
        let response = await fetch(`http://localhost:5086/api/University?Id=${id}`, {
            method: 'DELETE'
        });

        if (response.status === 200) {
            alert('Xóa thành công');
            window.location.reload();
        } else {
            alert('Xóa thất bại');
        }
    }
}


async function GetAllAreaSelect(id) {
    const selectBox = document.getElementById(id);

    let response = await fetch(`http://localhost:5086/api/Area`);
    let data = await response.json();
    data.result.forEach((element) => {
        let option = document.createElement('option');
        option.value = element.id; 
        option.textContent = element.name; 
        selectBox.appendChild(option);
    });
}

async function GetAllArea() {
    let response = await fetch(`http://localhost:5086/api/Area`);
    let data = await response.json();
    const tableBody = document.querySelector('table tbody');
    data.result.forEach((element) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td class="text-danger d-flex justify-content-evenly" style="cursor: pointer;">
                <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                    </svg>
                </button> -->
                <div onClick="GetAreaById('${element.id}')">
                    <svg data-bs-toggle="modal" data-bs-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                    </svg>
                </div>
                <div onClick="DeleteArea('${element.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 mb-2" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function AddArea() {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    try {
        let response = await fetch(`http://localhost:5086/api/Area/AddArea?Token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function UpdateArea() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('idarea');
    const name = document.getElementById('namefix').value;
    const description = document.getElementById('descriptionfix').value;
    try {
        let response = await fetch(`http://localhost:5086/api/Area/UpdateArea?Token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                description: description,
                createBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                createDate: '2021-07-01T00:00:00',
                modifiedBy: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                modifiedDate: '2021-07-01T00:00:00'
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function GetAreaById(id) {
    localStorage.setItem('idarea', id);
    try {
        let response = await fetch(`http://localhost:5086/api/Area/GetById?Id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        
        if (data.result) {
            document.getElementById('namefix').value = data.result.name;
            document.getElementById('descriptionfix').value = data.result.description;
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch area data. Please try again later.');
    }
}


async function DeleteArea(id) {
    if (confirm('Tất cả dữ liệu liên quan sẽ bị xóa, bạn có chắc chắn muốn xóa không?')) {
        try {
            let response = await fetch(`http://localhost:5086/api/Area/DeleteArea?Id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa thành công');
                window.location.reload();
            } else {
                alert('Xóa thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}




async function GetAllUniversityBenchmark(id) {
    const selectBox = document.getElementById(id);

    let response = await fetch(`http://localhost:5086/api/University`);
    let data = await response.json();
    data.result.forEach((element) => {
        let option = document.createElement('option');
        option.value = element.id; 
        option.textContent = element.name; 
        selectBox.appendChild(option);
    });
}

async function GetAllUniversityBenchmark1(id) {
    const selectBox = document.getElementById('department1');

    let response = await fetch(`http://localhost:5086/api/Departments/GetByIdUniversity?Id=${id}`);
    let data = await response.json();
    data.result.forEach((element) => {
        let option = document.createElement('option');
        option.value = element.id; 
        option.textContent = element.name; 
        selectBox.appendChild(option);
    });
}

async function GetAllDepartmentBenchmark(IdUniversity) {
    const selectBox = document.getElementById('department');
    console.log(IdUniversity);
    let response = await fetch(`http://localhost:5086/api/Departments/GetByIdUniversity?Id=${IdUniversity}`);
    let data = await response.json();
    data.result.forEach((element) => {
        let option = document.createElement('option');
        option.value = element.id; 
        option.textContent = element.name; 
        selectBox.appendChild(option);
    });
}

function SelectUniversityChange() {
    const universitySelect = document.getElementById('university');
    universitySelect.addEventListener('change', function() {
        const selectedValue = universitySelect.value;
        GetAllDepartmentBenchmark(selectedValue)
        console.log('Selected university ID:', selectedValue);
    });
}

function SelectUniversityChange1() {
    const universitySelect = document.getElementById('university1');
    universitySelect.addEventListener('change', function() {
        const selectedValue = universitySelect.value;
        GetAllUniversityBenchmark1(selectedValue)
        console.log('Selected university ID:', selectedValue);
    });
}

async function GetAllDepartment() {
    let response = await fetch(`http://localhost:5086/api/Departments`);
    let data = await response.json();
    const tableBody = document.querySelector('table tbody');
    data.result.forEach((element) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${element.nameUniversity}</td>
            <td>${element.name}</td>
            <td>${element.code}</td>
            <td>${element.admissionGroup}</td>
            <td>${element.tuition}</td>
            <td class="text-danger d-flex justify-content-evenly" style="cursor: pointer;">
                <div onClick="GetDepartmentById('${element.id}')">
                    <svg data-bs-toggle="modal" data-bs-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                    </svg>
                </div>
                <div onClick="DeleteDepartment('${element.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 mb-2" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function AddDepartment() {
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const admissionGroup = document.getElementById('group').value;
    const tuition = document.getElementById('score').value;
    const idUniversity = document.getElementById('university').value;

    try {
        let response = await fetch(`http://localhost:5086/api/Departments/AddDepartments?Token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                code: code,
                admissionGroup: admissionGroup,
                tuition: tuition,
                idUniversity: idUniversity
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function GetDepartmentById(id) {
    localStorage.setItem('iddepartment', id);
    try {
        let response = await fetch(`http://localhost:5086/api/Departments/GetById?Id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        
        if (data.result) {
            document.getElementById('namefix').value = data.result.name;
            document.getElementById('codefix').value = data.result.code;
            document.getElementById('groupfix').value = data.result.admissionGroup;
            document.getElementById('scorefix').value = data.result.tuition;
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch area data. Please try again later.');
    }
}

async function UpdateDepartment() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('iddepartment');
    const name = document.getElementById('namefix').value;
    const code = document.getElementById('codefix').value;
    const admissionGroup = document.getElementById('groupfix').value;
    const tuition = document.getElementById('scorefix').value;
    const idUniversity = document.getElementById('university1').value;

    try {
        let response = await fetch(`http://localhost:5086/api/Departments/UpdateAdmissionsMethod?Token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                code: code,
                admissionGroup: admissionGroup,
                tuition: tuition,
                idUniversity: idUniversity
            })
        });

        if (response.ok) {
            alert('Cập nhật thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function DeleteDepartment(id) {
    if (confirm('Tất cả dữ liệu liên quan sẽ bị xóa, bạn có chắc chắn muốn xóa không?')) {
        try {
            let response = await fetch(`http://localhost:5086/api/Departments/DeleteAdmissionsMethod?Id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa thành công');
                window.location.reload();
            } else {
                alert('Xóa thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}

async function GetAllBenchmark() {
    let response = await fetch(`http://localhost:5086/api/Benchmark/GettAllAdmin`);
    let data = await response.json();
    const tableBody = document.querySelector('table tbody');
    data.result.forEach((element) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>${element.nameUnivesity}</td>
                <td>${element.nameDepartment}</td>
                <td>${element.point}</td>
                <td>${element.year}</td>
                <td class="text-danger d-flex justify-content-evenly" style="cursor: pointer;">
                    <div onClick="GetBenchmarkById('${element.id}')">
                        <svg data-bs-toggle="modal" data-bs-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                        </svg>
                    </div>
                    <div onClick="DeleteDepartment('${element.id}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 mb-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                </td>
            </tr>
        `;

        tableBody.appendChild(row);
    });
}

async function AddBenchmark() {
    const token = localStorage.getItem('token');
    const point = document.getElementById('score').value;
    const year = document.getElementById('year').value;
    const idDepartment = document.getElementById('department').value;
    const idUniversity = document.getElementById('university').value;

    try {
        let response = await fetch(`http://localhost:5086/api/Benchmark/AddAdmissionsMethod?Token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                point: point,
                year: year,
                idDepartments: idDepartment,
                idUniversity: idUniversity
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function GetBenchmarkById(id) {
    localStorage.setItem('idbenchmark', id);
    try {
        let response = await fetch(`http://localhost:5086/api/Benchmark/GetById?Id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        
        if (data.result) {
            document.getElementById('scorefix').value = data.result.point;
            document.getElementById('yearfix').value = data.result.year;
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch area data. Please try again later.');
    }
}

async function UpdateBenchmark() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('idbenchmark');
    const scorefix = document.getElementById('scorefix').value;
    const yearfix = document.getElementById('yearfix').value;
    const university1 = document.getElementById('university1').value;
    const department1 = document.getElementById('department1').value;

    try {
        let response = await fetch(`http://localhost:5086/api/Benchmark/UpdateAdmissionsMethod?Token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                point: scorefix,
                year: yearfix,
                idUniversity: university1,
                idDepartments: department1
            })
        });

        if (response.ok) {
            alert('Cập nhật thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function DeleteDepartment(id) {
    if (confirm('Tất cả dữ liệu liên quan sẽ bị xóa, bạn có chắc chắn muốn xóa không?')) {
        try {
            let response = await fetch(`http://localhost:5086/api/Benchmark/DeleteAdmissionsMethod?Id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa thành công');
                window.location.reload();
            } else {
                alert('Xóa thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}


async function GetAllAdmisssionsMethod() {
    let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/Admin`);
    let data = await response.json();
    const tableBody = document.querySelector('table tbody');
    data.result.forEach((element) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <tr>
                <td>${element.nameUniversity}</td>
                <td>${element.name}</td>
                <td class="text-danger d-flex justify-content-evenly" style="cursor: pointer;">
                    <div onClick="GetAdmisssionsMethodById('${element.id}')">
                        <svg data-bs-toggle="modal" data-bs-target="#exampleModal1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools me-1" viewBox="0 0 16 16">
                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
                        </svg>
                    </div>
                    <div onClick="DeleteAdmissionsMethod('${element.id}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 mb-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                </td>
            </tr>
        `;

        tableBody.appendChild(row);
    });
}

async function AddAdmissionsMethod(){
    const token = localStorage.getItem('token');
    const name = document.getElementById('name').value;
    const idUniversity = document.getElementById('university').value;

    try {
        let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/AddAdmissionsMethod?Token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                idUniversity: idUniversity
            })
        });

        if (response.ok) {
            alert('Thêm mới thành công');
            window.location.reload();
        } else {
            alert('Thêm mới thất bại');
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function GetAdmisssionsMethodById(id) {
    localStorage.setItem('idadmisssionsmethod', id);
    try {
        let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/GetById?Id=${id}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        
        if (data.result) {
            document.getElementById('namefix').value = data.result.name;
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to fetch area data. Please try again later.');
    }
}

async function UpdateAdmissionsMethod() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('idadmisssionsmethod');
    const name = document.getElementById('namefix').value;
    const university1 = document.getElementById('university1').value;

    try {
        let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/UpdateAdmissionsMethod?Token=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                idUniversity: university1,
            })
        });

        if (response.ok) {
            alert('Cập nhật thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thất bại');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    }
}

async function DeleteAdmissionsMethod(id) {
    if (confirm('Tất cả dữ liệu liên quan sẽ bị xóa, bạn có chắc chắn muốn xóa không?')) {
        try {
            let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/DeleteAdmissionsMethod?Id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa thành công');
                window.location.reload();
            } else {
                alert('Xóa thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
} 


async function Login() {
    email = document.getElementById("emailLogin").value
    password = document.getElementById("passwordLogin").value

    if(email == null || email == "" || email == undefined) {
        alert("Vui lòng nhập email")
    }
    else if(password == null || password == "" || password == undefined) {
        alert("Vui lòng nhập password")
    }
    else {
        try {
            let response = await fetch(`http://localhost:5086/api/Users/SignIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (response.ok) {
                let data = await response.json();
                console.log(data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", data.email)
                localStorage.setItem("fullname", (data.firstName + " " + data.lastName))
                alert('Đăng nhập thành công');
                window.location.href = "university.html";
            } else {
                alert('Đăng nhập thất bại');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}

async function LoginSignIn(email, password) {

    if(email == null || email == "" || email == undefined) {
        alert("Vui lòng nhập email")
    }
    else if(password == null || password == "" || password == undefined) {
        alert("Vui lòng nhập password")
    }
    else {
        try {
            let response = await fetch(`http://localhost:5086/api/Users/SignIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (response.ok) {
                let data = await response.json();
                console.log(data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", data.email)
                localStorage.setItem("fullname", (data.firstName + " " + data.lastName))
                window.location.href = "university.html";
            } else {
                alert('Đăng nhập thất bại');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}

function LoadName() {
    const fullname = localStorage.getItem("fullname");
    const email = localStorage.getItem("email");
    if (fullname) {
        const nameElements = document.querySelectorAll("#fullnameDisplay");
        nameElements.forEach(element => {
            element.innerText = fullname;
        });
    }

    if(email) {
        const nameElements = document.querySelectorAll("#emailDisplay");
        nameElements.forEach(element => {
            element.innerText = email;
        });
    }
}

function LogOut() {
    localStorage.removeItem("fullname")
    localStorage.removeItem("email")
    window.location.href = "login.html";
}

async function SignIn() {
    const firstnameText = document.getElementById("firstname").value
    const lastnameText = document.getElementById("lastname").value
    const emailText = document.getElementById("email").value
    const passwordText = document.getElementById("password").value
    const confirmPasswordText = document.getElementById("confirmPassword").value
    const phoneText = document.getElementById("phone").value
    const addressText = document.getElementById("address").value

    if (confirmPasswordText != passwordText) {
        alert("Vui lòng nhập 2 mật khẩu giống nhau")
    }

    if(firstnameText == null || firstnameText == "" || firstnameText == undefined) {
        alert("Vui lòng nhập firstname")
    }
    else if(lastnameText == null || lastnameText == "" || lastnameText == undefined) {
        alert("Vui lòng nhập lastname")
    }
    else if(emailText == null || emailText == "" || emailText == undefined) {
        alert("Vui lòng nhập email")
    }
    else if(passwordText == null || passwordText == "" || passwordText == undefined) {
        alert("Vui lòng nhập password")
    }
    else if(confirmPasswordText == null || confirmPasswordText == "" || confirmPasswordText == undefined) {
        alert("Vui lòng nhập confirmPassword")
    }
    else if(phoneText == null || phoneText == "" || phoneText == undefined) {
        alert("Vui lòng nhập phone")
    }
    else if(addressText == null || addressText == "" || addressText == undefined) {
        alert("Vui lòng nhập address")
    }
    // else if(dob == null || dob == "" || dob == undefined) {
    //     alert("Vui lòng nhập Ngày sinh")
    // }
    else {
        try {
            let response = await fetch(`http://localhost:5086/api/Users/SignUp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstnameText,
                    lastName: lastnameText,
                    email: emailText,
                    password: passwordText,
                    confirmPassword: confirmPasswordText,
                    PhoneNumber: phoneText,
                    address: addressText
                })
            });
    
            if (response.ok) {
                alert('Đăng ký thành công');
                LoginSignIn(emailText, passwordText);
            } else {
                alert('Đăng nhập thất bại');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
    }
}