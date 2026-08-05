import {
    FaFolder,
    FaGlobe
} from "react-icons/fa";

import { useNavigate } from "react-router";
import { truncate } from "../../utils/format.js";

import "../styles/SearchItem.scss";

export default function SearchItem({

    id,

    type,

    applicationName,
    username,
    email,

    folderName,
    name

}) {

    const navigate = useNavigate();

    const isFolder = type === "folder";

    const open = () => {

        navigate(`/dashboard/folder/${id}`);

    };

    return (

        <div
            className="search-item"
            onClick={open}
        >

            <div className="icon">

                {
                    isFolder
                        ? <FaFolder />
                        : <FaGlobe />
                }

            </div>

            <div className="content">

                <div className="title">

                    {
                        isFolder
                            ? truncate(name, 40)
                            : truncate(applicationName, 40)
                    }

                </div>

                <div className="subtitle">

                    {
                        isFolder
                            ? "Folder"
                            : truncate(username || email, 40)
                    }

                </div>

                {
                    !isFolder &&

                    <div className="folder">

                        📁 {truncate(folderName, 40)}

                    </div>

                }

            </div>

        </div>

    );

}