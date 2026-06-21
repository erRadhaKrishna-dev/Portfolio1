from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/')
    live_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    technologies1 = models.CharField(max_length=200, blank=True)
    technologies2 = models.CharField(max_length=200, blank=True)
    technologies3 = models.CharField(max_length=200, blank=True)
    technologies4 = models.CharField(max_length=200, blank=True)
    technologies5 = models.CharField(max_length=200, blank=True)
    technologies6 = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title
    
class Skill(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField()

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100) 

    def __str__(self):
        return self.title
    
class Certificate(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='certificates/')
    link = models.URLField(blank=True)

    def __str__(self):
        return self.title
    
class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company}"
    
class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.degree} from {self.institution}"
    
class Hobby(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True)  # Optional icon field

    def __str__(self):
        return self.name
    


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=20, blank=True, default='')  
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name