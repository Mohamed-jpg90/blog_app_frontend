"use client";

import Image from "next/image";
import img2 from "../../image/profileImage.png";
import Button from "../shared/Button";
import "./profile.css";
import BaseUrl from "@/config/api";

export default function ProfilePage() {
const token = localStorage.getItem("token")

  const user = localStorage.getItem("user")

  return (
    <section className="profileHero">
      <div className="profileAvatar">
        <Image src={img2} alt="user image" fill sizes="120px" />
      </div>

      <h1 className="profileName">Mohammed</h1>

      <div className="profileMeta">
        <span className="profileMetaLabel">Account</span>
        <span className="profileMetaDivider">||</span>
        <span className="profileMetaText">email@gmail.com</span>
        <span className="profileMetaDivider">||</span>
        <span className="profileMetaText">1234567890</span>
      </div>

      <div className="profileActions">
        <Button type="button" variant="secondary">
          Edit profile
        </Button>
        <Button type="button" variant="primary">
          Change password
        </Button>
      </div>
    </section>
  );
}