import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { GetJobDescriptionApi } from '../services/api'
import { useParams } from 'react-router-dom'

function RetriveJobDesc() {

    let [jobdesc, setJobDesc] = useState()

    let {id} = useParams()

    useEffect(() => {GetJobDesc()}, [])
    
    async function GetJobDesc(){

        try{

            let response = await GetJobDescriptionApi(id)

            if (response.status >= 200 && response.status < 300){
            
                console.log(response.data);

                setJobDesc(response.data)
                
            }

        }
        catch (error){

            console.log(error);
            
        }
        
    }

    return (

        <main className="main-content ">


            {/* <!-- Top Bar --> */}
            <Header></Header>
            <SideBar></SideBar>
            <div className="flex-1 p-8  flex justify-center items-center">
                <div className="flex justify-center items-center" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>

                    {/* <!-- RIGHT: ADD NEW FORM --> */}
                    <div className="card sticky" style={{ top: '88px' }}>

                        {/* <!-- Form --> */}
                        <form className="space-y-4 w-120">
                            <div>
                                <label className="form-label">Job Title </label>
                                <input  type="text" className="form-input"  value={jobdesc?.title} />
                            </div>

                            <div>
                                <label className="form-label">Company Name</label>
                                <input type="text" className="form-input" value={jobdesc?.company_name} />
                            </div>

                            <div>
                                <label className="form-label">Job Description </label>
                                <textarea  className="form-input" rows="8"
                                    value={jobdesc?.description}
                                    style={{ resize: 'vertical', minHeight: '160px', maxHeight:'100px' }}></textarea>
                                <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>0 / 5,000 characters</p>
                            </div>

                            <div>
                                <label className="form-label">Tags</label>
                                <input  ype="text" className="form-input" value={jobdesc?.tags.length > 0 ? jobdesc?.tags : "No JobDescription Provided"}/>
                                <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>Separate tags with commas</p>
                            </div>

                        </form>

                    </div>
                    {/* <!-- /add form --> */}

                </div>
                {/* <!-- /grid --> */}
            </div>
            {/* <!-- /page body --> */}
        </main>
    )
}

export default RetriveJobDesc