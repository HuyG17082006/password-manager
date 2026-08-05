import { FaUser, FaEnvelope, FaLink, FaTag, FaThumbtack } from "react-icons/fa";
import AccountLocationSelect from "./AccountLocationSelect";
import "../../styles/AccountDetail/AccountBasic.scss";

export default function AccountBasic({
    mode,
    account = {},
    handleInput = () => { },
    errors = {}
}) {

    const isView = mode === "view";
    const isCreate = mode === 'create';

    return (
        <section className="account-basic">

            <div className="section-title">
                <h3>Basic Information</h3>
                <span>Application and login information</span>
            </div>

            <div className="form-grid">

                <div className="field full">
                    <label>Application Name *</label>
                    {
                        isView
                            ? <div className="value">{account.applicationName || "-"}</div>
                            : <input
                                value={account.applicationName || ""}
                                placeholder="Github"
                                name="applicationName"
                                onChange={handleInput}
                            />
                    }

                    {
                        <span className="error">
                            {errors.applicationName}
                        </span>
                    }
                </div>

                <div className="field full">
                    <label>Location</label>
                    <AccountLocationSelect
                        mode={mode}
                        value={account.folderId}
                        onChange={handleInput}
                    />
                </div>

                <div className="field">
                    <label>
                        <FaUser />
                        Username
                    </label>

                    {
                        isView
                            ? <div className="value">{account.username || "-"}</div>
                            : <input
                                value={account.username || ""}
                                placeholder="Username"
                                name="username"
                                onChange={handleInput}
                            />
                    }
                    {
                        <span className="error">
                            {errors.username}
                        </span>
                    }
                </div>

                <div className="field">
                    <label>
                        <FaEnvelope />
                        Email
                    </label>

                    {
                        isView
                            ? <div className="value">{account.email || "-"}</div>
                            : <input
                                value={account.email || ""}
                                placeholder="example@gmail.com"
                                name="email"
                                onChange={handleInput}
                            />
                    }

                    {
                        <span className="error">
                            {errors.email}
                        </span>
                    }
                </div>

                <div className="field">
                    <label>
                        <FaTag />
                        Owner
                    </label>

                    {
                        isView
                            ? <div className="value">{account.owner || "-"}</div>
                            : <input
                                value={account.owner || ""}
                                placeholder="Personal"
                                name="owner"
                                onChange={handleInput}
                            />
                    }
                </div>

                <div className="field">
                    <label>
                        <FaLink />
                        URL
                    </label>

                    {
                        isView
                            ? <div className="value">{account.url || "-"}</div>
                            : <input
                                value={account.url || ""}
                                placeholder="https://..."
                                name="url"
                                onChange={handleInput}
                            />
                    }
                </div>

            </div>

            <div className="pin-row">

                <label className="pin">

                    <input
                        type="checkbox"
                        checked={account.isPinned || false}
                        disabled={isView}
                        name="isPinned"
                        onChange={handleInput}
                    />

                    <FaThumbtack />

                    <span>Favorite</span>

                </label>

            </div>

        </section>
    );

}