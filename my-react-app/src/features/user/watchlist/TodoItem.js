import React from 'react';
import "./watchlist.css";
function TodoItem({ stockname, stockcost, deleteStock}) {
 return (
 <div className="todo-item">
<p>Artist Name: {stockname}</p>
<p>Cost: {stockcost}</p>
<button onClick={() => deleteStock(stockname)}>
 X
 </button>
 </div>
 );
}
export default TodoItem;