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