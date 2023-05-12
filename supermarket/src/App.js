import React from 'react'

function App() {

  const [itemsInPersonCart, setItemsInPersonCart] = React.useState();
  // const [label, setLabel] = React.useState([["Queue 1"], ["Queue 2"],["Queue 3"],["Queue 4"],["Queue 5"],["Queue 6"],])
  const [queues, setQueues] = React.useState([[1,5,8],[1,2],[1],[2,4],[1]]);
  
  // const labels = label.map( name => {
  //   return(
  //       <div className='flex'>{name}</div>
  //     )
  //   });

  const totalQueues = queues.map((queue, idx) => {
    return(
      <div>
        <ul key={idx}>
          {queue.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
      </div>
      
      )
    })

  function handleAddToQueue(event){
    let queueWithLeastItems;
    let leastItemsAmount = 1e9;

    event.preventDefault();
    for(let queue of queues){
      //Here we are checking all the queues to see the one with the least number of items
      //to do that we use the reduce(() => ()) to find the total in each queue
      const totalInLine = queue.reduce((sum, value) => sum + value,0);
      
      if(totalInLine < leastItemsAmount){
        leastItemsAmount = totalInLine;
        queueWithLeastItems = queue;
      }
    }
    //TODO: loop through all the queues and find the queue with the least 
    //items in persons cart
    
    setQueues(prevQueues => prevQueues.map((queue) =>
      queue === queueWithLeastItems ? [...queue,itemsInPersonCart] : queue
    ))
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setQueues(prevQueues => prevQueues.map((queue) => (
        [queue[0] - 1, ...queue.slice(1)].filter((value) => value > 0)
      )))
    }, 2000);

    return () => {
      clearInterval(interval)
    }
   
  },[])

  return (
    <div className="flex flex-col gap-[20px] items-center justify-center py-40">
        <form className='space-x-6' onSubmit={handleAddToQueue}>
          <input
            type='number'
            className='border-solid border-2 border-indigo-600 rounded-full indent-3'
            placeholder='items in cart'
            onChange={e => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
            value={itemsInPersonCart}
           />
          <button className='bg-indigo-600 text-white py-1 px-2 rounded-full'>checkout</button>
        </form>

        <div className='grid grid-cols-5 gap-[60px]'>
          {totalQueues}
        </div>
    </div>
  );
}

export default App;
