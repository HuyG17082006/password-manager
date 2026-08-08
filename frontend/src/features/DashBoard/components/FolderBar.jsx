import {
    FaFolderOpen,
    FaPlus
} from "react-icons/fa";

import FolderItem from "./FolderItem.jsx";

import { SYSTEM_FOLDERS } from "../constants/folder.constants.js";

import "../styles/FolderBar.scss";

import useCreateFolderForm from "../../../shared/hooks/useCreateFolderForm.jsx";
import useGetFolders from "../hooks/folder/useGetFolders.jsx";
import useGetAccounts from "../hooks/account/useGetFolderSystemTotalAccounts.jsx";

export default function FolderBar({

    selectedId = null,

    onSelect,

    onAddFolder,

    setData

}) {

    const {
        open
    } = useCreateFolderForm();

    const {
        overview
    } = useGetAccounts();

    const {
        folders,
        loading
    } = useGetFolders();

    return (

        <div className="folder-bar">

            <div className="all-folder">

                {
                    SYSTEM_FOLDERS.map((folder) =>

                        <FolderItem

                            key={folder.id}

                            {...folder}

                            icon={<folder.icon/>}

                            selected={(selectedId === folder.id) || ((selectedId === null) && folder.id === 'all')}

                            setData={setData}

                            totalAccounts={overview[folder.id]}

                            isSystem={true}

                        />)
                }

            </div>

            <div className="list-wrapper">

                <div className="list">

                    {

                        folders.map(folder => (

                            <FolderItem

                                key={folder.id}

                                {...folder}

                                selected={selectedId === folder.id}

                                setData={setData}

                            />

                        ))

                    }

                </div>

            </div>

            <div className="features">

                <button
                    className="add-folder"
                    onClick={open}
                >

                    <FaPlus />

                    <span>
                        Add Folder
                    </span>

                </button>

            </div>

        </div>

    );

}