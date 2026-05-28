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
import ProductRoutes from './Components/ProductRoutes'

function App() {
    return (
        <div>
            <BrowserRouter>

                <Routes>
                    
                    <Route path='' element = {<SignIn></SignIn>}></Route>
                    <Route path='/register' element = {<Register></Register>}></Route>
                    
                    <Route path='/dashboard' element = {<ProductRoutes><Dashboard></Dashboard></ProductRoutes>}></Route>
                    <Route path='/resume-uplode' element = {<ProductRoutes><ResumeUplode></ResumeUplode></ProductRoutes>}></Route>
                    <Route path='/uploaded-resumes' element = {<ProductRoutes><ListResumes></ListResumes></ProductRoutes>}></Route>


                    {/* <Route path ='/resume/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/uploaded-resumes/resume/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route> */}

                    <Route path ='/resume/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route>
                    <Route path ='/uploaded-resumes/resume/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route>
                    <Route path ='/all-analyzes/resume/analyze/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route>
                    <Route path ='/resume/analyze/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route>
                    <Route path ='/dashboard/resume/analyze/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route> 
                    <Route path ='/resume-uplode/resume/:resumeId/' element = {<ProductRoutes><AnalyzedResume></AnalyzedResume></ProductRoutes>}></Route>

                    {/* <Route path ='/all-analyzes/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>
                    <Route path ='/dashboard/resume/analyze/:resumeId/' element = {<AnalyzeResult></AnalyzeResult>}></Route>  */}

                    <Route path ='/dashboard/resume/:resumeId/' element = {<ProductRoutes><AnalyzeResult></AnalyzeResult></ProductRoutes>}></Route>
                    <Route path='/recent-analyzes/' element = {<ProductRoutes><RecentAnalyze></RecentAnalyze></ProductRoutes>}></Route>

                    <Route path='/all-analyzes/' element = {<ProductRoutes><Analyzes></Analyzes></ProductRoutes>}></Route>
                    <Route path='/analyze-result/' element = {<ProductRoutes><AnalyzeResult></AnalyzeResult></ProductRoutes>}></Route>

                    <Route path='/job-desctiption/' element = {<ProductRoutes><JobDescription></JobDescription></ProductRoutes>}></Route>
                    <Route path='/description-edit/:id/' element = {<ProductRoutes><UpdateJobDescription></UpdateJobDescription></ProductRoutes>}></Route>
                    <Route path='/get-description/:id/' element = {<ProductRoutes><RetriveJobDesc></RetriveJobDesc></ProductRoutes>}></Route>

                    <Route path='/subscription/' element = {<ProductRoutes><Subscriptions></Subscriptions></ProductRoutes>}></Route>
                    <Route path='/usage/' element = {<ProductRoutes><Usage></Usage></ProductRoutes>}></Route>
                    
                    
                </Routes>

            </BrowserRouter>

            
        </div>
    )
}
    
export default App