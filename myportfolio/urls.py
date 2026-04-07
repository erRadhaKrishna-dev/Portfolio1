from django.urls import path
from . import views

urlpatterns=[
    path('',views.home),
    path("home/",views.home),
    path("about/",views.about),
    path("service/",views.service),
    path("skill/",views.skill),
    path("project/",views.project),
    path("contact/",views.contact),
    path("download-resume/",views.download_resume, name='download_resume'),
    ]