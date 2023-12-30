from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    # path('differant-domain-variation-checker', diffDomainVariations, name='differant-domain-variation-checker'),
    path('domain-checker/', namemesh, name='domain-checker'),
    path('different-tld-check/', diffTlds, name='different-tld-check'),
    path('social-checker/', social_checker, name='social-checker'),
    path('different-platform-prices/', differentPlatformPrices, name='different-platform-prices'),
    path('trademark-checker/', trademark_checker, name='trademark-checker'),
    path('signup/', signup_view, name='signupo'),
    path('ai-domain-generator/', aiDomainGenerator, name='ai-domain-generator'),
    path('after-market/', afterMarket, name='after-market'),
    path('suggestion-engine/', suggestionEngine, name='suggestion-engine'),
    path('login/', login_view, name='login'), 
    path('logout/', logout_view, name='logout'),
    path('<slug:url>/', DomainGenetor, name='domain_generator'),
]
