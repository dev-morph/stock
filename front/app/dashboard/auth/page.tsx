'use client';

import { useState } from "react";

export default function Page() {
    const [token, setToken] = useState("");
    return (
        <div>
            <p>Auth Page</p>

            <p>토큰: {(!token || token.length === 0) ? "토큰 정보 없음" : token}</p>
            <button className={`bg-blue-400 px-4 py-2 rounded-xl text-white `}>토큰 정보 받아오기</button>

        </div>
    );
}