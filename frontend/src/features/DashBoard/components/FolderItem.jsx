import { FaFolder } from "react-icons/fa";

import { useNavigate } from "react-router";

import "../styles/FolderItem.scss";
import { useEffect } from "react";

export default function FolderItem({

    id,

    icon,

    name,

    updatedAt,

    totalAccounts,

    isPinned = false,

    selected,

    setData,

    isSystem = false

}) {
    const navigate = useNavigate();

    const openFolder = () => navigate(`/dashboard/folder/${id}`)

    useEffect(() => {

        if (selected)
            setData({
                updatedAt,
                name,
                isPinned,
                isSystem
            })

    }, [selected])
    
    return (

        <div

            className={`folder-item ${selected ? "selected" : ""} ${isPinned ? "pinned" : ""}`}

            onClick={
                openFolder
            }
        >

            <div className="left">

                {icon || <FaFolder />}

                <span className="name">

                    {name}

                </span>

            </div>

            <span className="count">

                {totalAccounts}

            </span>

        </div>

    );

}