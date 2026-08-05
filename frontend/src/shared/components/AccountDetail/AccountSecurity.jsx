import {
    FaLock,
    FaEye,
    FaCopy,
    FaDice
} from "react-icons/fa";

import "../../styles/AccountDetail/AccountSecurity.scss";
import { useState } from "react";

export default function AccountSecurity({

    mode,
    account = {},
    errors = {},

    handleInput,

    onGenerate,
    onCopy,
    onChange

}) {

    const isView = mode === "view";
    const isCreate = mode === "create";

    const [showPassword, setShowPassword] = useState(false)

    return (

        <section className="account-security">

            <div className="section-title">

                <h3>Password</h3>

                <span>Password information</span>

            </div>

            <div className="field">

                <label>

                    <FaLock />

                    Password

                </label>

                {

                    isView ?

                        <div className="password-view">

                            <span>

                                {
                                    showPassword
                                        ? account.password
                                        : "•".repeat(24)
                                }

                            </span>

                        </div>

                        :

                        <input
                            type={showPassword ? "text" : "password"}
                            value={account.password || ""}
                            name="password"
                            onChange={handleInput}
                        />



                }

                {
                    <span className="error">
                        {errors.password}
                    </span>
                }

            </div>

            <div className="actions">

                <button onClick={() => setShowPassword?.(!showPassword)}>
                    <FaEye />
                    Reveal
                </button>

                <button onClick={onCopy}>
                    <FaCopy />
                    Copy
                </button>

                {
                    !isView &&
                    <button onClick={onGenerate}>
                        <FaDice />
                        Generate
                    </button>
                }

            </div>

        </section>

    );

}