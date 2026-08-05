import useGetFolders from '../../../features/DashBoard/hooks/folder/useGetFolders.jsx';

import '../../styles/AccountDetail/AccountLocationSelect.scss'

export default function AccountLocationSelect({

    mode,

    value,

    onChange

}) {

    const { folders } = useGetFolders();

    return (

        <div className="account-section">

            <label>

                Folder

            </label>

            <select
                name="folderId"
                value={value ?? ""}
                onChange={onChange}
                disabled={mode === "view"}
            >

                <option value="">

                    No folder

                </option>

                {

                    folders.map(folder => (

                        <option
                            key={folder.id}
                            value={folder.id}
                        >

                            {folder.name}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}