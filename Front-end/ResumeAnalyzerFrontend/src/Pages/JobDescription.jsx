import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import axios from 'axios'
import ListJobDescription from './ListJobDescription'
import Header from '../Components/Header'
import { CreateJobDescriptionApi } from '../services/api'

function JobDescription() {

  let [description, setDescription] = useState({
    "title": "",
    "company_name": "",
    "tags": "",
    "description": ""
  })

  async function handleButtonSubmit(e) {

    let response = await CreateJobDescriptionApi(description)

    try {

      if (response.status >= 200 && response.status < 300) {

        console.log('success');

        console.log(response.data)

      }
    } catch (error) {

      console.log(error);

    }

    // async function createJobDescriptionApi() {


    //   let headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5NzM1ODM5LCJpYXQiOjE3NzcxNDM4MzksImp0aSI6IjIyZWQwMzE3MzUwNzQ1ZDM4YmQ3YzJkZjI2MmVhNDFkIiwidXNlcl9pZCI6IjIifQ.ZfMMqlMlpbWLXtxtNyQY4eK9r-svdwN5YwOTOdRDjpE'
    //   }

    //   try {

    //     let response = await axios.post('http://127.0.0.1:8000/job-description/', description, { headers })

    //     if (response.status >= 200 && response.status < 300) {

    //       console.log('success');

    //       // console.log(response.data)

    //     }
    //   } catch (error) {

    //     console.log(error);

    //   }
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
          <main className="main-content">


            {/* <!-- Top Bar --> */}
            <Header></Header>
            <div className="flex-1 p-8">
              <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>


                {/* <!-- LEFT: JD LIST --> */}
                <ListJobDescription></ListJobDescription>
                {/* <!-- /JD list --> */}

                {/* <!-- RIGHT: ADD NEW FORM --> */}
                <div className="card sticky" style={{ top: '88px' }}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-amber-lt)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber-dk)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>Add New Job Description</h2>
                      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Uses 1 credit · paste directly from the job posting</p>
                    </div>
                  </div>


                  {/* <!-- Form --> */}
                  <form onSubmit={handleButtonSubmit} className="space-y-4">
                    <div>
                      <label className="form-label">Job Title <span style={{ color: 'var(--color-rose)' }}>*</span></label>
                      <input onChange={(e) => setDescription({ ...description, title: e.target.value })} type="text" className="form-input" placeholder="e.g. Senior Backend Engineer" />
                    </div>

                    <div>
                      <label className="form-label">Company Name <span style={{ color: 'var(--color-muted)', fontWeight: '400' }}>(optional)</span></label>
                      <input onChange={(e) => setDescription({ ...description, company_name: e.target.value })} type="text" className="form-input" placeholder="e.g. Acme Technologies" />
                    </div>

                    <div>
                      <label className="form-label">Job Description <span style={{ color: 'var(--color-rose)' }}>*</span></label>
                      <textarea onChange={(e) => setDescription({ ...description, description: e.target.value })} className="form-input" rows="8"
                        placeholder="Paste the full job description here. The more complete the JD, the more accurate the keyword analysis will be…"
                        style={{ resize: 'vertical', minHeight: '160px' }}></textarea>
                      <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>0 / 5,000 characters</p>
                    </div>

                    <div>
                      <label className="form-label">Tags <span style={{ color: 'var(--color-muted)', fontWeight: '400' }}>(optional)</span></label>
                      <input type="text" className="form-input" placeholder="e.g. frontend, react, startup" />
                      <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>Separate tags with commas</p>
                    </div>


                    {/* <!-- CTA --> */}
                    <div className="pt-2 space-y-2">
                      <button type='submit' className="btn-primary w-full justify-center">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                        </svg>
                        Save Job Description
                      </button>
                      <button className="btn-secondary w-full justify-center">Clear Form</button>
                    </div>


                    {/* <!-- Info note --> */}
                    <div className="rounded-xl p-3 flex gap-2.5 text-xs" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <p style={{ color: 'var(--color-muted)' }}>Saving a job description costs <strong>1 credit</strong>. You can then use it for free across all your resume analyses.</p>
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

  export default JobDescription