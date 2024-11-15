import React from 'react';

function TodoHeader({ isCompleteScreen, setIsCompleteScreen }) {
  return (
    <div className="btn-area">
      <button
        className={`secondaryBtn-1 ${!isCompleteScreen && 'active'}`}
        onClick={() => setIsCompleteScreen(false)}
      >
        Todo
      </button>
      <button
        className={`secondaryBtn-2 ${isCompleteScreen && 'active'}`}
        onClick={() => setIsCompleteScreen(true)}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoHeader;
