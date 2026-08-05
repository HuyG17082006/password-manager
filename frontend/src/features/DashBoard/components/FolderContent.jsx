import {
    FaPlus,
    FaBorderAll,
    FaSlidersH,
    FaThumbtack,
    FaPen,
    FaTrash
} from "react-icons/fa";

import "../styles/FolderContent.scss";

import { formatDate } from '../../../utils/format.js'

import { useCallback, useEffect, useRef, useState } from "react";

import AccountItem from "./AccountItem.jsx";
import ContextMenu from "../../../shared/components/ContextMenu.jsx";

import { accounts } from '../test/test.js'

import useClickOutside from "../../../shared/hooks/useClickOutside.jsx";
import useAccountDetail from "../../../shared/hooks/useAccountDetail.jsx";
import useDeleteFolder from "../hooks/folder/useDeleteFolder.jsx";
import useGetAccounts from "../hooks/account/useGetAccounts.jsx";

export default function FolderContent({

    folderId,
    folderData,
    totalAccounts = 0

}) {

    const {
        loading,

        softDelete
    } = useDeleteFolder();

    const {
        loading : accountLoading,
        total,
        accounts
    } = useGetAccounts()

    const { updatedAt, name, isPinned = false, isSystem } = folderData;

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    const contextMenuRef = useClickOutside(() => setIsContextMenuOpen(false));

    const { open: openAccountDetail } = useAccountDetail();

    const [isGrid, setIsGrid] = useState(
        localStorage.getItem("viewMode") !== "list"
    );
    
    const changeListView = () =>
        setIsGrid(prev => {
            localStorage.setItem("viewMode", prev ? "list" : "grid");
            return !prev;
        });

    const contextMenuItems = [

        {
            label: isPinned ? "Unpin" : "Pin",
            icon: FaThumbtack,
            onClick: () => { }
        },

        {
            label: "Rename",
            icon: FaPen,
            onClick: () => { }
        },

        {
            label: "Delete",
            icon: FaTrash,
            danger: true,
            onClick: () => softDelete()
        }

    ];

    return (

        <div className="folder-content">

            <div className="title">

                <div className="folder-info">

                    <div className="folder-name">

                        <h2>{name}</h2>

                        {
                            isPinned &&
                            <span className="pin-badge">

                                <FaThumbtack />

                                Pinned

                            </span>
                        }

                    </div>

                    <span>

                        {total} accounts

                    </span>

                </div>

                <div className="folder-actions">

                    <span className="updated-at">

                        Updated {formatDate(updatedAt)}

                    </span>

                    {!isSystem && <div className="context-menu-wrapper" ref={contextMenuRef}>

                        <button
                            className="context-button"
                            onClick={() => setIsContextMenuOpen(prev => !prev)}
                        >
                            <FaSlidersH />
                        </button>

                        {
                            isContextMenuOpen &&
                            <ContextMenu items={contextMenuItems} />
                        }

                    </div>}

                </div>

            </div>

            <div className="features">

                <button className="primary" onClick={() => openAccountDetail('create')}>

                    <FaPlus />

                    <span>Add Account</span>

                </button>

                <button onClick={changeListView}>

                    <FaBorderAll />

                    <span >View</span>

                </button>

                {/* <select>
                    <option value="updated_desc">Updated (Newest)</option>
                    <option value="updated_asc">Updated (Oldest)</option>
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="created_desc">Created (Newest)</option>
                    <option value="created_asc">Created (Oldest)</option>

                </select> */}

            </div>

            <div className={`list-container`}>

                <div className={`list ${isGrid ? "grid" : 'line'}`}>
                    {
                        accounts.map(account => <AccountItem key={account.id} {...account} />)
                    }
                </div>

            </div>

        </div>

    );

}