//Lấy dữ liệu từ server về
function apiGetProducts(searchTerm){
    return axios({
        url: "https://630b4fe4f280658a59d969e9.mockapi.io/products",
        method: "GET",
        params:{
            name: searchTerm
        },
    });
}

function apiAddProduct(product){
    return axios({
        url : "https://630b4fe4f280658a59d969e9.mockapi.io/products",
        method: "POST",
        data: product,
    });
}

function apiDeleteProduct(productId){
    return axios({
        url: `https://630b4fe4f280658a59d969e9.mockapi.io/products/${productId}`,
        method: "DELETE",
    })
}

function apiGetProductById(productId){
    return axios({
        url: `https://630b4fe4f280658a59d969e9.mockapi.io/products/${productId}`,
        method: "GET",
    })
}

function apiUpdateProduct(productId, product){
    return axios({
        url: `https://630b4fe4f280658a59d969e9.mockapi.io/products/${productId}`,
        method: "PUT",
        data: product
    });
}