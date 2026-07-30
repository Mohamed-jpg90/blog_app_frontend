"use client";

import { useEffect } from "react"

export function getToken() {
  return localStorage.getItem("token");
}