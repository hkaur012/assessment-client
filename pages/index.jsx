import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';


export default function Home() {

    const [healthStatus, setHealthStatus] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    const [currentSearch, setCurrentSearch] = useState('')
    const [searchClicked, setSearchClicked] = useState(false)

    const [tagData, setTagData] = useState(null)
    const [sortBy, setSortBy] = useState('id')
    const [direction, setDirection] = useState('asc')

  //  for healthStatus
    useEffect(() => {
        axios.get('/ping')
        .then (response => setHealthStatus(response.data.success))
        .catch(_ => setHealthStatus(false))
    }, []);

  //  for posts/tags api
    useEffect(() => {
      if(searchTerm == "") return
      axios({
        url: '/posts/',
        method:'get',
        params: {
            tags: searchTerm.trim().toLocaleLowerCase(),
            sortBy: sortBy,
            direction: direction
        },
        options: {
            header : {Accept: 'application/json'}
        }
      })
      .then(({data}) => {
          setTagData(data)
      })
      .catch(err => {
          console.log(err)
      })
    }, [searchTerm, sortBy, direction])

      const onInputTyped = (event) => {
          // console.log("onInputTyped: " +event.target.value)
          setCurrentSearch(event.target.value);
      }

      const onSearchBtnClicked = () => {
        if(searchClicked == false) setSearchClicked(true);
        setSearchTerm(currentSearch);
      }

  // for sortBy and directions
    const onSortByClick = (param) =>  {
      if(param == sortBy) {
        setDirection(direction == "asc"? "desc" : "asc");
      } else {
        setSortBy(param);
      }
      
    }
  return (

    <div className="md:container md:mx-auto px-8">
      <Head>
        <title>Client App for Hatchways Backend</title>
      </Head>
      <header className="h-8"></header>
      <div className="absolute h-4  right-0 max-w-7xl mx-auto px-4 sm:px-6">
          <a href="#" className="whitespace-nowrap text-gray-500 hover:text-gray-900 border px-4 py-2 rounded-md shadow-sm text-base font-medium ">
            api/ping
          </a>
          { 
           healthStatus ? 
            <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">Success</a>
           : 
            <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700">Failure</a>
          }
      </div>

      <main className="mt-8 flex flex-col w-full">
        <h1 className="text-gray-500 hover:text-gray-900  px-4 py-2 text-base font-medium ">Search Tags</h1>
          <div style={{display: "flex"}}>
              <input onChange={onInputTyped} type="text" className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="tech, culture, science" />
              <button onClick={onSearchBtnClicked} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Search!</button>
          </div>
          <div className="mt-8 mb-32 text-center" style={{ display: (searchClicked === true && tagData && tagData.posts.length != 0) ? "block": "none"}}>
            <table className="table-auto w-full border">
           <thead> 
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                  Author
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                  AuthorID
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center" onClick={() => onSortByClick("id")} >
                  ID
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center" onClick={() => onSortByClick("likes")}>
                  Likes
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center" onClick={() => onSortByClick("popularity")} >
                  Popularity
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center" onClick={() => onSortByClick("reads")}>
                  Reads
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                  Tags
              </div>
            </th>
          </thead>
          
          {tagData ? tagData.posts.map((item, i) => (
          
           <tbody>
                <tr key={i}>
                  <td key={i+1} className="p-2 border-r">{item.author}</td>
                  <td key={i+2} className="p-2 border-r">{item.authorId}</td>
                  <td key={i+3} className="p-2 border-r">{item.id}</td>
                  <td key={i+4} className="p-2 border-r">{item.likes}</td>
                  <td key={i+5} className="p-2 border-r">{item.popularity}</td>
                  <td key={i+6} className="p-2 border-r">{item.reads}</td>
                  <td key={i+7} className="p-2 border-r">{item.tags.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" , ")}</td>
                </tr>
            </tbody>
        )) : (<tbody></tbody>)}

        </table>
          </div>
          <div className="mt-8 mb-32 text-center" style={{ display: (searchClicked === true && tagData && tagData.posts.length == 0) ? "block": "none"}}>
            No Data found! Please try a different tag.
          </div>
      </main>

    </div>
  )
}
