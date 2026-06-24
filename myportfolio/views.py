from django.contrib import messages
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.conf import settings
from myportfolio.forms import ContactForm
from django.contrib.auth.decorators import login_required

from myportfolio.models import Hobby, Project, Service, Skill
from django.views.decorators.csrf import requires_csrf_token
# Create your views here.





def home(request):
    return render(request,"myportfolio/home.html")
def about(request):
    hobbies = Hobby.objects.all().order_by('id')

    context = {
        'projects_completed': Project.objects.count(),
        'happy_clients': 30,  
        'years_experience': 5, 
        'hobbies': hobbies,
        'hobbys_count': hobbies.count(),
    }
    return render(request,"myportfolio/about.html", context)
def service(request):
    services = Service.objects.all().order_by('id')
    context = {
        'services': services,
        'total_services': services.count()
    }
    return render(request,"myportfolio/service.html", context)
def skill(request):
    skills = Skill.objects.all().order_by('id')
    context = {
        'skills': skills,
        'total_skills': skills.count()
    }
    
    return render(request,"myportfolio/skill.html", context)
def project(request):
    projects = Project.objects.all().order_by('id')
    
    context = {
        'projects': projects,
        'total_projects': projects.count(),
    }
    return render(request,"myportfolio/project.html", context)

def download_resume(request):
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
            form.save() 
            messages.success(request, "Message sent successfully!") 
            return redirect('/contact')
    else:
        form = ContactForm()
    
    return render(request, 'myportfolio/contact.html', {'form': form})



@requires_csrf_token
def bad_request(request, exception=None):
    return render(request, 'error/400.html', status=400)

def page_not_found(request, exception=None):
    return render(request, 'error/404.html', status=404)

def service_unavailable(request, exception=None):
    return render(request, 'error/503.html', status=503)