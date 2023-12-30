from django import template
import json

register = template.Library()

@register.filter
def comTldChecker(item):
    item = json.load(item)
    if item['.com'] == True:
        available = 'Available'
    return available
