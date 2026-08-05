import React, { useEffect, useState } from 'react'

import '../styles/Header.scss'

import { FaSearch } from 'react-icons/fa'
import SearchItem from './SearchItem.jsx'

export default function Header() {

    const [search, setSearch] = useState("");

    let data = [
        {
            "id": "...",
            "type": "folder",
            "name": "Github"
        },
        {
            "id": "...",
            "type": "account",
            "applicationName": "Github",
            "email" : '',
            "folderName": "Work",
            "username": "huyle@gamil"
        }
    ]

    const onChane = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className='header'>

            <div className='inside'>

                <div className='app-icon'>

                </div>

                <div className='search'>

                    <div className='search-element'>

                        <input type="text" onChange={onChane}/>
                        <FaSearch className='search-icon' size={22} />

                        { search && <div className='search-list'>
                            {
                                data.map(item => <SearchItem {...item} />)
                            }
                        </div> }

                    </div>

                </div>

                <div className='features'>

                </div>

            </div>

        </div>
    )
}
