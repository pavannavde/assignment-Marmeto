const leftBox = document.getElementById('leftBox');
const rightBox = document.getElementById('rightBox');

//fetching the data
async function getData(){
    const res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json');
    const data = await res.json();
    console.log(data.product);
    const productData = data.product;
    renderProduct(productData);
}
getData()
let count=1;
let size='Small';
let color='Yellow';

 //count increase and decrease function
 function countFun(para,product){
    if(para=='dec' && count>1)
    {
        count-=1;
    }
    else if(para =='inc'){
        count+=1;
    }
    renderProduct(product);
 }

 // calculate discount
 function discountFun(product){
    const price = Number(product.price.substring(1));
    const compare_at_price = Number(product.compare_at_price.substring(1));
    const discount = (compare_at_price-price)/compare_at_price*100;
    return Math.floor(discount);
 }

 //adding to cart function
 function addToCart(product){
    renderProduct(product);

    const msg = document.getElementById('msg');
    msg.style.display='block';
 }


 // rendering the product data
function renderProduct(product){
     rightBox.innerHTML='';
    // titleDiv
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    const pTag = document.createElement('p');
    pTag.classList.add('pTag');
    pTag.innerText = product.vendor;
    const h2 = document.createElement('h2');
    h2.innerText = product.title;
    titleDiv.appendChild(pTag);
    titleDiv.appendChild(h2);
    rightBox.appendChild(titleDiv);

    //priceDiv
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('priceDiv');
    priceDiv.innerHTML = `<div>
    <h2>${product.price}</h2>
    <span>${discountFun(product)}%</span>
   </div>
   <p>${product.compare_at_price}</p>`;
   rightBox.appendChild(priceDiv);

   //colorDiv
   const colorDiv = document.createElement('div');
   colorDiv.classList.add('colorDiv');
   colorDiv.innerHTML = `<p class="pTag">Choose a Color</p>
   <div>
     <div style="background-color:${product.options[0].values[0].Yellow};" name='color' onclick='setColor("Yellow")'><img src="assets/vector.png" alt='mark'/></div>
     <div style="background-color:${product.options[0].values[1].Green};" name='color' onclick='setColor("Green")'><img src="assets/vector.png" class='hide' alt='mark'/></div>
     <div style="background-color:${product.options[0].values[2].Blue};" name='color' onclick='setColor("Blue")'><img src="assets/vector.png" class='hide'alt='mark'/></div>
     <div style="background-color:${product.options[0].values[3].Pink};" name='color' onclick='setColor("Pink")'><img src="assets/vector.png" class='hide' alt='mark'/></div>
   </div>`;
   rightBox.appendChild(colorDiv);

   //sizeDiv
   const sizeDiv = document.createElement('div');
   sizeDiv.classList.add('sizeDiv');
   sizeDiv.innerHTML = `<p class="pTag">Choose a Size</p>
   <div class="radioBtns">
    ${product.options[1].values.map((value) => `<div>
    <input type="radio" name="size" value="${value}" onclick='setSize("${value}")'/>
    <label for="size">${value}</label>
    </div>`).join('')}
   </div>`
   const btns = document.createElement('div');
   btns.classList.add('btns');
   const countDiv = document.createElement('div');
   countDiv.classList.add('count');
   const p1 = document.createElement('p');
   p1.innerText = '-';
   p1.addEventListener('click',()=>{countFun('dec',product)});
   const p2 = document.createElement('p');
   p2.innerText = count;
   const p3 = document.createElement('p');
   p3.innerText = '+';
   p3.addEventListener('click', ()=>{countFun('inc',product)});
   countDiv.append(p1,p2,p3);
   const btn = document.createElement('button');
   btn.innerHTML = '<img src="assets/Frame.png" alt="cartImg"/>Add To Cart';
   btn.addEventListener('click', ()=>{addToCart(product)});
   btns.append(countDiv, btn);
   sizeDiv.appendChild(btns);
   const msg = document.createElement('p');
   msg.classList.add('msg');
   msg.setAttribute('id', 'msg');
   msg.innerText = `${product.title} with color ${color} and size ${size} added to cart`;
   sizeDiv.appendChild(msg);
//  <p class="msg">Embrace Sideboard with color yellow and size Small added to cart</p>`;
  rightBox.appendChild(sizeDiv);

//discriptiondiv
  const discriptionDiv = document.createElement('p');
  discriptionDiv.classList.add('discription');
  discriptionDiv.innerHTML= product.description;
  rightBox.appendChild(discriptionDiv);

}

function setSize(value){
    console.log(value);
    size = value;
}

function setColor(value){
    console.log(value);
    color = value;
}