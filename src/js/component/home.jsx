import React, { useEffect, useState } from "react";

import ItemList from "./itemList";

const Home = () => {

	const [itemList, setItemList] = useState({
  	"label": "",
  	"is_done": false
})
	const [list, setList] = useState([])

	async function getList() {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/uAngelsalcedo")
			const data = await response.json()
			console.log(data.todos);
			setList(data.todos)
		} catch (error) {
			console.log(error);
		}
	}
	
	async function handleSubmmit(e) {
		e.preventDefault() 
		const response = await fetch("https://playground.4geeks.com/todo/todos/uAngelsalcedo", {
			method:"POST", 
			body: JSON.stringify(itemList),
			headers: {
				'Content-Type':'application/json'
			}
		})

		if (response.ok) {
			getList();
		} else {
			alert("error al crear")
		}
	}

	async function deletItemList(elemt) {
		const response = await fetch("https://playground.4geeks.com/todo/todos/" + `${elemt.id}`,{
			method:"DELETE",
		}
		)
		if (response.ok) {
			getList();
			
		} else {
			alert("No se pudo eliminar")
		}
	}

	function addListItem(e) {
		setItemList({...itemList,[e.target.name]:e.target.value})

	}

	useEffect(() =>{
		getList()
	},[])


	return (
		<div className="text-center container">
			<div className="card">
				<div className="card-header">
					<h1 className="fs-1 opacity-25">Todos</h1>
				</div>
				<form onSubmit={(event) => handleSubmmit(event)}>
					<input name="label" value={itemList.label} onChange={(e) => addListItem(e)} placeholder="Nueva Tarea"></input>
				</form>
				<ul className="list-group list-group-flush">
					<ItemList delete={deletItemList} list={list} />
				</ul>
			</div>
		</div>
	);
};

export default Home;