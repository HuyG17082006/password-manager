import { Link } from "react-router";
import { FaTriangleExclamation } from "react-icons/fa6";

// import "../styles/NotFound.scss";

export default function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="not-found-card">

                <FaTriangleExclamation className="not-found-icon" />

                <h1>404</h1>

                <h2>Không tìm thấy trang</h2>

                <p>
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                </p>

                <Link to="/" className="not-found-button">
                    Quay về trang chủ
                </Link>

            </div>
        </div>
    );
}