import React from 'react';

function TodoHeader({ isCompleteScreen, setIsCompleteScreen }) {
  return (
    <div className="btn-area">
      <button
        className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
        onClick={() => setIsCompleteScreen(false)}
      >
        Todo
      </button>
      <button
        className={`secondaryBtn ${isCompleteScreen && 'active'}`}
        onClick={() => setIsCompleteScreen(true)}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoHeader;
