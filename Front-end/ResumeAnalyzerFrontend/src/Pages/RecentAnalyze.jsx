import axios from 'axios'
import React, { useEffect, useState } from 'react'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Link } from 'react-router-dom';
import { resume } from 'react-dom/server';
import { AllAnalyzesApi, GetAllResumeApi } from '../services/api';

dayjs.extend(relativeTime);


function RecentAnalyze() {

    let [analayze, setAnalyze] = useState()

    useEffect(() => {getAnalyzeResume()}, [])

    async function getAnalyzeResume() {

        try{

            let response = await AllAnalyzesApi()
    
            if (response.status >= 200 && response.status < 300){
    
                setAnalyze(response.data)

                console.log(response.data);
                
    
            }
        }

        catch (error){
            
            console.log(error);
        }

        
    }

    return (
        <div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Resume</th>
                        <th>Job Title</th>
                        <th>ATS Score</th>
                        <th>Keywords</th>
                        <th>Analyzed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {analayze?.slice(0, 5).map((analyzedata, index) => (

                    <tr key={index}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-indigo-lt)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{analyzedata.file_name}</p>
                                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>2.4 MB</p>
                                </div>
                            </div>
                        </td>
                        <td className="text-sm">{analyzedata.parsed_text[1]}</td>
                        <td>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-teal-lt);color:var(--color-teal)' }}>{analyzedata?.ats_score}</div>
                            </div>
                        </td>
                        <td><span className="badge badge-teal">{analyzedata?.matching_keywords?.matched?.length}</span></td>
                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>{dayjs(analyzedata?.created_at).fromNow()}</td>
                        <td><Link to={`resume/analyze/${analyzedata?.resume}`} className="text-xs font-semibold" style={{ color: 'var(--color-amber-dk)' }}>View →</Link></td>
                    </tr>

                    ))}
                    {/* <!-- Row 1 --> */}

                    {/* <!-- Row 2 --> */}
                    {/* <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-rose-lt)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">alex_fullstack.pdf</p>
                                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>1.8 MB</p>
                                </div>
                            </div>
                        </td>
                        <td className="text-sm">Full Stack Developer</td>
                        <td>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-amber-lt);color:var(--color-amber-dk)' }}>72</div>
                            </div>
                        </td>
                        <td><span className="badge badge-amber">9 matched</span></td>
                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>Yesterday</td>
                        <td><a href="analysis.html" className="text-xs font-semibold" style={{ color: 'var(--color-amber-dk)' }}>View →</a></td>
                    </tr> */}

                    {/* <!-- Row 3 --> */}
                    {/* <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-amber-lt)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">resume_product.pdf</p>
                                    <p className="text-xs" style={{ color: "var(--color-muted)" }}>3.1 MB</p>
                                </div>
                            </div>
                        </td>
                        <td className="text-sm">Product Manager</td>
                        <td>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-rose-lt);color:var(--color-rose)' }}>58</div>
                            </div>
                        </td>
                        <td><span className="badge badge-rose">6 matched</span></td>
                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>Apr 20</td>
                        <td><a href="analysis.html" className="text-xs font-semibold" style={{ color: 'var(--color-amber-dk)' }}>View →</a></td>
                    </tr> */}

                    {/* <!-- Row 4 --> */}
                    {/* <tr>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f1f5f9' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">alex_data_eng.docx</p>
                                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>980 KB</p>
                                </div>
                            </div>
                        </td>
                        <td className="text-sm">Data Engineer</td>
                        <td>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--color-teal-lt);color:var(--color-teal)' }}>81</div>
                            </div>
                        </td>
                        <td><span className="badge badge-teal">11 matched</span></td>
                        <td className="text-sm" style={{ color: 'var(--color-muted)' }}>Apr 18</td>
                        <td><a href="analysis.html" className="text-xs font-semibold" style={{ color: "var(--color-amber-dk)" }}>View →</a></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RecentAnalyze