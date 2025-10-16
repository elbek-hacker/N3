const books = [
    { id: 101, title: "Alisher Navoiy She'rlari", author: "Alisher Navoiy", year: 1483 },
    { id: 102, title: "O'tgan Kunlar", author: "Abdulla Qodiriy", year: 1925 },
    { id: 103, title: "Shaytanat", author: "Tohir Malik", year: 1994 }
];

function create(title, author, year){
    let newBook = {};
    if (books.length === 0){
        newBook = {id: 101, title, author, year};
    } else{
        newBook = {id: books.at(-1)?.id + 1, title, author, year};
    }
    books.push(newBook);
    console.log(books);
}
create("MEN", "Fotih Duman", 2022)

// function readAllBooks(){
//     console.log(books);
// }
// readAllBooks()

// function updateBookYear(id, newYear){
//     const index = books.findIndex(book => book?.id === id);
//     if(index === -1){
//         console.log("Yangilash uchun kitob topilmadi!")
//     } else {
//         books[index].year = newYear;
//     }
//     console.log(books);
// }
// updateBookYear(102, 2003);


// function deleteBook(id){
//     const index = books.findIndex(book => book?.id === id);
//     if (index === -1){
//         console.log("O'chirish uchun kitob topilmadi!");
//     } else {
//         books.splice(index, 1);
//     }
//     console.log(books);
// }

// deleteBook(101)