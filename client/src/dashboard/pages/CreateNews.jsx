import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from 'jodit-react'
import Galler from '../components/Galler';

const CreateNews = () => {

    const [show, setShow] = useState(false)

    return (
        <div className='bg-white rounded-md'>
            <div className='flex justify-between p-4'>
                <h2 className='text-xl font-medium'>Add News</h2>
                <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/news'>News</Link>

            </div>

            <div className='p-4'>
                <form>
                    <div className='flex flex-col gap-y-2 mb-6'>
                        <label className='text-md font-medium text-gray-600' htmlFor="title">Title</label>
                        <input type="text" placeholder='title' name='title' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id='title' />
                    </div>
                    <div className='mb-6'>
                        <div>
                            <label htmlFor="img" className={`w-full h-[180px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed`}>
                                <div className='flex justify-center items-center flex-col gap-y-2'>
                                    <span className='text-2xl'><MdCloudUpload /></span>
                                    <span>Select Image</span>
                                </div>
                            </label>
                            <input className='hidden' type="file" id='img' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2 mb-6'>
                        <div className='flex justify-start items-center gap-x-2'>
                            <h2>Description</h2>
                            <div onClick={() => setShow(true)}>
                                <span className='text-2xl cursor-pointer'><MdCloudUpload /></span>
                            </div>
                        </div>
                        <div>
                            <JoditEditor />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <button className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' >Add News</button>
                    </div>

                </form>
            </div>
            {
                show && <Galler setShow={setShow} images={[]} />
            }
        </div>
    )
}

export default CreateNews