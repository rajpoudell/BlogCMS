import React from 'react';
import { Link } from 'react-router-dom';
interface CardData {
  id?: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'publish' | 'draft' | string;
  createdDate: string;
}

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (

    <div  className= "max-w-sm bg-white border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border ">
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white bg-slate-600 px-3 py-1 rounded-full font-medium">
            {data.category}
          </span>
          <span className="text-xs text-gray-400">{new Date(data.createdDate).toDateString()}</span>
         
        </div>
        <Link to={`/blog/${data.id}`}>
        <h2 className=" text-slate-800 text-xl cursor-pointer font-semibold  hover:text-slate-600 transition duration-300">
          {data.title.length > 2 ? `${data.title.slice(0, 20)}...` : data.title}
        </h2>
        </Link>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className=" text-slate-600 bg-gray-100  text-xs px-2 py-1 rounded-full cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className=" text-slate-500 border-gray-100 pt-4 flex items-center justify-between  border-t  text-sm ">
          <span>By: {data.author}</span>
          <span className={`font-medium ${data.status === 'publish' ? 'text-green-600' : 'text-red-600'}`}>
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
