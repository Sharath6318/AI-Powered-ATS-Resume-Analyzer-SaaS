from google import genai
from google.genai import types

from dotenv import load_dotenv
import os

load_dotenv()


def analyze_resume_with_gemini(resume_text, job_description):

    client = genai.Client(api_key=os.getenv('api_key'))

    prompt = f"""
    You are an advanced ATS (Applicant Tracking System) and professional technical recruiter.

    Your task is to analyze the candidate's resume against the provided job description.

    Evaluate the resume based on:

    1. Skills Match
    2. Experience Relevance
    3. Keyword Optimization
    4. ATS Compatibility
    5. Resume Quality & Clarity
    6. Technical Alignment with Job Requirements

    Scoring Rules:
    - Score must be between 0 and 100
    - Higher score means better alignment with the job description
    - Penalize missing critical skills
    - Reward strong technical relevance and measurable achievements

    Calculate individual scores (0-100) for the following breakdown categories:
    - Keyword Match Rate
    - Formatting & Readability
    - Section Completeness
    - Skills Relevance
    - Quantified Achievements

    Ensure score_breakdown values realistically align with the final ATS score.

    Return:
    - ATS score
    - Score breakdown
    - Matching keywords
    - Missing keywords
    - Resume strengths
    - Resume weaknesses
    - Actionable improvement suggestions

    -------------------------
    JOB DESCRIPTION:
    -------------------------
    {job_description[:3000]}

    -------------------------
    RESUME:
    -------------------------
    {resume_text[:4000]}
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction="""
                You are a professional ATS resume analyzer.

                IMPORTANT RULES:
                - Return ONLY valid JSON
                - Do NOT return markdown
                - Do NOT include explanation text
                - Do NOT wrap JSON in code blocks
                - Suggestions must be practical and concise
                - Missing keywords must come from the job description
                - score_breakdown scores must be integers between 0 and 100
                """,
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "score": {"type": "INTEGER"},
                        "score_breakdown": {
                            "type": "ARRAY",
                            "items": {
                                "type": "OBJECT",
                                "properties": {
                                    "title": {"type": "STRING"},
                                    "score": {"type": "INTEGER"},
                                },
                                "required": ["title", "score"],
                            },
                        },
                        "matching_keywords": {
                            "type": "ARRAY",
                            "items": {"type": "STRING"},
                        },
                        "missing_keywords": {
                            "type": "ARRAY",
                            "items": {"type": "STRING"},
                        },
                        "strengths": {"type": "ARRAY", "items": {"type": "STRING"}},
                        "weaknesses": {"type": "ARRAY", "items": {"type": "STRING"}},
                        "suggestions": {"type": "ARRAY", "items": {"type": "STRING"}},
                    },
                    "required": [
                        "score",
                        "score_breakdown",
                        "matching_keywords",
                        "missing_keywords",
                        "strengths",
                        "weaknesses",
                        "suggestions",
                    ],
                },
            ),
        )

        return response.parsed

    except Exception as e:

        return {
            "score": 0,
            "score_breakdown": [
                {"title": "Keyword Match Rate", "score": 0},
                {"title": "Formatting & Readability", "score": 0},
                {"title": "Section Completeness", "score": 0},
                {"title": "Skills Relevance", "score": 0},
                {"title": "Quantified Achievements", "score": 0},
            ],
            "matching_keywords": [],
            "missing_keywords": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": ["AI analysis failed"],
            "error": str(e),
        }

    # # def analyze_resume_with_gemini(resume_text):

    # client = genai.Client(api_key="AIzaSyD2SHuCa4AJicM_P5EE9m2r99WjIPbzQtQ")

    # prompt = f"""
    # You are an ATS (Applicant Tracking System).

    # Analyze the following resume.

    # Evaluation Criteria:
    # - Skills relevance (40%)
    # - Experience quality (30%)
    # - Resume formatting (15%)
    # - Keyword optimization (15%)

    # Resume:
    # {resume_text[:4000]}
    # """

    # try:
    #     response = client.models.generate_content(
    #         model="gemini-2.5-flash",
    #         contents=prompt,
    #         config=types.GenerateContentConfig(
    #             system_instruction="""
    #             You are a professional ATS resume analyzer.
    #             Return ONLY valid JSON. No explanation.
    #             """,
    #             response_mime_type="application/json",
    #             response_schema={
    #                 "type": "OBJECT",
    #                 "properties": {
    #                     "score": {"type": "INTEGER"},
    #                     "matching_keywords": {
    #                         "type": "ARRAY",
    #                         "items": {"type": "STRING"},
    #                     },
    #                     "missing_keywords": {
    #                         "type": "ARRAY",
    #                         "items": {"type": "STRING"},
    #                     },
    #                     "strengths": {"type": "ARRAY", "items": {"type": "STRING"}},
    #                     "weaknesses": {"type": "ARRAY", "items": {"type": "STRING"}},
    #                     "suggestions": {"type": "ARRAY", "items": {"type": "STRING"}},
    #                 },
    #                 "required": [
    #                     "score",
    #                     "matching_keywords",
    #                     "missing_keywords",
    #                     "suggestions",
    #                 ],
    #             },
    #         ),
    #     )

    #     return response.parsed

    # except Exception as e:
    #     return {
    #         "score": 0,
    #         "matching_keywords": [],
    #         "missing_keywords": [],
    #         "strengths": [],
    #         "weaknesses": [],
    #         "suggestions": ["AI processing failed"],
    #         "error": str(e),
    #     }
