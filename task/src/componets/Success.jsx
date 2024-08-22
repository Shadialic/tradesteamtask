import React from 'react';

function Success({setSuccess}) {
    setTimeout(()=>{
        setSuccess(false)
    },3000)
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Thank You</h1>
    </div>
  );
}

export default Success;
