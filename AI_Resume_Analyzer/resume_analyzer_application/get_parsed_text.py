import PyPDF2
from docx import Document


def extract_text(file):

    text = ''

    if file.name.endswith('.pdf'):

        pdf = PyPDF2.PdfReader(file)

        for page in pdf.pages:

            text += page.extract_text() or ''

    elif file.name.endswith('.docx'):

        doc = Document(file)

        for para in doc.paragraphs:

            text += para.text

    return text



            

        





