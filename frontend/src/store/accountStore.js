import { create } from "zustand";

export default create((set, get) => ({

    multiAccountsMap: {},

    setAccounts(folderId, accounts, totalAccounts) {

        set(state => ({
            multiAccountsMap: {
                ...state.multiAccountsMap,
                [folderId]: {
                    accounts,
                    totalAccounts
                }
            }
        }));

    },

    add(folderId, account) {

        const current = get().multiAccountsMap[folderId] ?? {
            accounts: [],
            totalAccounts: 0
        };

        set(state => ({
            multiAccountsMap: {
                ...state.multiAccountsMap,
                [folderId]: {
                    accounts: [...current.accounts, account],
                    totalAccounts: current.totalAccounts + 1
                }
            }
        }));

    },

    getAccounts(folderId) {

        return get().multiAccountsMap[folderId];

    }

}));