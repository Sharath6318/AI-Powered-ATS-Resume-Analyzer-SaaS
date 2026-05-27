
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { RetriveAnalyzeResumeApi } from '../services/api'

function AnalyzedResume() {

    let [analyze, setAnalyze] = useState()

    const [animatedScore, setAnimatedScore] = useState(0);
    const [keywordmatchingrate, setKeywordmatchingrate] = useState(0);
    const [formattingreadiability, setFormattingreadiability] = useState(0);
    const [sectioncompleteness, setSectioncompleteness] = useState(0);
    const [skillrelevance, setSkillrelevance] = useState(0);
    const [quantifiedachievements, setQuantifiedachievements] = useState(0);

    // #Dynamic ats score
    useEffect(() => {

        if (!analyze?.ats_score) return;

        let current = 0;

        const target = analyze.ats_score;

        const interval = setInterval(() => {

            current += 1;

            setAnimatedScore(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);

    // #Dynamic keywordmatchingrate
    useEffect(() => {
        analyze?.score_breakdown[0].score

        if (!analyze?.score_breakdown[0].score) return;

        let current = 0;

        const target = analyze.score_breakdown[0].score;

        const interval = setInterval(() => {

            current += 1;

            setKeywordmatchingrate(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);

    useEffect(() => {
        analyze?.score_breakdown[1].score

        if (!analyze?.score_breakdown[1].score) return;

        let current = 0;

        const target = analyze.score_breakdown[1].score;

        const interval = setInterval(() => {

            current += 1;

            setFormattingreadiability(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[2].score

        if (!analyze?.score_breakdown[2].score) return;

        let current = 0;

        const target = analyze.score_breakdown[2].score;

        const interval = setInterval(() => {

            current += 1;

            setSectioncompleteness(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[3].score

        if (!analyze?.score_breakdown[3].score) return;

        let current = 0;

        const target = analyze.score_breakdown[3].score;

        const interval = setInterval(() => {

            current += 1;

            setSkillrelevance(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[4].score

        if (!analyze?.score_breakdown[4].score) return;

        let current = 0;

        const target = analyze.score_breakdown[4].score;

        const interval = setInterval(() => {

            current += 1;

            setQuantifiedachievements(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);

    var matching_rate = ""

    const { resumeId } = useParams()

    useEffect(() => { analyzeResume() }, [])

    async function analyzeResume() {

        // console.log(resumeId);

        // let headers = {

        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5NzM1ODM5LCJpYXQiOjE3NzcxNDM4MzksImp0aSI6IjIyZWQwMzE3MzUwNzQ1ZDM4YmQ3YzJkZjI2MmVhNDFkIiwidXNlcl9pZCI6IjIifQ.ZfMMqlMlpbWLXtxtNyQY4eK9r-svdwN5YwOTOdRDjpE'
        // }

        // let response = await axios.get(`http://127.0.0.1:8000/resume-analyze/${resumeId}/`, { headers })

        try{


            let response = await RetriveAnalyzeResumeApi(resumeId)

            if (response.status >= 200 && response.status < 300) {
    
                console.log('success');
    
                console.log(response.data);
    
                setAnalyze(response.data.analyze)
    
            }
        }

        catch (error){

            alert(error.response?.data?.error)
        }

    }

    const score = analyze?.ats_score || 0;

    let scoreColor = '';

    if (score >= 85) {
        scoreColor = '';
    }
    else if (score >= 70) {
        scoreColor = '#3b82f6'; // blue
    }
    else if (score >= 50) {
        scoreColor = '#f59e0b'; // amber
    }
    else {
        scoreColor = '#ef4444'; // red
    }

    return (
        <div>
            <div>

                <div class="app-layout">


                    {/* <!-- ══════════════════════════════════════════════ */}
                    SIDEBAR
                    {/* ══════════════════════════════════════════════ --> */}
                    <SideBar></SideBar>

                    {/* <!-- ══════════════════════════════════════════════ */}
                    MAIN CONTENT
                    {/* ══════════════════════════════════════════════ --> */}
                    <main class="main-content">


                        {/* <!-- Top Bar --> */}
                        <Header></Header>

                        <div class="flex-1 p-8 space-y-8">


                            {/* <!-- ── TOP ROW: Score + Breakdown ────────────────── --> */}
                            <div class="grid gap-6" style={{ gridTemplateColumns: '280px 1fr' }}>


                                {/* <!-- ATS Score Ring --> */}
                                <div class="card flex flex-col items-center justify-center text-center" style={{ padding: '32px 24px' }}>
                                    <p class="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)', letterSpacing: '.1em' }}>ATS Score</p>


                                    {/* <!-- SVG Ring --> */}
                                    <div class="relative" style={{ width: '160px ', height: '160px' }}>
                                        <svg viewBox="0 0 100 100" width="160" height="160">
                                            <circle class="score-ring-track" cx="50" cy="50" r="45" />
                                            <circle class="score-ring-fill" cx="50" cy="50" r="45" style={{ stroke: scoreColor, strokeDashoffset: 104 - animatedScore, transition: 'stroke-dashoffset 0.2s linear' }} />
                                        </svg>
                                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                                            <span class="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-amber-dk)' }}>{animatedScore}</span>
                                            <span class="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>/ 100</span>
                                        </div>
                                    </div>

                                    <div class="badge badge-teal mt-4 text-sm px-4 py-1">{analyze?.matching_rates}</div>
                                    <p class="text-xs mt-3" style={{ color: 'var(--color-muted)' }}>Your resume is well-optimized<br />for ATS systems</p>
                                </div>


                                {/* <!-- Score Breakdown --> */}
                                <div class="card">
                                    <h2 class="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>Score Breakdown</h2>
                                    <div class="space-y-4">
                                        <div>
                                            <div class="flex items-center justify-between text-sm mb-1.5">
                                                <span class="font-medium">{analyze?.score_breakdown[0].title}</span>
                                                <span class="font-bold" style={{ color: 'var(--color-teal)' }}>{keywordmatchingrate}%</span>
                                            </div>
                                            <div class="progress-bar-track">
                                                <div class="progress-bar-fill" style={{ width: `${keywordmatchingrate}%`, background: 'var(--color-teal)', transition: 'stroke-dashoffset 0.2s linear' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between text-sm mb-1.5">
                                                <span class="font-medium">{analyze?.score_breakdown[1].title}</span>
                                                <span class="font-bold" style={{ color: 'var(--color-amber-dk)' }}>{formattingreadiability}%</span>
                                            </div>
                                            <div class="progress-bar-track">
                                                <div class="progress-bar-fill" style={{ width: `${formattingreadiability}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between text-sm mb-1.5">
                                                <span class="font-medium">{analyze?.score_breakdown[2].title}</span>
                                                <span class="font-bold" style={{ color: 'var(--color-teal)' }}>{sectioncompleteness}%</span>
                                            </div>
                                            <div class="progress-bar-track">
                                                <div class="progress-bar-fill" style={{ width: `${sectioncompleteness}%`, background: 'var(--color-teal)' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between text-sm mb-1.5">
                                                <span class="font-medium">{analyze?.score_breakdown[3].title}</span>
                                                <span class="font-bold" style={{ color: 'var(--color-amber-dk)' }}>{skillrelevance}%</span>
                                            </div>
                                            <div class="progress-bar-track">
                                                <div class="progress-bar-fill" style={{ width: `${skillrelevance}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between text-sm mb-1.5">
                                                <span class="font-medium">{analyze?.score_breakdown[4].title}</span>
                                                <span class="font-bold" style={{ color: 'var(--color-rose)' }}>{quantifiedachievements}%</span>
                                            </div>
                                            <div class="progress-bar-track">
                                                <div class="progress-bar-fill" style={{ width: `${quantifiedachievements}%`, background: 'var(--color-rose)' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* <!-- /top row --> */}


                            {/* <!-- ── KEYWORDS ───────────────────────────────── --> */}
                            <div class="card">
                                <div class="section-header">
                                    <div>
                                        <h2 class="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Keyword Analysis</h2>
                                        <p class="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{analyze?.matching_keywords?.matched.length} matched · {analyze?.matching_keywords?.missing.length} missing · vs Senior Frontend Engineer JD</p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-teal)' }}>
                                            <div class="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-teal)' }}></div> Matched
                                        </div>
                                        <div class="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-rose)' }}>
                                            <div class="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-rose)' }}></div> Missing
                                        </div>
                                    </div>
                                </div>

                                {/* MATCHING KEYWORD */}
                                <div class="mb-4">
                                    <p class="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted);letter-spacing:.08em' }}>Matched Keywords</p>
                                    <div class="flex flex-wrap gap-2">
                                        {analyze?.matching_keywords?.matched?.length > 0 ? (
                                            analyze.matching_keywords.matched.map((keyword, index) => (
                                                <span className="keyword-tag" key={index}>
                                                    {keyword}
                                                </span>
                                            ))
                                        ) : (
                                            <p>No keywords available</p>
                                        )}

                                        {/* <span class="keyword-tag">TypeScript</span>
                                    <span class="keyword-tag">Node.js</span>
                                    <span class="keyword-tag">REST APIs</span>
                                    <span class="keyword-tag">Git</span>
                                    <span class="keyword-tag">Agile</span>
                                    <span class="keyword-tag">CSS / SCSS</span>
                                    <span class="keyword-tag">Webpack</span>
                                    <span class="keyword-tag">Unit Testing</span>
                                    <span class="keyword-tag">GraphQL</span>
                                    <span class="keyword-tag">CI/CD</span>
                                    <span class="keyword-tag">Docker</span>
                                    <span class="keyword-tag">Performance Optimization</span>
                                    <span class="keyword-tag">Accessibility (WCAG)</span> */}
                                    </div>
                                </div>

                                {/* MISSING KEYWORDS*/}
                                <div>
                                    <p class="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.08em' }}>Missing Keywords</p>
                                    <div class="flex flex-wrap gap-2">
                                        {analyze?.matching_keywords?.missing?.length > 0 ? (
                                            analyze?.matching_keywords?.missing?.map((keyword, index) => (

                                                <span class="keyword-tag missing" key={index}>{keyword}</span>

                                            ))
                                        ) : (
                                            <p>No Missing Keyword</p>
                                        )

                                        }


                                        {/* <span class="keyword-tag missing">Micro-frontends</span>
                                    <span class="keyword-tag missing">Figma collaboration</span> */}
                                    </div>
                                </div>
                            </div>


                            {/* <!-- ── SUGGESTIONS ────────────────────────────── --> */}
                            <div class="card">
                                <div class="section-header">
                                    <div>
                                        <h2 class="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>AI Improvement Suggestions</h2>
                                        <p class="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{analyze?.suggestions?.improvements?.length} actionable recommendations from our AI</p>
                                    </div>
                                    <div class="badge badge-amber">{analyze?.suggestions?.improvements?.length} suggestions</div>
                                </div>

                                <div class="space-y-3">

                                    {analyze?.suggestions?.improvements?.length > 0 ? (

                                        analyze?.suggestions?.improvements?.map((contents, index) => (

                                            <div class="suggestion-item" key={index}>
                                                <div class="s-icon">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p class="text-sm font-semibold mb-0.5">{contents}</p>
                                                    <p class="text-sm" style={{ color: 'var(--color-muted)' }}>{contents}</p>
                                                </div>
                                                <div class="badge badge-rose ml-auto shrink-0">High Impact</div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No suggestion</p>
                                    )

                                    }


                                    {/* <div class="suggestion-item">
                                    <div class="s-icon">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-0.5">Quantify your performance achievements</p>
                                        <p class="text-sm" style={{ color: 'var(--color-muted)' }}>Replace vague descriptions like "improved site performance" with metrics: "Improved Lighthouse score from 64 → 95, reducing LCP by 40%." Numbers stand out to both ATS and hiring managers.</p>
                                    </div>
                                    <div class="badge badge-rose ml-auto shrink-0">High Impact</div>
                                </div>

                                <div class="suggestion-item">
                                    <div class="s-icon" style={{ background: 'var(--color-indigo-lt)', color: 'var(--color-indigo)' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-0.5">Mention micro-frontend experience</p>
                                        <p class="text-sm" style={{ color: 'var(--color-muted)' }}>The role emphasizes micro-frontend architecture. Even indirect experience (e.g., module federation, independent deployable units) should be surfaced in your work history bullets.</p>
                                    </div>
                                    <div class="badge badge-amber ml-auto shrink-0">Medium</div>
                                </div>

                                <div class="suggestion-item">
                                    <div class="s-icon" style={{ background: 'var(--color-indigo-lt);color:var(--color-indigo)' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-0.5">Add a concise professional summary</p>
                                        <p class="text-sm" style={{ color: 'var(--color-muted)' }}>A 2–3 line summary at the top of your resume targeting "Senior Frontend Engineer" will help ATS parsers and hiring managers immediately understand your fit.</p>
                                    </div>
                                    <div class="badge badge-amber ml-auto shrink-0">Medium</div>
                                </div>

                                <div class="suggestion-item">
                                    <div class="s-icon" style={{ background: 'var(--color-teal-lt)', color: 'var(--color-teal)' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-0.5">Highlight cross-functional collaboration</p>
                                        <p class="text-sm" style={{ color: 'var(--color-muted)' }}>The JD mentions "Figma collaboration" and working with designers. Add a sentence about design system contributions or component library handoffs in your latest role.</p>
                                    </div>
                                    <div class="badge badge-teal ml-auto shrink-0">Low</div>
                                </div>

                                <div class="suggestion-item">
                                    <div class="s-icon" style={{ background: 'var(--color-teal-lt) ', color: 'var(--color-teal)' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-0.5">Ensure consistent date formatting</p>
                                        <p class="text-sm" style={{ color: 'var(--color-muted)' }}>Your work experience uses mixed date formats ("Jan 2022" and "2022–23"). Standardize to "Month YYYY – Month YYYY" for better ATS parsing accuracy.</p>
                                    </div>
                                    <div class="badge badge-teal ml-auto shrink-0">Low</div>
                                </div> */}

                                </div>
                            </div>
                            {/* <!-- /suggestions --> */}

                        </div>
                        {/* <!-- /page body --> */}
                    </main>

                </div>
            </div>
        </div>
    )
}

export default AnalyzedResume