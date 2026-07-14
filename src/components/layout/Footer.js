import {
    FaPinterestP,
    FaTiktok,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

const socials = [
    { icon: <FaPinterestP />, handle: "@myblog", href: "https://pinterest.com" },
    { icon: <FaTiktok />, handle: "@myblog", href: "https://tiktok.com" },
    { icon: <FaInstagram />, handle: "@myblog", href: "https://instagram.com" },
    { icon: <FaYoutube />, handle: "MyBlog", href: "https://youtube.com" },
];

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <h2 className="footer-name">MyBlog</h2>
                <p className="footer-subtitle">Stories, thoughts &amp; ideas worth reading</p>

                <div className="footer-socials">
                    {socials.map((s) => (
                        <a
                            key={s.handle + s.href}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-item"
                        >
                            <span className="footer-social-icon">{s.icon}</span>
                            <span>{s.handle}</span>
                        </a>
                    ))}
                </div>

                <p className="footer-bottom">
                    © {new Date().getFullYear()} MyBlog. All rights reserved.
                </p>
            </footer>
        </>
    );
}