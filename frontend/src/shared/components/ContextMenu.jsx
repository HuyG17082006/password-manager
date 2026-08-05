import React from 'react'

import '../styles/ContextMenu.scss'

export default function ContextMenu({ items = [] }) {

    return (
        <div className='context-menu'>

            {
                items.map((item) => {
                    const { label, danger = false, icon: Icon, onClick } = item;

                    return (
                        <button
                            key={label}
                            onClick={onClick}
                            className={danger ? "danger" : ""}
                        >
                            {Icon && <Icon />}
                            {label}
                        </button>
                    );
                })
            }

        </div>
    )
}
