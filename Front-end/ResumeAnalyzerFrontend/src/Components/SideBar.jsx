import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { CreditsSummaryApi, GetUserApi, RetrivePlanApi } from '../services/api'

function SideBar() {

    let [plan, setPlan] = useState()

    let [userData, SetUser] = useState()
    let [c_summary, setCreditsSummary] = useState()

    // let plan = localStorage.getItem('plan')

    useEffect(() => { GetCurrentUser() }, [])

    async function GetCurrentUser() {

        try {

            let response = await GetUserApi()

            if (response.status >= 200 && response.status < 300) {

                SetUser(response.data)
                // console.log(response.data);
            }

            let creditsResponse = await CreditsSummaryApi()

            if (creditsResponse.status >= 200 && creditsResponse.status < 300) {

                // console.log(response.data);
                // console.log(creditsResponse.data);

                setCreditsSummary(creditsResponse.data)

            }


            let getplanresponse = await RetrivePlanApi()

            console.log(getplanresponse.data);

            setPlan(getplanresponse.data)


        }
        catch (error) {

            console.log(error);

        }

    }

    return (
        <div>

            <aside className="sidebar">

                {/* <!-- Brand --> */}
                <div className="flex items-center gap-3 px-5 py-5">
                    <div className="logo-mark">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-white font-display font-700 text-base leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>ResumeAI</div>
                        <div className="text-xs" style={{ color: "#64748b" }}>Pro Workspace</div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* <!-- Navigation --> */}
                <div className="flex flex-col gap-1 px-3 py-3 flex-1">
                    <NavLink to={'/dashboard/'} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                    </NavLink>
                    <NavLink to={"/resume-uplode/"} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Upload Resume
                    </NavLink>
                    <NavLink to={'/analyze-result/'} className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        Analysis Results
                    </NavLink>
                    <NavLink to={'/job-desctiption/'} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        Job Descriptions
                    </NavLink>
                    <NavLink to={'/subscription/'} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Subscription
                    </NavLink>
                    <NavLink to={'/usage/'} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} className="nav-item">
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Usage History
                    </NavLink>
                </div>


                {/* <!-- Credits Meter --> */}
                <div className="pb-4">
                    <div className="credits-mini">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold" style={{ color: "#94a3b8" }}>Credits Remaining</span>
                            <span className="text-xs font-bold" style={{ color: "var(--color-amber)" }}>{c_summary?.remaining_credists} / {plan == "pro" ? c_summary?.remaining_credists + 100 : plan == "enterprise" ? c_summary?.remaining_credists + 500 : 3}</span>
                        </div>
                        <div className="progress-bar-track">
                            <div className="progress-bar-fill" style={{
                                width: `${(c_summary?.used_credits /
                                    (plan === "pro" ? 100 : plan === "enterprise" ? 500 : 3)) 
                                    }%`
                            }}></div>
                        </div>
                        <p className="text-xs mt-2" style={{ color: "#64748b" }}>{c_summary?.used_credits} credits Used</p>
                    </div>


                    {/* <!-- User Avatar --> */}
                    <div className="flex items-center gap-3 px-4 pt-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>{userData?.username.slice(0, 2).toUpperCase()}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#e2e8f0" }}>{userData?.username.toUpperCase()}</p>
                            <p className="text-xs truncate" style={{ color: "#64748b" }}>{userData?.plan.charAt(0).toUpperCase() + userData?.plan.slice(1,)}</p>
                        </div>
                        <div className="badge badge-amber text-xs">{userData?.plan.toUpperCase()}</div>
                    </div>
                </div>

            </aside>
        </div>
    )
}

export default SideBar