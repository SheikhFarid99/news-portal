import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'


const Writers = () => {

  const { store } = useContext(storeContext)
  const [writers, setWriters] = useState([])

  const get_writers = async () => {
    try {

      const { data } = await axios.get(`${base_url}/api/news/writers`, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      setWriters(data.writers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_writers()
  }, [])
  return (
    <div className='bg-white rounded-md'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl font-medium'>Writers</h2>
        <Link className='px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600' to='/dashboard/writer/add'>Add Writer</Link>
      </div>
      <div className='relative overflow-x-auto p-4'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-7 py-3'>No</th>
              <th className='px-7 py-3'>Name</th>
              <th className='px-7 py-3'>Category</th>
              <th className='px-7 py-3'>Role</th>
              <th className='px-7 py-3'>Image</th>
              <th className='px-7 py-3'>Email</th>
              <th className='px-7 py-3'>Active</th>
            </tr>
          </thead>
          <tbody>
            {
              writers.map((r, i) => <tr key={i} className='bg-white border-b' >
                <td className='px-6 py-4'>{i + 1}</td>
                <td className='px-6 py-4'>{r.name}</td>
                <td className='px-6 py-4'>{r.category}</td>
                <td className='px-6 py-4'>{r.role}</td>
                <td className='px-6 py-4'>
                  <img className='w-[40px] h-[40px]' src="https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696952625/news/g7ihrhbxqdg5luzxtd9y.webp" alt="" />
                </td>
                <td className='px-6 py-4'>{r.email}</td>
                <td className='px-6 py-4'>
                  <div className='flex justify-start items-center gap-x-4 text-white'>
                    <Link to={`/dashboard/writer/${r._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                  </div>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Writers