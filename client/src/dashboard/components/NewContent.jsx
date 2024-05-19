import React, { useContext, useState, useEffect } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { convert } from 'html-to-text'
import toast from 'react-hot-toast'

const NewContent = () => {

    const { store } = useContext(storeContext)
    const [news, setNews] = useState([])
    const [all_news, set_all_news] = useState([])

    const [parPage, setParPage] = useState(5)
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)



    const get_news = async () => {

        try {
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            set_all_news(data.news)
            setNews(data.news)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_news()
    }, [])

    useEffect(() => {
        if (news.length > 0) {
            const calculate_page = Math.ceil(news.length / parPage)
            setPages(calculate_page)
        }
    }, [news, parPage])

    const type_filter = (e) => {
        if (e.target.value === '') {
            setNews(all_news)
            setPage(1)
            setParPage(5)
        } else {
            const tempNews = all_news.filter(n => n.status === e.target.value)
            setNews(tempNews)
            setPage(1)
            setParPage(5)
        }

    }

    const serach_news = (e) => {

        const tempNews = all_news.filter(n => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
        setNews(tempNews)
        setPage(1)
        setParPage(5)
    }
    const [res, set_res] = useState({
        id: '',
        loader: false
    })
    const update_status = async (status, news_id) => {
        try {
            set_res(
                {
                    id: news_id,
                    loader: true
                }
            )
            const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, { status }, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            set_res({
                id: '',
                loader: false
            })
            toast.success(data.message)
            get_news()
        } catch (error) {
            set_res({
                id: '',
                loader: false
            })
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <div className='px-4 py-3 flex gap-x-3'>
                <select onChange={type_filter} name="" className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id="">
                    <option value="">---select type---</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <input onChange={serach_news} type="text" placeholder='search news' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />
            </div>
            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th className='px-7 py-3'>No</th>
                            <th className='px-7 py-3'>Title</th>
                            <th className='px-7 py-3'>Image</th>
                            <th className='px-7 py-3'>Category</th>
                            <th className='px-7 py-3'>Description</th>
                            <th className='px-7 py-3'>Date</th>
                            <th className='px-7 py-3'>Status</th>
                            <th className='px-7 py-3'>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news.length > 0 && news.slice((page - 1) * parPage, page * parPage).map((n, i) => <tr key={i} className='bg-white border-b' >
                                <td className='px-6 py-4'>{i + 1}</td>
                                <td className='px-6 py-4'>{n.title.slice(0, 15)}...</td>
                                <td className='px-6 py-4'>
                                    <img className='w-[40px] h-[40px]' src={n.image} alt="" />
                                </td>
                                <td className='px-6 py-4'>{n.category}</td>
                                <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
                                <td className='px-6 py-4'>{n.date}</td>
                                {
                                    store?.userInfo?.role === 'admin' ? <td className='px-6 py-4'>
                                        {
                                            n.status === 'pending' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer' >{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>
                                        }
                                        {
                                            n.status === 'active' && <span onClick={() => update_status('deactive', n._id)} className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer' >{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>
                                        }
                                        {
                                            n.status === 'deactive' && <span onClick={() => update_status('active', n._id)} className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer' >{res.loader && res.id === n._id ? 'Loading...' : n.status}</span>
                                        }
                                    </td> : <td className='px-6 py-4'>
                                        {
                                            n.status === 'pending' && <span className='px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs cursor-pointer' >{n.status}</span>
                                        }
                                        {
                                            n.status === 'active' && <span className='px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs cursor-pointer' >{n.status}</span>
                                        }
                                        {
                                            n.status === 'deactive' && <span className='px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs cursor-pointer' >{n.status}</span>
                                        }
                                    </td>
                                }
                                <td className='px-6 py-4'>
                                    <div className='flex justify-start items-center gap-x-4 text-white'>
                                        <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        {
                                            store?.userInfo?.role === 'writer' && <>
                                                <Link to={`/dashboard/news/edit/${n._id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                                <div className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></div>
                                            </>
                                        }
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600'>
                <div className='flex gap-x-3 justify-center items-center'>
                    <p className='px-4 py-3 font-semibold text-sm'>News par Page</p>
                    <select value={parPage} onChange={(e) => {
                        setParPage(parseInt(e.target.value))
                        setPage(1)
                    }} name='category' id='category' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <p className='px-6 py-3 font-semibold text-sm'>
                    {(page - 1) * parPage + 1}/{news.length} - of {pages}
                </p>
                <div className='flex items-center gap-x-3'>
                    <IoIosArrowBack onClick={() => {
                        if (page > 1) setPage(page - 1)
                    }} className='w-5 h-5 cursor-pointer' />
                    <IoIosArrowForward onClick={() => {
                        if (page < pages) setPage(page + 1)
                    }} className='w-5 h-5 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default NewContent