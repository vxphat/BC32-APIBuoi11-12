//=====================================
getProducts();

function getProducts(searchTerm) {
    apiGetProducts(searchTerm)
        .then((response) => {
console.log(response.data);
console.log(searchTerm);
            let products = response.data.map((product) => {
                return new Product(
                    product.id,
                    product.taiKhoan,
                    product.matKhau,
                    product.hoTen,
                    product.email,
                    product.ngonNgu,
                    product.loaiND,
                )

            })
            console.log(products)
            display(products);
        })
        .catch((error) => {
            console.log(error);
        })
}


function addProduct(product) {
    apiAddProduct(product)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        })
}

function deleteProduct(productId) {
    apiDeleteProduct(productId)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateProduct(productId, product) {
    apiUpdateProduct(productId, product)
        .then(() => {
            //Update thành công
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        })
}

//===================================
//====DOM====
function dom(selector) {
    return document.querySelector(selector);
}

//======Display========
function display(products) {
    let html = products.reduce((result, product, index) => {
        return result + `
        <tr>
            <td>${product.id}</td>
            <td>${product.taiKhoan}</td>
            <td>${product.matKhau}</td>
            <td>${product.hoTen}</td>
            <td>${product.email}</td>
            <td>${product.ngonNgu}</td>
            <td>${product.loaiND}</td>

            <td class="py-1">
                <button
                class="btn btn-success"
                data-id="${product.id}"
                data-type="edit"
                data-toggle="modal"
                data-target="#myModal"
                >
                Sửa
                </button>
            
                <button
                class="btn btn-danger"
                data-id="${product.id}"
                data-type="delete"
                >
                Xoá
                </button>
            </td>
        </tr>
`
    }, "")
    dom('#tblDanhSachNguoiDung').innerHTML = html;
}
//=====ResetForm=======
function resetForm() {
    dom('#TaiKhoan').value = "";
    dom('#HoTen').value = "";
    dom('#MatKhau').value = "";
    dom('#Email').value = "";
    dom('#HinhAnh').value = "";
    dom('#loaiNguoiDung').value = "Chọn loại người dùng";
    dom('#loaiNgonNgu').value = "Chọn ngôn ngữ";
    dom('#MoTa').value = "";
}


dom("#btnThemNguoiDung").addEventListener("click", () => {
    //thay đổi heading
    dom('.modal-title').innerHTML = "Thêm thông tin"
    dom('.modal-footer').innerHTML = `
    <button class="btn btn-danger" data-dismiss="modal">Huỷ</button>
    <button class="btn btn-primary" data-type="add">Thêm</button>
    `;
    dom('#loaiNguoiDung').value = "Chọn loại người dùng"
    dom('#loaiNgonNgu').value = "Chọn ngôn ngữ"
    resetForm();
})

dom('.modal-footer').addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute('data-type')

    //DOM
    let id = dom('#id').value;
    let taiKhoan = dom('#TaiKhoan').value;
    let hoTen = dom('#HoTen').value;
    let matKhau = dom('#MatKhau').value;
    let email = dom('#Email').value;
    let hinhAnh =dom('#HinhAnh').value;
    let loaiND = dom('#loaiNguoiDung').value;
    let ngonNgu = dom('#loaiNgonNgu').value;
    let moTa =dom('#MoTa').value;

    if (!validateForm()) {
        return
    }

    //Tạo object
    let product = new Product(null, taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND, moTa, hinhAnh)

    if (elementType === "add") {
        addProduct(product);
    } else if (elementType === "update") {
        updateProduct(id, product);
    }

})

dom('#tblDanhSachNguoiDung').addEventListener('click', (evt) => {
    let id = evt.target.getAttribute('data-id');
    let elType = evt.target.getAttribute('data-type');

    if (elType === 'delete') {
        deleteProduct(id);
    } else if (elType === 'edit') {
        dom('.modal-title').innerHTML = "Cập nhật thông tin";
        dom('.modal-footer').innerHTML = `
        <button class="btn btn-secondary"
        data-dismiss="modal"
        >Huỷ</button>
        
        <button class="btn btn-primary" data-type="update">
        Cập nhật
        </button>
        `

        //Call API lấy id thông tin 
        apiGetProductById(id)
            .then((response) => {
                let product = response.data;
                dom('#id').value = product.id;
                dom('#TaiKhoan').value = product.taiKhoan;
                dom('#HoTen').value = product.hoTen;
                dom('#MatKhau').value = product.matKhau;
                dom('#Email').value = product.email;
                dom('#HinhAnh').value = product.hinhAnh;
                dom('#loaiNguoiDung').value = product.loaiND;
                dom('#loaiNgonNgu').value = product.ngonNgu;
                dom('#MoTa').value = product.moTa;
            })
            .catch((error) => {
                console.log(error);
            })
    }
})

//===search

dom("#txtSearch").addEventListener("keydown", (evt) =>{
    //Kiểm tra không phải ký tự Enter => kết thúc hàm
    if (evt.key !== 'Enter') return

    getProducts(evt.target.value);
})

//====Validation======

function validateAccount() {
    let acc = dom('#TaiKhoan').value;
    let spanEl = dom('#spanTaiKhoan');

    if (!acc) {
        spanEl.innerHTML = "Tài khoản không được để trống"
        return false
    }
    spanEl.innerHTML = "";
    return true;
};


function validateName() {
    let name = dom('#HoTen').value;
    let spanEl = dom('#spanName');

    if (!name) {
        spanEl.innerHTML = "Họ tên không được để trống"
        return false;
    }
    let regex = /^([0-9])([#?!@$%^&*-])$/;

    if (!regex.test(name)) {
        spanEl.innerHTML = "Họ tên không hợp lệ"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validatePass() {
    let pass = dom('#MatKhau').value;
    let spanEl = dom('#spanPass');

    if (!pass) {
        spanEl.innerHTML = "Mật khẩu không được để trống";
        return false;
    }

    if (pass.length < 6 || pass.length > 8) {
        spanEl.innerHTML = "Mật khẩu phải từ 6-8 ký tự"
        return false;
    }

    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!regex.test(pass)) {
        spanEl.innerHTML = "Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateEmail() {
    let email = dom('#Email').value;
    let spanEl = dom('#spanEmail');

    if (!email) {
        spanEl.innerHTML = "Email không được để trống"
        return false;
    }

    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!regex.test(email)) {
        spanEl.innerHTML = "Email không đúng định dạng"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateImage(){
    let img = dom('#HinhAnh').value;
    let spanEl = dom('#spanImage');

    if(!img){
        spanEl.innerHTML = "Hình ảnh không được để trống"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateLoaiND(){
    let type = dom('#loaiNguoiDung').value;
    let spanEl = dom('#spanType');

    if(type === "Chọn loại người dùng"){
        spanEl.innerHTML = "Vui lòng chọn loại người dùng"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateNgonNgu(){
    let ngonNgu = dom('#loaiNgonNgu').value;
    let spanEl = dom('#spanNgonNgu');

    if(ngonNgu === "Chọn ngôn ngữ"){
        spanEl.innerHTML = "Vui lòng chọn loại ngôn ngữ"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateMoTa(){
    
    let moTa = dom('#MoTa').value;
    let spanEl = dom('#spanMoTa');

    if(!moTa){
        spanEl.innerHTML = "Mô tả không được để trống"
        return false;
    }

    if(moTa.length > 60){
        spanEl.innerHTML = "Quá 60 ký tự."
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

function validateForm() {
    let isValid = true;

    isValid = 
    validateAccount() 
    & validateName() 
    & validatePass() 
    & validateEmail() 
    & validateImage() 
    & validateLoaiND()
    & validateNgonNgu()
    & validateMoTa();

    if (!isValid) {
        return false;
    }
    return true;
}