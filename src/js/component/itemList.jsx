import React from "react";



const ItemList = (props) => {
	return (
        props.list.map((item) => {
            return (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                    <span>{item.label}</span>
                    <button className="btn btn-danger" onClick={() => props.delete(item)}> X </button>
                </li>
            )
        })
	);
};

export default ItemList;