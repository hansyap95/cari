import React ,{useEffect} from 'react'
import {Loading} from './Loading';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useResultContext } from '../contexts/ResultContextProvider';
export const Results = () => {
    const {results,isLoading,getResults,searchTerm}=useResultContext();
    const location=useLocation();//images,news

    useEffect(()=>{
        if(searchTerm){
            if(location.pathname==='/videos'){
                getResults(`/${location.pathname}/q=${searchTerm} video`)
            }
            else{
                getResults(`${location.pathname}/q=${searchTerm}`)
            }
    }
    },[searchTerm,location.pathname]);

    if(isLoading) return <Loading/>
    
    switch (location.pathname) {
        case '/search':
            return (
                <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
                    {results?.map(({link,title},index)=>(
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel='noreferrer'>
                                <p className='text-sm'>
                                    {link.length>30 ?link.substring(0,30) :link}
                                </p>
                                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/image':
            return (
                <div className='flex flex-wrap justify-center items-center'>
                    {results?.map(({image,link:{href,title}},index)=>(
                        <a className="sm:p-3 p-5" href={href} key={index} target="_blank" rel='noreferrer'>
                            <img src={image?.src} alt={title} loading="lazy"/>
                            <p className='w-36 break-words text-sm mt-2 '>
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            )
        case '/video':
            return (
                <div className='flex flex-wrap'>
                    {results.map((video,index)=>(
                        <div key={index} className="p-2">
                            
                            <ReactPlayer url={video.additional_links[0].href} controls width="355px" height="200px"/>
                        </div>
                    ))}
                </div>
            )
        case '/news':
            return (
            <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
                {results?.map(({links,title,id,source})=>(
                    <div key={id} className="md:w-2/5 w-full">
                        <a href={links?.[0].href} target="_blank" rel='noreferrer' className='hover:underline'>
                            <p className='text-lg dark:text-blue-300 text-blue-700'>
                                {title}
                            </p>
                            <div className='flex gap-4'>
                                <a href={source?.href} target="_blank" rel='noreferrer'>
                                    {source?.href}
                                </a>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        )
        
        default:
            return 'ERROR';
    }

  return (
    <div>
        
    </div>
  )
}
