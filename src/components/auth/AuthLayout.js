import Image from "next/image";
import img from '../../image/1234567.png'
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="auth-form-box">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </div>
  <div className="auth-right">
  <div className="auth-right-content">
    <Image
      src={img}
      alt="login"
      fill
      className="auth-bg-image"
    />

    <div className="image_login"></div>

    {/* <h2 className="auth-right-heading">MyBlog</h2>

    <p className="auth-right-text">
      Stories, thoughts &amp; ideas worth reading.
    </p> */}
  </div>
</div>
    </div>
  );
}