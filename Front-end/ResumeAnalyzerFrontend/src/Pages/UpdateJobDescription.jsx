import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateJobDescription() {

    const {id} = useParams()

    var token = localStorage.getItem('token')

    let navigate = useNavigate()

    useEffect(() => {getJobDescription()}, [])

    let [description, setDescription] = useState({
        "title": "",
        "company_name": "",
        "tags": "",
        "description": ""
    })

    async function getJobDescription(){

        console.log(id);
        

        let headers = {
            'Authorization': token
        }

        let response = await axios.get(`http://127.0.0.1:8000/job-description/${id}/`, {headers})

        if (response.status >= 200 && response.status < 300){

            console.log(response.data);

            setDescription(response.data)

        }
        else{
            console.log("error...");
            
        }
    }

    function handleButtonSubmit(e) {

        e.preventDefault()

        setJobDescription()

    }

    async function setJobDescription() {


        let headers = {
            'Authorization': token
        }

        try {

            let response = await axios.put(`http://127.0.0.1:8000/job-description/${id}/`, description, { headers })

            if (response.status >= 200 && response.status < 300) {

                console.log('success');

                alert('Updated Successfully👍')

                navigate('/job-desctiption/')
                // navigate(`/description-edit/${id}/`)

                // console.log(response.data)

            }
        } catch (error) {

            console.log(error);

        }
    }

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
                <main className="main-content ">


                    {/* <!-- Top Bar --> */}
                    <Header></Header>
                    <div className="flex-1 p-8  flex justify-center items-center">
                        <div className="flex justify-center items-center" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>

                            {/* <!-- RIGHT: ADD NEW FORM --> */}
                            <div className="card sticky" style={{ top: '88px' }}>
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-amber-lt)' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>Update Job Description</h2>
                                    </div>
                                </div>


                                {/* <!-- Form --> */}
                                <form onSubmit={handleButtonSubmit} className="space-y-4 w-120 ">
                                    <div>
                                        <label className="form-label">Job Title <span style={{ color: 'var(--color-rose)' }}>*</span></label>
                                        <input onChange={(e) => setDescription({ ...description, title: e.target.value })} value={description.title} type="text" className="form-input" placeholder="e.g. Senior Backend Engineer" />
                                    </div>

                                    <div>
                                        <label className="form-label">Company Name <span style={{ color: 'var(--color-muted)', fontWeight: '400' }}>(optional)</span></label>
                                        <input onChange={(e) => setDescription({ ...description, company_name: e.target.value })} value={description.company_name} type="text" className="form-input" placeholder="e.g. Acme Technologies" />
                                    </div>

                                    <div>
                                        <label className="form-label">Job Description <span style={{ color: 'var(--color-rose)' }}>*</span></label>
                                        <textarea onChange={(e) => setDescription({ ...description, description: e.target.value })} value={description.description} className="form-input" rows="8"
                                            placeholder="Paste the full job description here. The more complete the JD, the more accurate the keyword analysis will be…"
                                            style={{ resize: 'vertical', minHeight: '160px' }}></textarea>
                                        <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>0 / 5,000 characters</p>
                                    </div>

                                    <div>
                                        <label className="form-label">Tags <span style={{ color: 'var(--color-muted)', fontWeight: '400' }}>(optional)</span></label>
                                        <input onChange={(e) => setDescription({ ...description, tags : e.target.value })} value={description.tags} type="text" className="form-input" placeholder="e.g. frontend, react, startup" />
                                        <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>Separate tags with commas</p>
                                    </div>


                                    {/* <!-- CTA --> */}
                                    <div className="pt-2 space-y-2">
                                        <button type='submit' className="btn-primary w-full justify-center">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                                                <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                                            </svg>
                                            Update Job Description
                                        </button>
                                    </div>


                                </form>

                            </div>
                            {/* <!-- /add form --> */}

                        </div>
                        {/* <!-- /grid --> */}
                    </div>
                    {/* <!-- /page body --> */}
                </main>

            </div>
        </div>
    )
}

export default UpdateJobDescription