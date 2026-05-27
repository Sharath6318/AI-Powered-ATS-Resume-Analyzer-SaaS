import { useEffect, useState } from "react"
import { GetUserApi } from "../services/api"


function Header() {

    let [userData, SetUser] = useState()

    useEffect(() => { GetCurrentUser() }, [])


    async function GetCurrentUser() {

        let response = await GetUserApi()

        if (response.status >= 200 && response.status < 300) {

            SetUser(response.data)

            console.log(response.data);

        }
    }

    return (
        <div>
            <header className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-30" style={{ borderColor: 'var(--color-border)' }}>
                <div>
                    <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Dashboard</h1>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Welcome back, {userData?.username} 👋</p>
                </div>
                <div className="flex items-center gap-3">
                    <a href="upload.html" className="btn-primary">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Analyze Resume
                    </a>
                </div>
            </header>
        </div>
    )
}

export default Header