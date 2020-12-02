import React, { useState } from 'react';
import "./../styles/App.css";

function App() {
	const [input, setInput] = useState("");
	const [editItem, setItem] = useState("");
	const [list, setList] = useState([]);
	const [editMode, setEditMode] = useState([]);
	function handleChange(evt) {
		setInput(evt.target.value);
	}
	function handleEdit(evt) {
		setItem(evt.target.value);
	}
	function addNewTask() {
		if (input.trim().length > 0) {
			const new_list = [...list];
			new_list.push(input.trim());
			console.log("new list", new_list);
			setList(new_list);
			const new_editMode = [...editMode, 0];
			setEditMode(new_editMode);
			setInput("");
			console.log("new edit mode array", new_editMode);
		}
	}
	function editor(index) {
		const new_editMode = [...editMode];
		new_editMode[index] = 1;
		setEditMode(new_editMode);
		setItem(evt.target.value);
	}
	function updateTask(index) {
		if (editItem.trim().length > 0) {
			const new_list = [...list];
			new_list[index] = editItem.trim();
			setList(new_list);
		}
		const new_editMode = [...editMode];
		new_editMode[index] = 0;
		setEditMode(new_editMode);
		// setItem("");
	}
	function deletion(index) {
		// console.log(index);
		const arr = list.filter((item, ind) => ind !== index);
		// console.log(`array after filtering ${arr}`);
		setList(arr);
		const new_editMode = editMode.filter((item, ind) => ind !== index);
		setEditMode(new_editMode);
	}
	return (
		<div id="main">
			<textarea id="task" onChange={handleChange} value={input}></textarea>
			<button id="btn" onClick={addNewTask} disabled={input.trim().length === 0}>Add</button>
			<ul>{
				list.map((item, ind) => {
					// console.log("within list.map",editMode[ind]===0,item,ind);
					return (editMode[ind] === 0) ?  // not editable
						(<li key={ind} className="list">
							<input type="text" value={item} disabled></input>
							<button className="edit" onClick={() => editor(ind)}>Edit</button>
							<button className="delete" onClick={() => deletion(ind)}>Delete</button>
						</li>)
						:
						(// setInput(item)
							<li key={ind} className="list">
								<textarea className="editTask" type="text" onChange={handleEdit}/>
								<button className="saveTask" onClick={() => updateTask(ind)} disabled={editItem.trim().length === 0}>Save</button>
							</li>)
				})
			}
			</ul>
		</div>
	);
}
export default App;
