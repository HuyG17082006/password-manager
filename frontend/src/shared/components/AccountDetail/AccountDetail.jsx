import { useNavigate } from "react-router";

import {
    FaArrowLeft
} from "react-icons/fa";

import "../../styles/AccountDetail/AccountDetail.scss"

import AccountBasic from "./AccountBasic";
import AccountSecurity from "./AccountSecurity";
import AccountInfo from "./AccountInfo";
import AccountActions from "./AccountActions";

import useAccountDetail from "../../hooks/useAccountDetail.jsx";
import useCreateAccount from "../../../features/DashBoard/hooks/account/useCreateAccount.jsx";

export default function AccountDetail({ }) {

    const navigate = useNavigate();

    const {
        open,
        close,
        isOpen,
        mode,
        accountId
    } = useAccountDetail();

    const {
        loading,
        errors,
        account,

        create,

        handleInput,

        resetAccount,
        resetErrors
    } = useCreateAccount();
    
    const isView = mode === "view";
    const isCreate = mode === "create";
    const isEdit = mode === "edit";

    const closeAndReset = () => {
        resetAccount()
        resetErrors()
        close()
    }

    const copy = async (text) => {
        try {

            await navigator.clipboard.writeText(account.password);

            console.log("Copied");

        } catch {

            console.log("Copy failed");

        }

    };

    if (!isOpen)
        return;

    return (
        <div className="account-detail-backdrop">
            <div className={`account-detail`}>

                <div className="account-header">

                    <button
                        className="back-button"
                        onClick={closeAndReset}
                    >

                        <FaArrowLeft />

                        <span>

                            Back

                        </span>

                    </button>

                    <div className="title">

                        <h2>

                            {
                                isCreate
                                    ? "Create Account"
                                    : isEdit
                                        ? "Edit Account"
                                        : account.applicationName || "Account Detail"
                            }

                        </h2>

                        <span>

                            {
                                isCreate
                                    ? "Create a new account."
                                    : isEdit
                                        ? "Update account information."
                                        : "View account information."
                            }

                        </span>

                    </div>

                </div>

                <div className="account-body">

                    <div className="account-body-inside">

                        <AccountBasic

                            mode={mode}

                            account={account}

                            errors={errors}

                            handleInput={handleInput}

                        />

                        <div className="account-body-inside-lower">

                            <AccountSecurity

                                mode={mode}

                                account={account}

                                errors={errors}

                                handleInput={handleInput}

                                onCopy={copy}

                            />

                            <AccountInfo

                                mode={mode}

                                account={account}

                            />
                        </div>

                    </div>


                </div>

                <div className="account-footer">

                    <AccountActions

                        mode={mode}

                        loading={loading}

                        onCancel={closeAndReset}

                        onSave={create}

                        onEdit={() => { }}

                    />

                </div>



            </div>

        </div>

    );

}