import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { SummaryAPi } from '../services/api'

function Summary() {

    let [summary, setSummary] = useState()

    useEffect(() => { getSummary() }, [])

    async function getSummary() {

        try {

            let response = await SummaryAPi()

            if (response.status >= 200 && response.status < 300) {

                setSummary(response.data)

                console.log(response.data);
            }

        }
        catch (error) {

            console.log(error);
        }
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-5" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>


                {/* <!-- Card 1 --> */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: "var(--color-muted)" }}>Credits Left</span>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-amber-lt)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{summary?.avilable_credits?summary?.avilable_credits:0}</p>
                    {/* <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>out of 100 monthly</p> */}
                    {/* <div className="progress-bar-track mt-3">
                        <div className="progress-bar-fill" style={{ width: '42%' }}></div>
                    </div> */}
                </div>


                {/* <!-- Card 2 --> */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>Resumes Uploaded</span>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-indigo-lt)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-indigo)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{summary?.resume_count?summary?.resume_count:0}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>total resumes stored</p>
                    <p className="text-xs mt-3 font-medium" style={{ color: 'var(--color-indigo)' }}>↑ 2 added this week</p>
                </div>


                {/* <!-- Card 3 --> */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>Avg ATS Score</span>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-teal-lt)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{summary?.average_ats_score?summary?.average_ats_score:0}<span className="text-lg font-normal" style={{ color: 'var(--color-muted)' }}>/100</span></p>
                    <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>across all analyses</p>
                    <p className="text-xs mt-3 font-medium" style={{ color: 'var(--color-teal)' }}>↑ +8 vs last month</p>
                </div>


                {/* <!-- Card 4 --> */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-muted)' }}>Job Descriptions</span>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-rose-lt)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{summary?.jobdescription_count?summary?.jobdescription_count:0}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>saved job descriptions</p>
                    <p className="text-xs mt-3 font-medium" style={{ color: "var(--color-rose)" }}>1 added today</p>
                </div>

            </div>
        </div>
    )
}

export default Summary