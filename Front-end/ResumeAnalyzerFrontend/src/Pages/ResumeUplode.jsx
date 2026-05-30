import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ListResumes from './ListResumes'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { FileUploadAPi, JobDescriptionlistApi } from '../services/api'
import { useNavigate } from 'react-router-dom'

function ResumeUplode() {

    let [file, setFile] = useState(null)

    // let [jobdesc, setJobDesc] = useState()

    const [jobDescriptions, setJobDescriptions] = useState([])

    const [selectedJob, setSelectedJob] = useState("")

    let navigate = useNavigate()

    useEffect(() => { getJobdescription() }, [])

    async function getJobdescription() {

        try {

            let response = await JobDescriptionlistApi()

            if (response.status >= 200 && response.status < 300) {

                setJobDescriptions(response.data)

                // console.log(response.data);

            }
        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleButtonClick(e) {

        e.preventDefault()

        const formdata = new FormData()

        formdata.append('file', file)

        // uplodeFile(formdata)  

        console.log(formdata);
        
                
        try {

            let response = await FileUploadAPi(formdata)
            
            if (response.status >= 200 && response.status < 300) {

                console.log("Success");

                console.log(response.data);

                window.location.reload()

                // navigate(`/resume/${response.data.id}/`)

            }

        } catch (error) {            

            console.log(error);

        }

    }

    // async function uplodeFile(formData) {


    //     let headers = {
    //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5NzM1ODM5LCJpYXQiOjE3NzcxNDM4MzksImp0aSI6IjIyZWQwMzE3MzUwNzQ1ZDM4YmQ3YzJkZjI2MmVhNDFkIiwidXNlcl9pZCI6IjIifQ.ZfMMqlMlpbWLXtxtNyQY4eK9r-svdwN5YwOTOdRDjpE"
    //     }

    //     try {

    //         let response = await axios.post('http://127.0.0.1:8000/resume/', formData, { headers })

    //         if (response.status >= 200 && response.status < 300) {

    //             console.log("Success");

    //             console.log(response.data);

    //         }

    //     } catch (error) {

    //         console.log(error);

    //     }

    // }

    return (
        <div>

            <div className="app-layout">


                {/* <!-- ══════════════════════════════════════════════ */}
                SIDEBAR
                {/* ══════════════════════════════════════════════ --> */}
                <SideBar></SideBar>


                {/* <!-- ══════════════════════════════════════════════ */}
                MAIN CONTENT
                {/* ══════════════════════════════════════════════ --> */}
                <main className="main-content">


                    {/* <!-- Top Bar --> */}
                    <Header></Header>
                    <div className="flex-1 p-8 space-y-8">


                        {/* <!-- ── UPLOAD AREA ────────────────────────────── --> */}
                        <div className="card">
                            <h2 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Add New Resume</h2>
                            <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>Supported formats: PDF, DOC, DOCX · Max file size: 10 MB</p>


                            {/* <!-- Drop Zone --> */}
                            <div className="upload-zone">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--color-amber-lt)' }}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Drag & drop your resume here</h3>
                                <p className="text-sm mb-5" style={{ color: 'var(--color-muted)' }}>or click the button below to browse from your computer</p>
                                <div className='grid gap-2 w-50 mx-auto'>
                                    <label className="btn-primary mx-auto">
                                        Browse Files
                                        <input type="file" className='hidden' onChange={(e) => setFile(e.target.files[0])} />
                                    </label>
                                    <button onClick={handleButtonClick} className="btn-primary mx-auto">Upload Resume</button>
                                </div>
                                <p className="text-xs mt-4" style={{ color: '#94a3b8' }}>Your files are encrypted and stored securely</p>
                            </div>


                            {/* <!-- Link to Job Description --> */}
                            <div className="mt-5 p-4 rounded-xl flex items-center gap-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--color-indigo-lt)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Match against a Job Description?</p>
                                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Select a saved job description to get targeted keyword analysis</p>
                                </div>
                                <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="form-input text-sm" style={{ width: 'auto', minWidth: '180px' }}>
                                    <option selected>Select Job Description</option>
                                    {jobDescriptions?.map((desc) => (
                                        <option key={desc.id} value={desc.id}>{desc.title}</option>
                                    ))}

                                </select>
                            </div>
                        </div>


                        {/* <!-- ── FILE LIST ──────────────────────────────── --> */}
                        <ListResumes jobDesc={selectedJob}></ListResumes>

                    </div>
                    {/* <!-- /page body --> */}

                </main>

            </div>

        </div>
    )
}

export default ResumeUplode