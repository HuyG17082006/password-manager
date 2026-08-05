import React, { useEffect, useState } from 'react'

import * as service from '../service/account/index.js'

export default function TEST() {

    const [list, setList] = useState();

    useEffect(() => {

        const getList = async () => {
            const list1 = await service.getAll();
            const list2 = await service.getIsNoFolder();
            const list3 = await service.getWithFolderId('adasds');

            setList({
                list1,
                list2
            })
        }

        getList();
    }, [])

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <div></div>
    )
}
