import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnalyzeResumeAPi, GetResumesAPi } from '../services/api'
import Header from '../Components/Header'
import SideBar from '../Components/SideBar'
import Usage from './Usage'

function ListResumes({ jobDesc }) {

    let [resumes, setResume] = useState()

    let navigate = useNavigate()

    useEffect(() => { getResumeAPi() }, [])

    async function AnalyzeResume(resume_id) {

        try {

            let response = await AnalyzeResumeAPi(resume_id, jobDesc)

            if (response.status >= 200 && response.status < 300) {

                console.log("response result");
                
                console.log(response.data);

                navigate(`/resume-uplode/resume/${response.data.resume}/`)

            }

            Usage

        }
        catch (error) {

            alert(error.response.data.error)

        }

    }

    async function getResumeAPi() {

        try {

            let response = await GetResumesAPi()

            // console.log(response.data);

            setResume(response.data)

        }
        catch (error) {

            console.log('error', error);

        }


    }

    async function resumeDelete(resume_id) {

        let token = localStorage.getItem('token')

        console.log("process start");

        let headers = {

            'Authorization': token

        }

        let response = await axios.delete(`http://127.0.0.1:8000/resume/${resume_id}/`, { headers })

        if (response.status >= 200 && response.status < 300) {

            console.log("success");

            getResumeAPi()
        }
        else {

            console.log("error");

        }

    }
    return (
        <div>
            <div className="card">
                <div className="section-header">
                    <div>
                        <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Uploaded Resumes</h2>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{resumes?.length || 0} files stored</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="text" className="form-input text-sm" placeholder="Search files…" style={{ width: '180px' }} />
                    </div>
                </div>

                <div className="space-y-3">
                    {resumes?.map((resume, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl border"
                            style={{
                                borderColor: 'var(--color-border)',
                                background: 'var(--color-surface)'
                            }}
                        >

                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{
                                    background: resume.analyze
                                        ? 'var(--color-teal-lt)'
                                        : '#f1f5f9'
                                }}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={
                                        resume.analyze
                                            ? 'var(--color-teal)'
                                            : 'var(--color-muted)'
                                    }
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                                
                                <p className="text-sm font-semibold truncate">
                                    {resume.file.split('/resume/')[1]}
                                </p>

                                <p
                                    className="text-xs"
                                    style={{ color: 'var(--color-muted)' }}
                                >
                                    {resume.uploaded_at}
                                </p>

                            </div>

                            {/* STATUS */}

                            {
                                resume.analyze ? (

                                    <div className="badge badge-teal">
                                        Analyzed
                                    </div>

                                ) : (

                                    <div className="badge badge-slate">
                                        Not Analyzed
                                    </div>

                                )
                            }

                            {/* BUTTONS */}

                            <div className="flex items-center gap-2">

                                {
                                    resume.analyze ? (

                                        <Link
                                            to={`resume/${resume.id}`}
                                            className="btn-primary text-xs px-3 py-1.5"
                                        >
                                            View Results
                                        </Link>

                                    ) : (

                                        <button
                                            onClick={() => AnalyzeResume(resume.id)}
                                            className="btn-primary text-xs px-3 py-1.5"
                                        >
                                            Analyze Now
                                        </button>

                                    )
                                }

                                <button className="btn-secondary text-xs px-3 py-1.5">
                                    Download
                                </button>

                                <button
                                    onClick={() => resumeDelete(resume.id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                                    style={{
                                        border: '1.5px solid var(--color-border)'
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--color-rose)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>

                                </button>

                            </div>

                        </div>
                    ))}

                    {/* {resumes?.map((resume, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border);background:var(--color-surface)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-teal-lt)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{resume.file.split('/resume/')[1]}</p>
                                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>2.4 MB · {resume.uploaded_at}</p>
                            </div>
                            <div className="badge badge-teal">Analyzed</div>
                            <div className="flex items-center gap-2">
                                <Link to={`resume/${resume?.id}`} className="btn-primary text-xs px-3 py-1.5">View Results</Link>
                                <button className="btn-secondary text-xs px-3 py-1.5">Download</button>
                                <button onClick={() => resumeDelete(resume?.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ border: '1.5px solid var(--color-border)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))} */}


                    {/* <!-- File Item 1 — Uploaded / Analyzing --> */}
                    {/* <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border);background:var(--color-surface)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-teal-lt)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">alex_resume_v3.pdf</p>
                            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>2.4 MB · Uploaded Apr 24, 2025 at 10:02 AM</p>
                        </div>
                        <div className="badge badge-teal">Analyzed</div>
                        <div className="flex items-center gap-2">
                            <a href="analyze.html" className="btn-primary text-xs px-3 py-1.5">View Results</a>
                            <button className="btn-secondary text-xs px-3 py-1.5">Download</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ border: '1.5px solid var(--color-border)' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                            </button>
                        </div>
                    </div> */}


                    {/* <!-- File Item 2 — Processing --> */}
                    {/* <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-amber)', background: 'var(--color-amber-lt)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'white' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">alex_fullstack.pdf</p>
                            <p className="text-xs" style={{ color: 'var(--color-amber-dk)' }}>1.8 MB · Analyzing… 68% complete</p>
                            <div className="progress-bar-track mt-2" style={{ background: 'rgba(245,158,11,.2)' }}>
                                <div className="progress-bar-fill" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                        <div className="badge badge-amber">Processing</div>
                        <button className="btn-secondary text-xs px-3 py-1.5" disabled>Please wait…</button>
                    </div> */}



                    {/* <!-- File Item 5 — Not analyzed yet --> */}
                    {/* <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#f1f5f9' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">resume_backup_old.pdf</p>
                            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>1.2 MB · Uploaded Mar 30, 2025 at 2:00 PM</p>
                        </div>
                        <div className="badge badge-slate">Not Analyzed</div>
                        <div className="flex items-center gap-2">
                            <button className="btn-primary text-xs px-3 py-1.5">Analyze Now</button>
                            <button className="btn-secondary text-xs px-3 py-1.5">Download</button>
                            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors" style={{ border: '1.5px solid var(--color-border)' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                            </button>
                        </div>
                    </div> */}

                </div>
                {/* <!-- /file list --> */}
            </div>
        </div>
    )
}

export default ListResumes