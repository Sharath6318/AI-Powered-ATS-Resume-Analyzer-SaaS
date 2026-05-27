import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar';
import Header from '../Components/Header';
import RecentAnalyze from './RecentAnalyze';
import ResumeAnalyze from './ResumeAnalyze';
import { Link, useNavigate } from 'react-router-dom';
import ResumeUplode from './ResumeUplode';
import Summary from './Summary';

function Dashboard() {

  useEffect(() => {}, [])
  
  let [file, setFile] = useState(null)

  const navigate = useNavigate()

  function hadleButtonClick(e) {

    e.preventDefault()

    const formData = new FormData()
    formData.append("file", file)

    uplodeFile(formData)

  }

  async function uplodeFile(formData) {

    let token = localStorage.getItem('token')


    let headers = {
      "Authorization": token
    }

    try {

      let response = await axios.post('http://127.0.0.1:8000/resume/', formData, { headers })

      if (response.status >= 200 && response.status < 300) {

        console.log("Uploaded Sucess");

        const resumeId = response.data.id

        navigate(`/resume-uplode`)

        // const resumeid = response.data.id

        // await analyzeResume(resumeid, headers)

      }

    } catch (error) {

      console.log(error);

    }
  }

  // async function analyzeResume(resumeid, headers) {

  //   try {

  //     let response = axios.post(`http://127.0.0.1:8000/resume/${resumeid}/analyze/`, {headers})

  //     if (response.status >= 200 && response.status < 300){

  //       console.log("Analyze sucess");

  //     }

  //   }

  //   catch (error){

  //     console.log(error); 

  //   }

  //   }

  return (
    <div>
      <div className="app-layout">
        {/* <!-- ══════════════════════════════════════════════ */}
        SIDEBAR
        {/* ══════════════════════════════════════════════ --> */}
        <SideBar></SideBar>
        {/* <!-- /sidebar --> */}



        {/* <!-- ══════════════════════════════════════════════ */}
        MAIN CONTENT
        {/* ══════════════════════════════════════════════ --> */}
        <main className="main-content">


          {/* <!-- Top Bar --> */}
          <Header></Header>

          {/* <!-- Page Body --> */}
          <div className="flex-1 p-8 space-y-8">


            {/* <!-- ── STAT CARDS ───────────────────────────── --> */}
            <Summary></Summary>
            {/* <!-- /stat cards --> */}



            {/* <!-- ── UPLOAD + PLAN ROW ─────────────────────── --> */}
            <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>


              {/* <!-- Quick Upload --> */}
              <div className="card">
                <div className="section-header">
                  <div>
                    <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Quick Upload</h2>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Drop your resume to run a new analysis</p>
                  </div>
                  <Link to={'/uploaded-resumes'} className="btn-secondary text-sm">View All Resumes</Link>
                </div>
                <div className="upload-zone">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-amber-lt)' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-slate)' }}>Drag & drop your resume here</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>or click to browse — PDF, DOC, DOCX supported</p>
                  <div className='grid gap-2 w-50 mx-auto '>
                    <label className="btn-primary mt-5 mx-auto text-sm cursor-pointer">
                      Browse Files
                      <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <button onClick={hadleButtonClick} className='btn-primary mx-auto text-sm cursor-pointer'>Upload Resume</button>
                  </div>
                </div>
              </div>

              {/* <!-- Subscription Card --> */}
              <div className="card flex flex-col" style={{ background: 'var(--color-slate)', borderColor: 'rgba(255,255,255,.06)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="badge badge-amber">PRO</div>
                  <span className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>Current Plan</span>
                </div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'white' }}>Pro Plan</h3>
                <p className="text-sm mb-5" style={{ color: '#94a3b8' }}>Renews June 24, 2025</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#cbd5e1' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    100 credits / month
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#cbd5e1' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Unlimited resume storage
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#cbd5e1' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Advanced keyword analysis
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#cbd5e1' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Team workspace (Acme Corp)
                  </div>
                </div>
                <a href="subscription.html" className="btn-secondary mt-auto justify-center" style={{ borderColor: 'rgba(255,255,255,.12)', color: '#e2e8f0', background: 'rgba(255,255,255,.07)' }}>
                  Manage Subscription
                </a>
              </div>

            </div>
            {/* <!-- /upload + plan --> */}



            {/* <!-- ── RECENT ANALYSES ────────────────────────── --> */}
            <div className="card">
              <div className="section-header">
                <div>
                  <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Recent Analyses</h2>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Your latest resume evaluation results</p>
                </div>
                <Link to={'/all-analyzes'} href="analysis.html" className="btn-secondary text-sm">View All</Link>
              </div>

              <div className="overflow-x-auto">
                <RecentAnalyze></RecentAnalyze>
              </div>
            </div>
            {/* <!-- /recent analyses --> */}

          </div>
          {/* <!-- /page body --> */}

        </main>
        {/* <!-- /main content --> */}

      </div>
      {/* <!-- /app layout --> */}
    </div>
  )
}

export default Dashboard