const normalizeProduct=product=>({...product,image:product.imageUrl?`http://localhost:8080${product.imageUrl}`:"",weight:product.weight||""});
export const products=[];
export async function getProducts(){const response=await fetch("http://localhost:8080/api/products");if(!response.ok)throw new Error("Catalog unavailable");return (await response.json()).map(normalizeProduct);}
export async function getProduct(productId){const response=await fetch(`${api}/products/${productId}`);if(!response.ok)throw new Error("Product unavailable");return normalizeProduct(await response.json());}
export async function getCategories(){const response=await fetch("http://localhost:8080/api/categories");if(!response.ok)throw new Error("Categories unavailable");return response.json();}
const api="http://localhost:8080/api";
export async function getOrders(){const response=await fetch(`${api}/orders`);if(!response.ok)throw new Error("Orders unavailable");return response.json();}
export async function getMyOrders(){const customer=JSON.parse(localStorage.getItem("customer")||"null");if(!customer?.token)return [];const response=await fetch(`${api}/orders/mine`,{headers:{Authorization:`Bearer ${customer.token}`}});if(!response.ok)throw new Error("Could not load your orders");return response.json();}
export async function getOrder(orderNumber){const response=await fetch(`${api}/orders/${orderNumber}`);if(!response.ok)throw new Error("Order not found");return response.json();}
export async function createOrder(order){const response=await fetch(`${api}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});if(!response.ok)throw new Error("Could not create order");return response.json();}
export async function completePayment(orderNumber,method){const response=await fetch(`${api}/orders/${orderNumber}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({method})});if(!response.ok)throw new Error("Payment could not be completed");return response.json();}
export async function getContent(key){const response=await fetch(`${api}/content/${key}`);if(!response.ok)throw new Error("Content unavailable");return response.json();}
export async function getFarms(){const response=await fetch(`${api}/farms`);if(!response.ok)throw new Error("Farms unavailable");return response.json();}
export async function submitSellerApplication(data){const response=await fetch(`${api}/seller-applications`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});if(!response.ok)throw new Error("Could not submit your farm application");return response.json();}
export async function getDeliveryQuote(pincode,subtotal){const response=await fetch(`${api}/delivery-zones/quote?pincode=${encodeURIComponent(pincode)}&subtotal=${subtotal}`);if(!response.ok)throw new Error("Delivery is not available for this pincode");return response.json();}
export async function getMapsConfig(){const response=await fetch(`${api}/maps/config`);if(!response.ok)throw new Error("Map configuration unavailable");return response.json();}
export async function getNotifications(email){const response=await fetch(`${api}/notifications?email=${encodeURIComponent(email)}`);if(!response.ok)throw new Error("Notifications unavailable");return response.json();}
export async function markNotificationRead(id){const response=await fetch(`${api}/notifications/${id}/read`,{method:"PATCH"});if(!response.ok)throw new Error("Could not update notification");return response.json();}
export async function registerUser(user){const response=await fetch(`${api}/users/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)});if(!response.ok)throw new Error((await response.text())||"Could not create account");return response.json();}
export async function loginUser(email,password){const response=await fetch(`${api}/users/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});if(!response.ok)throw new Error("Invalid email or password");return response.json();}
export async function getRazorpayConfig() {const response=await fetch(`${api}/payment/config`);if(!response.ok)throw new Error("Online payments are unavailable");return response.json();}
export async function createRazorpayOrder(amount,orderNumber) {

    const response = await fetch(
        `${api}/payment/create-order`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount,
                orderNumber
            })
        }
    );

    if (!response.ok)
        throw new Error("Unable to create Razorpay order");

    return response.json();
}

export async function verifyPayment(data) {

    const response = await fetch(
        `${api}/payment/verify`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok)
        throw new Error("Payment verification failed");

    return response.json();
}

const adminHeaders=()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("admin_token")||""}`});
async function adminRequest(path,options={}){const response=await fetch(`${api}/admin${path}`,{...options,headers:{...adminHeaders(),...(options.headers||{})}});if(!response.ok)throw new Error((await response.text())||"Admin request failed");return response.status===204?null:response.json();}
export async function adminLogin(email,password){const response=await fetch(`${api}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});if(!response.ok)throw new Error("Invalid email or password");return response.json();}
export async function registerAdmin(data){const response=await fetch(`${api}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});if(!response.ok)throw new Error((await response.text())||"Could not create administrator account");return response.json();}
export const getAdminDashboard=()=>adminRequest("/dashboard"); export const getAdminProducts=()=>adminRequest("/products"); export const saveAdminProduct=(product)=>adminRequest(`/products${product.id?`/${product.id}`:""}`,{method:product.id?"PUT":"POST",body:JSON.stringify(product)}); export const archiveAdminProduct=id=>adminRequest(`/products/${id}`,{method:"DELETE"});
export const getAdminAnalytics=()=>adminRequest("/analytics");
export const getAdminCustomers=()=>adminRequest("/customers");
export const getAdminFarms=()=>adminRequest("/farms"); export const saveAdminFarm=farm=>adminRequest(`/farms${farm.id?`/${farm.id}`:""}`,{method:farm.id?"PUT":"POST",body:JSON.stringify(farm)});
export const getSellerApplications=()=>adminRequest("/seller-applications"); export const reviewSellerApplication=(id,data)=>adminRequest(`/seller-applications/${id}`,{method:"PATCH",body:JSON.stringify(data)});
export const getDeliveryZones=()=>adminRequest("/delivery-zones"); export const saveDeliveryZone=zone=>adminRequest(`/delivery-zones${zone.id?`/${zone.id}`:""}`,{method:zone.id?"PUT":"POST",body:JSON.stringify(zone)});
export const getAdminCategories=()=>adminRequest("/categories"); export const saveAdminCategory=category=>adminRequest(`/categories${category.id?`/${category.id}`:""}`,{method:category.id?"PUT":"POST",body:JSON.stringify(category)}); export const getAdminOrders=q=>adminRequest(`/orders${q?`?q=${encodeURIComponent(q)}`:""}`); export const updateAdminOrder=(number,data)=>adminRequest(`/orders/${number}`,{method:"PATCH",body:JSON.stringify(data)}); export const getAdminContent=key=>adminRequest(`/content/${key}`); export const saveAdminContent=(key,value)=>adminRequest(`/content/${key}`,{method:"PUT",body:JSON.stringify({key,value})});
export async function uploadAdminImage(file){const body=new FormData();body.append("file",file);const response=await fetch(`${api}/uploads`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("admin_token")||""}`},body});if(!response.ok)throw new Error("Image upload failed. Use JPEG, PNG, or WebP under 5 MB.");return response.json();}
