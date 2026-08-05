import React from 'react'

import '../styles/CreateFolderForm.scss'

import { FaFolder, FaSave, FaTimes } from "react-icons/fa";

import useCreateFolderForm from '../hooks/useCreateFolderForm.jsx'
import useCreateFolder from '../../features/DashBoard/hooks/folder/useCreateFolder.jsx'

export default function CreateFolderForm() {

    const { isOpen, open, close } = useCreateFolderForm();

    const {
        folder,
        errors,

        handleInput,

        create
    } = useCreateFolder();

    if (!isOpen)
        return;

    return (

        <div className="create-folder">

            <div className="header">

                <div className="title">

                    <FaFolder />

                    <h2>Create Folder</h2>

                </div>

            </div>

            <div className="body">

                <div className="form-group">

                    <label>

                        Folder Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={folder.name}
                        onChange={handleInput}
                        placeholder="Enter folder name..."
                        autoComplete='off'
                    />

                    {
                        errors?.name &&
                        <span className="error">

                            {errors.name}

                        </span>
                    }

                </div>

                <label className="pin">

                    <input
                        type="checkbox"
                        checked={folder.isPinned || false}
                        name='isPinned'
                        onChange={handleInput}
                    />

                    <span>

                        Pin this folder

                    </span>

                </label>

            </div>

            <div className="footer">

                <button
                    onClick={close}
                >

                    <FaTimes />

                    Cancel

                </button>

                <button
                    className="primary"
                    onClick={create}
                >

                    <FaSave />

                    Create

                </button>

            </div>

        </div>

    );
}



