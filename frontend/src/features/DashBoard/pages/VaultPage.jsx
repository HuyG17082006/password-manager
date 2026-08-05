import React, { useState } from 'react'
import { useParams } from 'react-router'

import FolderBar from '../components/FolderBar.jsx';
import FolderContent from '../components/FolderContent.jsx';

import { folders } from '../test/test.js';

import '../styles/VaultPage.scss'

import TEST from '../test/TEST.jsx';

export default function VaultPage() {

    const pageParams = useParams();

    const [folderData, setFolderData] = useState({
        updatedAt : '',
        name : '',
        isPinned : ''
    })

    let id = pageParams?.folderId || null;

    return (
        <>
            <div className='vault-page'>

                <FolderBar selectedId={id} setData={setFolderData} folders={folders}/>
                <FolderContent folderId={id} folderData={folderData}/>

            </div>
            
        </>
    )
}
