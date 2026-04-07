from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from django.templatetags.static import static
from django.core.mail import send_mail
from django.conf import settings
import os

from myportfolio.forms import ContactForm

from myportfolio.forms import ContactForm

# Create your views here.

def home(request):
    return render(request,"myportfolio/home.html")
def about(request):
    return render(request,"myportfolio/about.html")
def service(request):
    return render(request,"myportfolio/service.html")
def skill(request):
    return render(request,"myportfolio/skill.html")
def project(request):
    return render(request,"myportfolio/project.html")

def download_resume(request):
    """Download resume as PDF or HTML"""
    # Try to use wkhtmltopdf/weasyprint for PDF conversion
    try:
        from django.template.loader import render_to_string
        from weasyprint import HTML, CSS
        import io
        
        # Render HTML
        html_string = render_to_string('resume_template.html')
        
        # Generate PDF
        html = HTML(string=html_string)
        pdf = html.write_pdf()
        
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="Resume_Radha_Krishna.pdf"'
        return response
    except:
        # Fallback: serve resume as HTML that user can print as PDF
        return render(request, 'resume_template.html', {
            'is_download': True
        })



def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact = form.save()

            # 🔥 Send Email
            send_mail(
                subject=f"New Contact: {contact.subject}",
                message=f"""
Name: {contact.name}
Email: {contact.email}

Message:
{contact.message}
                """,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=['krish.ra10.20@gmail.com'],
            )

            return render(request, 'myportfolio/contact.html', {
                'form': ContactForm(),
                'success': True
            })
    else:
        form = ContactForm()

    return render(request, 'myportfolio/contact.html', {'form': form})

