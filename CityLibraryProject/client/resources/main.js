


function displayHomePage(){
    document.getElementById('homepg').style.display = ''
    document.getElementById('aboutus').style.display = 'none';
    document.getElementById('book').style.display = 'none';
    document.getElementById('btn-virtual').style.display = 'none';
    document.getElementById("display-booklist").style.display ='none'
}

function noDisplay(){
    document.getElementById('homepg').style.display = 'none'
    document.getElementById('aboutus').style.display = 'none';
    document.getElementById('book').style.display = 'none';
    document.getElementById('btn-virtual').style.display = 'none';

}

window.onload = function(){
    displayHomePage();

    document.getElementById('nav-home').onclick = ()=>{
        displayHomePage()
    };
   
    document.getElementById('nav-virtual').onclick = ()=>{
        document.getElementById('homepg').style.display = 'none';
        document.getElementById('aboutus').style.display = 'none';
        document.getElementById("display-booklist").style.display ='none'
        document.getElementById('btn-virtual').style.display = '';

    };


    document.getElementById('nav-about').onclick = ()=>{
    document.getElementById('homepg').style.display = 'none';
    document.getElementById('btn-virtual').style.display = 'none';
    document.getElementById("display-booklist").style.display ='none'
    document.getElementById('aboutus').style.display = '';
    
    
   }

   //book onload page 
//    document.getElementById("nav-book").onclick = ()=>{
//        noDisplay();
//        document.getElementById('book').style.display = '';

//    }

   document.getElementById('nav-book').onclick = function(event){
       event.preventDefault();
       noDisplay();
       document.getElementById('display-booklist').style.display = ''
       getAllBooks()
       
    }
    
    document.getElementById('addbookBtn').onclick = function(event){
        event.preventDefault();
        document.getElementById('missInfo').innerText = "";
        document.getElementById('homepg').style.display = 'none'
        document.getElementById('display-booklist').style.display = 'none';
        document.getElementById('book').style.display = '';
        
    }
    document.getElementById('submitbook-btn').onclick = function(event){
        event.preventDefault();
        const submitId = this.dataset.id;
        const bNo = document.getElementById('bNo').value;
        const isbn = document.getElementById('isbn').value;
        const title = document.getElementById('title').value;
        const publisher = document.getElementById('publisher').value;
        const datePublished =document.getElementById('datePublished').value
        const overdue =document.getElementById('overdue').value;
        if(submitId){
            console.log("Update")
            fetch('http://localhost:3000/books/'+submitId,{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bNo :bNo,
                    isbn: isbn,
                    bookTitle : title,
                    publisher : publisher,
                    datePublished : datePublished,
                    overdueFee : overdue,
                })
                
            })
            .then(data => data.json())
            .then(updateBook =>{
                console.log(updateBook)
                document.getElementById('missInfo').innerText = `Successfully Updated`;
                document.getElementById("product-form").reset();
                document.getElementById('submitbook-btn').dataset.id ='';
            })
            

        }else{
        addNewBook()
        }
    }
      

}


//****functions for displaying book  *****start//

async function getAllBooks(){
    const tBody = document.getElementById('booklist-body'); // to refresh and reload in the table
    tBody.innerText = "";
    
    let books = await fetch('http://localhost:3000/books',{
    }).then(response => response.json());
     console.log(books)
     const tableBody = document.getElementById('booklist-body');
     books.forEach(book =>renderBookInTable(tableBody, book))
}

function renderBookInTable(tableBody, book){
    const tr = document.createElement('tr');        //<tr> creates table row
    const bNoTd = document.createElement('td');   //<td> </td> table data cell
    bNoTd.textContent = book.bNo;                   //<td>123</td>
    tr.appendChild(bNoTd);

    const isbn= document.createElement('td');
    isbn.textContent =book.isbn;
    tr.appendChild(isbn)

    const bookTitle = document.createElement('td');
    bookTitle.textContent= book.bookTitle;
    tr.appendChild(bookTitle);

    const publisher = document.createElement('td');
    publisher.textContent= book.publisher;
    tr.appendChild(publisher)

    const datePublished= document.createElement('td');
    datePublished.textContent= book.datePublished;
    tr.appendChild(datePublished)

    const overdue = document.createElement('td');
    overdue.textContent= book.overdueFee;
    tr.appendChild(overdue)

    const actionTd = document.createElement('td');
    const updateBtn = document.createElement('button');
    updateBtn.classList ='btn btn-secondary';
    updateBtn.textContent = 'UPDATE';
    updateBtn.dataset.id = book.bNo;
    actionTd.appendChild(updateBtn);
    
    tr.appendChild(actionTd)

    updateBtn.addEventListener('click', function(){
        fetch('http://localhost:3000/books/'+ book.bNo)
        .then(data => data.json())
        .then(data => {
            console.log(data);
        document.getElementById('product-heading').textContent = "Edit Book";
        document.getElementById('bNo').value = book.bNo;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('title').value = book.bookTitle;
        document.getElementById('publisher').value = book.publisher;
        document.getElementById('datePublished').value = book.datePublished;
        document.getElementById('overdue').value = book.overdueFee;
        document.getElementById('submitbook-btn').dataset.id = book.bNo;
        })
        document.getElementById('book').style.display = '';

        })

        tableBody.appendChild(tr)
       
        
        
    }


    // ***************function for display book ************* end//

    //addnewBook function****//
    function addNewBook(){
        document.getElementById('missInfo').innerText = "none";
       // document.getElementById('submitbook-btn')
        const bNo = document.getElementById('bNo').value;
        const isbn = document.getElementById('isbn').value;
        const title = document.getElementById('title').value;
        const publisher = document.getElementById('publisher').value;
        const datePublished =document.getElementById('datePublished').value
        const overdue =document.getElementById('overdue').value;


        fetch('http://localhost:3000/books', {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bNo :bNo,
                isbn: isbn,
                bookTitle : title,
                publisher : publisher,
                datePublished : datePublished,
                overdueFee : overdue,
            })           
            }).then(data => data.json())   //add  new book on table body
            .then(book => {
                console.log(book);
                if(book.Error){
                document.getElementById('missInfo').innerText = book.Error;
                } else {
                document.getElementById('missInfo').innerText ='';
                document.getElementById("product-form").reset();
                renderBookInTable(document.getElementById('booklist-body'), book) 
                document.getElementById('missInfo').innerText = `Successfully Added:- { Book No: ${book.bNo}, ISBN:${book.isbn}} book.`
                }
        })
    }




    



