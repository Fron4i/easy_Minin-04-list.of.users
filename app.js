let list = document.querySelector('#list')
let filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
	let value = event.target.value.toLowerCase()
	let filteredUsers = USERS.filter((user) => user.name.toLowerCase().includes(value))
	render(filteredUsers)
})

async function start() {
	list.innerHTML = 'Loading...'
	try {
		let resp = await fetch('https://jsonplaceholder.typicode.com/users')
		let data = await resp.json()
		setTimeout(() => {
		USERS = data
			render(data)
		}, 1300)
	} catch (err) {
		list.style.color = 'red'
		list.innerHTML = err.message
	}
}

function render(users = []) {
	if (users.length === 0) {
		list.innerHTML = "No matched users!"
	} else {
		let html = users.map(toHTML).join('')
		list.innerHTML = html
	}
}

function toHTML(user) {
	return `
	<li class="list-group-item"> ${user.name} </li>
	`
}

start()