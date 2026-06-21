from django.contrib import admin

# Register your models here.
from .models import Certificate, Contact, Education, Experience, Hobby, Project, Service, Skill



from django.contrib import admin

admin.site.site_header = "RK Portfolio"
admin.site.site_title = "RK Admin"
admin.site.index_title = "Control Panel"

admin.site.register(Contact)
admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(Service)
admin.site.register(Certificate)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Hobby)

