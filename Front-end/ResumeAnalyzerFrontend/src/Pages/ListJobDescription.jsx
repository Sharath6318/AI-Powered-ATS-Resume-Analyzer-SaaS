import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DestroyJobDescriptionAPi, JobDescriptionlistApi } from '../services/api'
import RetriveJobDesc from './RetriveJobDesc'

function ListJobDescription() {

    let [description, setDescription] = useState()

    const navigate = useNavigate()

    useEffect(() => {jobDescriptionList()}, [])

    async function jobDescriptionList() {

        let response = await JobDescriptionlistApi()

        if (response.status >= 200 && response.status < 300) {

            console.log('success');

            console.log(response.data);
            
            setDescription(response.data)

        }
    }

    async function jobDescriptionDelete(id){

        let response = await DestroyJobDescriptionAPi(id)

        if (response.status >= 200 && response.status < 300){

            alert("Deleted Successfully 👍🕷️....")

            jobDescriptionList()
            
        }
    }

    return (
        <div>
            <div className="space-y-4">

                <div className="section-header">
                    <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Saved Job Descriptions</h2>
                    <input type="text" className="form-input text-sm" placeholder="Search JDs…" style={{ width: '180px' }} />
                </div>


                {/* <!-- JD Card 1 — Active/Selected --> */}

                {description?.map((desc, index) => (

                <div className="card" style={{ borderColor: 'var(--color-amber) ', boxShadow: '0 0 0 3px rgb(245 158 11 / .1)' }}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-amber-lt)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>{desc.title}</h3>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Added {desc.created_at} · 2,340 characters</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <div className="badge badge-amber">Active</div>
                        </div> */}
                    </div>
                    <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--color-muted)' }}>
                        {desc.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="btn-primary text-xs px-3 py-1.5 w-50">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                            Analyze with this JD
                        </button>
                        <button onClick={() => navigate(`/description-edit/${desc.id}`)} className="btn-secondary text-xs px-3 py-1.5">Edit</button>
                        <Link to={`/get-description/${desc.id}/`} className="btn-secondary text-xs px-3 py-1.5">View Full</Link>
                        <button onClick={() => {jobDescriptionDelete(desc.id)}} className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ border: '1.5px solid var(--color-border)' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                        </button>
                    </div>
                </div>

                ))}


                {/* <!-- JD Card 2 --> */}
                {/* <div className="card">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-indigo-lt)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>Full Stack Developer</h3>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>Added Apr 22, 2025 · 1,870 characters</p>
                            </div>
                        </div>
                        <div className="badge badge-slate">Saved</div>
                    </div>
                    <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--color-muted)' }}>
                        Seeking a Full Stack Developer proficient in React, Node.js, and PostgreSQL. You'll own features end-to-end, work in an agile environment, and contribute to both architecture decisions and day-to-day development across our SaaS platform…
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="btn-primary text-xs px-3 py-1.5">Analyze with this JD</button>
                        <button className="btn-secondary text-xs px-3 py-1.5">Edit</button>
                        <button className="btn-secondary text-xs px-3 py-1.5">View Full</button>
                        <button className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ border: '1.5px solid var(--color-border)' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                        </button>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default ListJobDescription