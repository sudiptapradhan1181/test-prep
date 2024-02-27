// fetch('https://reqres.in/api/users')
// .then(res => res.json())
// .then(data => console.log(data))


(async function fetchApi() {
    const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers:{ 
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
         'name': 'User 1'
        })
    })
    const data = await response.json()
    console.log(data)
})() 
