import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <section className='event'>
        <div className='flex flex-col gap-3'>
            <h1></h1>
            <p></p>
            <div>
                <Image src="" alt="" width={600} height={400} className="event-image" />
                <div>
                    <h2>Book Your Spot</h2>
                    <form>
                        <label 
                            htmlFor="name">Name:
                            <input type="text" id="name" name="name" required />
                        </label>
                        <button type="submit">Book Now</button>
                    </form>
                </div>
            </div>
        </div>
        <div></div>
    </section>
  )
}

export default Page;