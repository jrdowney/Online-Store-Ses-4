// Global variables

// var items=[
//     {   // first item
//         code:'1tvs',
//         title:'TV Samsung',
//         price:1000,
//         description:'This is a long description of the item',
//         category:'Electronics',
//         image:'https://images.samsung.com/is/image/samsung/pe-fhdtv-j5290-un49j5290agxpe-frontblack-113108078?$PD_GALLERY_L_JPG$'
//     },
//     {   //second item
//         code:'1ph10',
//         title:'iphone',
//         price:1000,
//         description:'This is a long description of the item',
//         category:'Mobile device',
//         image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MRWM2_AV1_GOLD_GEO_MX?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1536254549811'
//     },
//     {   // third item
//         code:'2spk',
//         title:'Speakers',
//         price:100,
//         description:'This is a long description of the item',
//         category:'Sound',
//         image:'https://cdn.audioaffair.co.uk/media/catalog/product/cache/1/image/1000x1000/602f0fa2c1f0d1ba5e241f914e856ff9/1/0/100_-_black.jpg'
//     }
// ];

var items=[];
var serverURL="http://restclass.azurewebsites.net/API/";

function fetchCatalog(){
    // get items from the server
    $.ajax({
        url:serverURL+"points",
        type:"GET",
        success:function(res){
            console.log("It works",res);
            for(let i=0;i<res.length;i++) {
                if (res[i].user=="Jonathan") {
                  items.push(res[i]);  
                }
                
            }
            displayCatalog();
        },
        error:function(details){
            console.log("Error",details);
        }
    });
}

function displayCatalog(){
    //travel the items array
    for(var i=0;i<items.length;i++){
    //get the element from the array
        var product=items[i];
    //create the string
        drawItem(product);
    }
}

function drawItem(product){
    var layout=`
    <div class="item" id="${product.code}">
        <img src="${product.image}">
        <h4> ${product.title}</h4>
        <h6 class="itemPrice"> $ ${product.price}</h6>
        <p> ${product.description} </p>
        <button class="btn btn-primary"> Add to Cart </button>
    </div>
    `;
    
//display the element on the DOM (HTML)
$('#catalog').append(layout);
}

function search(){
    
    var searchText=$("#txt-search").val();
    $("#catalog").html("");
    for(var i=0;i<items.length;i++){
        var item=items[i];
        if (item.title.toLowerCase().includes(searchText.toLowerCase()) || (item.description.toLowerCase().includes(searchText.toLowerCase()))){
            drawItem(item)
        }
    }
    
    $("#txt-search").val("");// clear the input
       
}


// initialization
function init(){

    console.log('catalog page');
    fetchCatalog();

    $("#btn-search").click(search);

    $("#txt-search").keypress(function(e){

        if (e.key==="Enter") {
            
            search();
        }
    });
}

window.onload=init;