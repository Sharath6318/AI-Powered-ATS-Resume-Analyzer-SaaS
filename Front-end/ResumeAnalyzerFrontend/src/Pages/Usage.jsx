import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { CreditsSummaryApi, RetrivePlanApi, UsageListApi } from '../services/api'

function Usage() {

    useEffect(() => { Usages() }, [])
    
    let [plan, setPlan] = useState()
    let [getusage, setUsage] = useState()
    let [c_summary, setCreditsSummary] = useState()
    
    async function Usages() {

        try {

            let response = await UsageListApi()

            // console.log(response.data);            

            setUsage(response.data)


            let creditsResponse = await CreditsSummaryApi()

            // console.log(creditsResponse.data);

            setCreditsSummary(creditsResponse.data)


            let getplanresponse = await RetrivePlanApi()

            console.log(getplanresponse.data);


            setPlan(getplanresponse.data)

        }

        catch (error) {

            console.log("Error", error);

        }
    }

    return (
        <div>

            <div class="app-layout">

                {/* <!-- ══════════════════════════════════════════════ */}
                SIDEBAR
                {/* ══════════════════════════════════════════════ --> */}
                <SideBar></SideBar>


                {/* <!-- ══════════════════════════════════════════════ */}
                MAIN CONTENT
                {/* ══════════════════════════════════════════════ --> */}
                <main class="main-content">


                    {/* <!-- Top Bar --> */}
                    <header class="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-30" style={{ borderColor: 'var(--color-border)' }}>
                        <div>
                            <h1 class="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Usage History</h1>
                            <p class="text-sm" style={{ color: 'var(--color-muted)' }}>Track your credit consumption and activity log</p>
                        </div>
                        <button class="btn-secondary text-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export CSV
                        </button>
                    </header>

                    <div class="flex-1 p-8 space-y-6">

                        {/* <!-- ── CREDIT SUMMARY CARDS ──────────────────── --> */}
                        <div class="grid grid-cols-4 gap-5">
                            <div class="stat-card">
                                <p class="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.07em' }}>Total Credits</p>
                                <p class="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{plan?.plan == "pro" ? c_summary?.remaining_credists + 100 : plan?.plan == "enterprise" ? c_summary?.remaining_credists + 500 :  plan?.plan == "free" ? 3 : 0}</p>
                                <p class="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>monthly allowance</p>
                            </div>
                            <div class="stat-card">
                                <p class="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.07em' }}>Credits Used</p>
                                <p class="text-3xl font-bold" style={{ fontFamily: 'var(--font-display);color:var(--color-amber-dk)' }}>{c_summary?.used_credits?c_summary?.used_credits:0}</p>
                                <p class="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>this billing period</p>
                            </div>
                            <div class="stat-card">
                                <p class="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.07em' }}>Credits Left</p>
                                <p class="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}>{c_summary?.remaining_credists?c_summary?.remaining_credists:0}</p>
                                <div class="progress-bar-track mt-2">
                                    <div class="progress-bar-fill" style={{
                                        width: `${(c_summary?.used_credits /
                                            (plan === "pro" ? 100 : plan === "enterprise" ? 500 : 3)) 
                                            }%`
                                    }}></div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <p class="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.07em' }}>Total Actions</p>
                                <p class="text-3xl font-bold">{c_summary?.total_action?c_summary?.total_action:0}</p>
                                <p class="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>actions this month</p>
                            </div>
                        </div>


                        {/* <!-- ── FILTERS + TABLE ────────────────────────── --> */}
                        <div class="card">

                            {/* <!-- Filter Bar --> */}
                            <div class="flex items-center gap-3 mb-6 flex-wrap">
                                <input type="text" class="form-input text-sm" placeholder="Search actions…" style={{ width: '200px' }} />

                                <select class="form-input text-sm" style={{ width: '160px' }}>
                                    <option>All Actions</option>
                                    <option>Resume Analysis</option>
                                    <option>Resume Upload</option>
                                    <option>Job Description</option>
                                    <option>Re-analysis</option>
                                </select>

                                <select class="form-input text-sm" style={{ width: '160px' }}>
                                    <option>All Time</option>
                                    <option>This Month</option>
                                    <option>Last 7 Days</option>
                                    <option>Last 30 Days</option>
                                </select>

                                <div class="ml-auto flex items-center gap-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                                    {/* Showing <strong style={{ color: 'var(--color-ink)' }}>14</strong> of 14 records */}
                                </div>
                            </div>


                            {/* <!-- Table --> */}
                            <div class="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th style={{ borderRadius: '12px 0 0 0' }}>#</th>
                                            <th>Action</th>
                                            <th>File / Resource</th>
                                            <th>Credits Used</th>
                                            <th>Status</th>
                                            <th style={{ borderRadius: '0 12px 0 0' }}>Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {
                                            getusage?.map((u, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="text-xs" style={{ color: 'var(--color-muted)' }}>
                                                            {i + 1}
                                                        </td>

                                                        <td>
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                                    style={{ background: 'var(--color-teal-lt)' }}
                                                                >
                                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                                                    </svg>
                                                                </div>

                                                                <span className="text-sm font-medium">
                                                                    {u.action}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>
                                                            {u.resource}
                                                        </td>

                                                        <td>
                                                            <span className="font-semibold text-sm" style={{ color: 'var(--color-ink)' }}>
                                                                -{u.credits_used}
                                                            </span>
                                                            <span className="text-xs ml-1" style={{ color: 'var(--color-muted)' }}>
                                                                credits
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <span className="badge badge-teal">
                                                                {u.status}
                                                            </span>
                                                        </td>

                                                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>
                                                            {u.created_at}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>


                            {/* <!-- Pagination --> */}
                            <div class="flex items-center justify-between mt-5">
                                <p class="text-sm" style={{ color: 'var(--color-muted)' }}>Page 1 of 2</p>
                                <div class="flex items-center gap-2">
                                    <button class="btn-secondary text-sm px-3 py-1.5" disabled>← Previous</button>
                                    <button class="btn-primary text-sm px-3 py-1.5">Next →</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- /page body --> */}
                </main>

            </div>
        </div>
    )
}

export default Usage