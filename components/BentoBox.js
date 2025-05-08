import React from 'react'

const BentoBox = () => {
    return(
      <div className='py-10'>
      <div className='container mx-auto py-10 bg-white rounded-3xl'>
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
                <div className="row-span-2 border-4 border-black">
                  <div className='bg-[#ff5555] w-[full] h-full'>
                    <p>BENTO BOX</p>
                  </div>
                </div>
            <div className="col-span-2 border-4 border-black">6</div>
            <div className="row-span-2 col-start-4 border-4 border-black">7</div>
            <div className="col-span-2 row-span-2 col-start-2 row-start-2">
              <div className='bg-black w-full h-full'>
                <p className='text-white'>BENTO BOX</p>
              </div>
            </div>
            <div className="row-start-3 border-4 border-black">9</div>
            <div className="col-span-2 col-start-1 row-start-4 border-4 border-black">10</div>
            <div className="col-start-3 row-start-4 border-4 border-black">11</div>
            <div className="row-span-2 col-start-4 row-start-3 border-4 border-black">12</div>
        </div>
      </div>
      </div>
    )
}

export default BentoBox