import { tr } from 'motion/react-client';
import React from 'react'

const BlockTable = ({blog,fetchBlogs,index}) => {

  const {title, createdAt} = blog;
  const blogDate = new Date(createdAt)


  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm"hidden'>
        <p className={`${blog.isPublished ? "text-green-600": "text-orange-500"}`}>{blog.isPublished ? "Published": "Not Published"}</p>
      </td>
      <td className='px-2 py-4 flex text-xs gap-3'>
        <button className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{blog.isPublished ? "Unpublished": "Published"}</button>
      </td>

    </tr>
  )
}

export default BlockTable