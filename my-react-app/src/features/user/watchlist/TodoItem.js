import React from 'react';
function TodoItem({ stock, deleteStock}) {
 
 return (
 <div className="todo-item">
<p>{stock}</p>
<button onClick={() => deleteStock(stock)}>
 X
 </button>
 </div>
 );
}
export default TodoItem;