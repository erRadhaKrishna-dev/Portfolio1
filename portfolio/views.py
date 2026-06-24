from django.shortcuts import render
from django.views.decorators.csrf import requires_csrf_token


@requires_csrf_token
def bad_request(request, exception=None):
    return render(request, 'error/400.html', status=400)

def page_not_found(request, exception=None):
    return render(request, 'error/404.html', status=404)

def service_unavailable(request, exception=None):
    return render(request, 'error/503.html', status=503)