// GET
// fetch('https://68ecf633eff9ad3b1403fe5b.mockapi.io/users/users')
//     .then( res => res.json())
//     .then( data => console.log(data))
//     .catch( err => console.log('Error on get users', err))

// GET by ID
// fetch('https://68ecf633eff9ad3b1403fe5b.mockapi.io/users/users/1')
//     .then( res => res.json())
//     .then( data => console.log(data))
//     .catch( err => console.log('Error on get user by ID', err))

// POST
// fetch('https://68ecf633eff9ad3b1403fe5b.mockapi.io/users/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({id: 11, name: 'Eshmat'})
// })
//     .then( res => res.json())
//     .then( data => console.log(data))
//     .catch( err => console.log('Error on Creating user', err))

// PUT
// fetch('https://68ecf633eff9ad3b1403fe5b.mockapi.io/users/users/11', {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({name: 'Toshmat'})
// })
//     .then( res => res.json())
//     .then( data => console.log(data))
//     .catch( err => console.log('Error on Updating user', err))

// DELETE
// fetch('https://68ecf633eff9ad3b1403fe5b.mockapi.io/users/users/11', {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch( err => console.log('Error on Deleting user', err))