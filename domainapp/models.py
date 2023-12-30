from django.db import models
from tinymce.models import HTMLField
from django.utils.text import slugify

class AfterMarketDomain(models.Model):
    domain = models.TextField()
    price = models.TextField()
    bids = models.TextField()
    ending = models.TextField()
    majestic_tf = models.TextField()
    majestic_mdp = models.TextField()
    majestic_cf = models.TextField()
    majestic_ttf = models.TextField()
    semrush_srust = models.TextField()
    semrush_srusk = models.TextField()
    semrush_srusr = models.TextField()
    semrush_srusc = models.TextField()
    majestic_bl = models.TextField()
    wby = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.domain
    

class DomainArticleGenetor(models.Model):
    name = models.CharField(max_length=100)
    article = HTMLField()
    url = models.SlugField(max_length=100, unique=True)

    def save(self, *args, **kwargs):
        # Automatically generate the slug when saving the Product
        self.url = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name