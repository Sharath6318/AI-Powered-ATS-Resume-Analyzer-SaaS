import React from 'react'
import Dashboard from './Pages/Dashboard'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import ResumeUplode from './Pages/ResumeUplode'
import ResumeAnalyze from './Pages/ResumeAnalyze'
import RecentAnalyze from './Pages/RecentAnalyze'
import ListResumes from './Pages/ListResumes'
import Analyzes from './Pages/Analyzes'
import Summary from './Pages/Summary'
import AnalyzedResume from './Pages/AnalyzedResume'
import AnalyzeResult from './Pages/AnalyzeResult'
import JobDescription from './Pages/JobDescription'
import UpdateJobDescription from './Pages/UpdateJobDescription'
import Register from './Pages/Register'
import SignIn from './Pages/SignIn'
import RetriveJobDesc from './Pages/RetriveJobDesc'
import Subscriptions from './Pages/Subscriptions'
import Usage from './Pages/Usage'

function App() {
    return (
        <div>
            <BrowserRouter>

                <Routes>
                    
                    <Route path='' element = {<SignIn></SignIn>}></Route>

                    <Route path='/register' element = {<Register></Register>}></Route>
                    <Route path='/dashboard' element = {<Dashboard></Dashboard>}></Route>
                    <Route path='/resume-uplode' element = {<ResumeUplode></ResumeUplode>}></Route>
                    <Route path='/uploaded-resumes' element = {<ListResumes></ListResumes>}></Route>


                    {/* <Route path ='/resume/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/uploaded-resumes/resume/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route> */}

                    <Route path ='/resume/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route>
                    <Route path ='/uploaded-resumes/resume/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route>
                    <Route path ='/all-analyzes/resume/analyze/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route>
                    <Route path ='/resume/analyze/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route>
                    <Route path ='/dashboard/resume/analyze/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route> 
                    <Route path ='/resume-uplode/resume/:resumeId/' element = {<AnalyzedResume></AnalyzedResume>}></Route>

                    {/* <Route path ='/all-analyzes/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/dashboard/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>  */}

                    <Route path ='/dashboard/resume/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path='/recent-analyzes/' element = {<RecentAnalyze></RecentAnalyze>}></Route>

                    <Route path='/all-analyzes/' element = {<Analyzes></Analyzes>}></Route>
                    <Route path='/analyze-result/' element = {<AnalyzeResult></AnalyzeResult>}></Route>

                    <Route path='/job-desctiption/' element = {<JobDescription></JobDescription>}></Route>
                    <Route path='/description-edit/:id/' element = {<UpdateJobDescription></UpdateJobDescription>}></Route>
                    <Route path='/get-description/:id/' element = {<RetriveJobDesc></RetriveJobDesc>}></Route>

                    <Route path='/subscription/' element = {<Subscriptions></Subscriptions>}></Route>
                    <Route path='/usage/' element = {<Usage></Usage>}></Route>
                    
                    
                </Routes>

            </BrowserRouter>

            
        </div>
    )
}
    
export default App