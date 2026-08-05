import "../styles/WaitingScreen.scss";

export default function WaitingScreen({

    title = "Loading...",

    description = "Please wait a moment."

}) {

    return (

        <div className="waiting-screen">

            <div className="waiting-card">

                <div className="spinner"></div>

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </div>

        </div>

    );

}