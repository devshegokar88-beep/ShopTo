const WHATSAPP_NUMBER = '919763301074';
const money = n => Number(n||0).toLocaleString('en-IN');
const demoProducts = [
{id:'m1',name:'Premium Cotton T-Shirt',category:'men',price:499,oldPrice:999,rating:4.8,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',desc:'Soft cotton regular fit t-shirt'},
{id:'m2',name:'Slim Fit Formal Shirt',category:'men',price:799,oldPrice:1599,rating:4.7,image:'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',desc:'Office and party wear shirt'},
{id:'m3',name:'Classic Denim Jeans',category:'men',price:1199,oldPrice:2499,rating:4.6,image:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',desc:'Comfortable stretchable jeans'},
{id:'m4',name:'Casual Hoodie',category:'men',price:999,oldPrice:1999,rating:4.8,image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',desc:'Premium winter hoodie'},
{id:'w1',name:'Elegant Summer Dress',category:'women',price:899,oldPrice:1799,rating:4.8,image:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80',desc:'Stylish western dress'},
{id:'w2',name:'Trendy Women Top',category:'women',price:599,oldPrice:1199,rating:4.7,image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',desc:'Everyday fashion top'},
{id:'w3',name:'Designer Kurti',category:'women',price:749,oldPrice:1499,rating:4.9,image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80',desc:'Ethnic wear kurti'},
{id:'w4',name:'Casual Jacket',category:'women',price:1299,oldPrice:2599,rating:4.6,image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',desc:'Premium casual jacket'},
{id:'k1',name:'Cute Kids Outfit Set',category:'kids',price:699,oldPrice:1399,rating:4.9,image:'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=900&q=80',desc:'Comfortable kids outfit'},
{id:'k2',name:'Kids Cartoon T-Shirt',category:'kids',price:349,oldPrice:699,rating:4.7,image:'https://images.unsplash.com/photo-1519238359922-989348752efb?auto=format&fit=crop&w=900&q=80',desc:'Cartoon print t-shirt'},
{id:'k3',name:'Kids Party Dress',category:'kids',price:799,oldPrice:1599,rating:4.8,image:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',desc:'Party wear for kids'},
{id:'k4',name:'Kids Denim Set',category:'kids',price:899,oldPrice:1799,rating:4.6,image:'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80',desc:'Stylish denim set'}
];
function getProducts(){const added=JSON.parse(localStorage.getItem('shoptoProducts')||'[]');return [...demoProducts,...added.filter(p=>p.active!==false)]}
function getCart(){return JSON.parse(localStorage.getItem('shoptoCart')||'[]')}
function setCart(c){localStorage.setItem('shoptoCart',JSON.stringify(c));updateCartCount()}
function updateCartCount(){const el=document.getElementById('cartCount');if(el)el.textContent=getCart().reduce((s,i)=>s+i.qty,0)}
function discount(p){return Math.max(0,Math.round((1-p.price/p.oldPrice)*100))}
function productCard(p){return `<div class="card"><div class="picwrap"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80'"><span class="discount">${discount(p)}% OFF</span></div><div class="body"><div class="category">${p.category}</div><div class="pname">${p.name}</div><div class="rating">⭐ ${p.rating||4.8}</div><p style="color:#6b7280">${p.desc||'Premium fashion product'}</p><div class="price"><span class="old">₹${money(p.oldPrice)}</span><span class="new">₹${money(p.price)}</span></div><div class="actions"><button class="mini black" onclick='addToCart(${JSON.stringify(p)})'>ADD CART</button><button class="mini pink" onclick='buyNow(${JSON.stringify(p)})'>BUY NOW</button></div></div></div>`}
function addToCart(p){const c=getCart();const f=c.find(i=>i.id===p.id);if(f)f.qty++;else c.push({...p,qty:1});setCart(c);alert('Product cart me add ho gaya')}
function buyNow(p){addToCart(p);location.href='checkout.html'}
function loadHome(){const el=document.getElementById('featuredGrid');if(el)el.innerHTML=getProducts().slice(0,6).map(productCard).join('')}
function loadProducts(){const grid=document.getElementById('productsGrid');if(!grid)return;const params=new URLSearchParams(location.search);let cat=params.get('cat')||'men';let q=(document.getElementById('searchBox')?.value||'').toLowerCase();document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x.dataset.cat===cat));document.getElementById('categoryTitle').textContent=cat[0].toUpperCase()+cat.slice(1)+' Collection';let arr=getProducts().filter(p=>p.category===cat && (!q || p.name.toLowerCase().includes(q)));grid.innerHTML=arr.length?arr.map(productCard).join(''):'<div class="empty">No products found.</div>'}
function renderCart(){const wrap=document.getElementById('cartItems');if(!wrap)return;const cart=getCart();if(!cart.length){wrap.innerHTML='<div class="empty">Cart empty hai.</div>';document.getElementById('cartTotal').textContent='0';return}wrap.innerHTML=cart.map((i,idx)=>`<div class="cartrow"><img src="${i.image}"><div class="grow"><b>${i.name}</b><p>₹${money(i.price)} each</p><div class="qty"><button onclick="changeQty(${idx},-1)">-</button><b>${i.qty}</b><button onclick="changeQty(${idx},1)">+</button></div></div><button class="mini pink" onclick="removeCart(${idx})">Remove</button></div>`).join('');document.getElementById('cartTotal').textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0))}
function changeQty(i,d){const c=getCart();c[i].qty+=d;if(c[i].qty<=0)c.splice(i,1);setCart(c);renderCart();renderCheckout()}
function removeCart(i){const c=getCart();c.splice(i,1);setCart(c);renderCart();renderCheckout()}
function renderCheckout(){const el=document.getElementById('checkoutSummary');if(!el)return;const cart=getCart();el.innerHTML=cart.length?cart.map(i=>`<div class="productitem"><b>${i.name}</b><p>₹${money(i.price)} x ${i.qty}</p></div>`).join(''):'<p>Cart empty hai</p>';document.getElementById('checkoutTotal').textContent=money(cart.reduce((s,i)=>s+i.price*i.qty,0))}
function placeOrder(e){e.preventDefault();const cart=getCart();if(!cart.length){alert('Cart empty hai');return}const name=document.getElementById('customerName').value.trim(),mobile=document.getElementById('customerMobile').value.trim(),address=document.getElementById('customerAddress').value.trim(),pin=document.getElementById('customerPincode').value.trim();if(!name||!mobile||!address){alert('Customer details bharo');return}const total=cart.reduce((s,i)=>s+i.price*i.qty,0);const order={id:'ST'+Date.now(),name,mobile,address,pin,total,items:cart,date:new Date().toLocaleString()};const orders=JSON.parse(localStorage.getItem('shoptoOrders')||'[]');orders.unshift(order);localStorage.setItem('shoptoOrders',JSON.stringify(orders));const items=cart.map(i=>`${i.name} - Rs.${i.price} x ${i.qty}`).join('\n');const msg=`🛍️ NEW ORDER - SHOPTO\nOrder: ${order.id}\n\n${items}\n\nTotal: Rs.${total}\n\nCustomer: ${name}\nMobile: ${mobile}\nAddress: ${address}\nPincode: ${pin}`;localStorage.removeItem('shoptoCart');updateCartCount();location.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}

async function payOnline(){
  const cart=getCart();
  if(!cart.length){alert('Cart empty hai');return}
  const name=document.getElementById('customerName').value.trim();
  const mobile=document.getElementById('customerMobile').value.trim();
  const address=document.getElementById('customerAddress').value.trim();
  const pin=document.getElementById('customerPincode').value.trim();
  if(!name||!mobile||!address){alert('Payment se pehle customer name, mobile aur address bharo');return}
  if(typeof Razorpay==='undefined'){
    alert('Razorpay script load nahi hua. Internet check karo aur page refresh karo.');
    return;
  }
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const btn=document.getElementById('payOnlineBtn');
  if(btn){btn.disabled=true;btn.textContent='Opening Razorpay...'}
  try{
    const options={
      key:'rzp_live_T4dSCa20CpZegQ',
      amount:Math.round(total*100),
      currency:'INR',
      name:'ShopTo',
      description:cart.map(i=>i.name+' x '+i.qty).join(', '),
      prefill:{name:name,contact:mobile},
      notes:{address:address,pincode:pin,items:cart.map(i=>i.name+' x '+i.qty).join(', ')},
      theme:{color:'#ec4899'},
      handler:function(response){
        const order={id:'ST'+Date.now(),name,mobile,address,pin,total,items:cart,date:new Date().toLocaleString(),paymentId:response.razorpay_payment_id,status:'paid'};
        const orders=JSON.parse(localStorage.getItem('shoptoOrders')||'[]');
        orders.unshift(order);
        localStorage.setItem('shoptoOrders',JSON.stringify(orders));
        localStorage.removeItem('shoptoCart');
        updateCartCount();
        alert('Payment successful! Order placed. Payment ID: '+response.razorpay_payment_id);
        location.href='index.html';
      },
      modal:{ondismiss:function(){ if(btn){btn.disabled=false;btn.textContent='Pay Online with Razorpay'} }}
    };
    const rzp=new Razorpay(options);
    rzp.on('payment.failed',function(resp){alert('Payment failed: '+(resp.error.description||'Please try again'));});
    rzp.open();
  }catch(err){
    console.error(err);
    alert('Razorpay payment start nahi hua: '+err.message);
  }finally{
    if(btn){btn.disabled=false;btn.textContent='Pay Online with Razorpay'}
  }
}

function adminInit(){const f=document.getElementById('adminProductForm');if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();const p={id:'p'+Date.now(),name:adminName.value.trim(),category:adminCategory.value,price:Number(adminPrice.value),oldPrice:Number(adminOldPrice.value),image:adminImage.value.trim(),desc:adminDesc.value.trim(),rating:4.8,active:true};const arr=JSON.parse(localStorage.getItem('shoptoProducts')||'[]');arr.unshift(p);localStorage.setItem('shoptoProducts',JSON.stringify(arr));alert('Product add ho gaya');f.reset();renderAdminProducts()});renderAdminProducts();renderOrders()}
function renderAdminProducts(){const el=document.getElementById('adminProducts');if(!el)return;const arr=JSON.parse(localStorage.getItem('shoptoProducts')||'[]');el.innerHTML=arr.length?arr.map((p,i)=>`<div class="productitem"><b>${p.name}</b><p>${p.category} - ₹${p.price}</p><button class="mini pink" onclick="delAdminProduct(${i})">Delete</button></div>`).join(''):'<p>No custom products yet.</p>'}
function delAdminProduct(i){const arr=JSON.parse(localStorage.getItem('shoptoProducts')||'[]');arr.splice(i,1);localStorage.setItem('shoptoProducts',JSON.stringify(arr));renderAdminProducts()}
function renderOrders(){const el=document.getElementById('adminOrders');if(!el)return;const orders=JSON.parse(localStorage.getItem('shoptoOrders')||'[]');el.innerHTML=orders.length?orders.map(o=>`<div class="orderitem"><b>${o.name}</b><p>₹${money(o.total)} - ${o.mobile}</p><small>${o.items.map(i=>i.name).join(', ')}</small></div>`).join(''):'<p>No orders yet.</p>'}
function protectAdmin(){if(location.pathname.includes('admin')){const ok=sessionStorage.getItem('adminOK')||prompt('Admin password:');if(ok!=='1234'){alert('Wrong password');location.href='index.html'}else sessionStorage.setItem('adminOK','1234')}}
protectAdmin();updateCartCount();loadHome();loadProducts();renderCart();renderCheckout();adminInit();
