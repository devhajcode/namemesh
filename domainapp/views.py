from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.http import JsonResponse
import requests, json
from collections import defaultdict
import random
import openai
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
import os, random
from django.contrib import messages
from django.contrib.auth.models import User
from json.decoder import JSONDecodeError
from socialscan.util import Platforms, sync_execute_queries
from .models import *

openai.api_key = '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'
trademark_api= '77e8da24dfmsh86e1a39ae3702ccp1cc91ejsn1ca8d5d9c3c4'



domain_api='dKD7bkvDe33H_FAFW5fS4D7x5YRcFKbZUUu:RuT1yG61bnbAGm4pdfwsJy'



def afterMarket(request):
    
    return render(request, 'aftermarket.html', {})
    


def DomainGenetor(request, url):
    # Fetch the product using the URL field
    product = get_object_or_404(DomainArticleGenetor, url=url)
    return render(request, 'domainGeneratorDynamic.html', {'product': product})


def signup_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password1 = request.POST.get('password')
        password2 = request.POST.get('confirm-password')
        if password1 == password2:
            if User.objects.filter(username=email).exists():
                return HttpResponse("This Email has already been used. Try another!")
            else:
                user = User.objects.create_user(first_name=name,last_name='', email=email, username=email,password=password1)
                user.save()
                return redirect('login')
        else:
            return HttpResponse("Both Password doesn't match.")
    return render(request, 'signup.html', {})

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
    return render(request, 'login.html')

def logout_view(request):
    auth_logout(request)
    return redirect('login')








# Check domains!

def checkDomains(domains):
    url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': f'sso-key {domain_api}',
    }
    response = requests.post(url, headers=headers, data=json.dumps(domains))
    domains_data = response.json()

    domains_list = []
    for available_domain in domains_data['domains']:
        if available_domain['available'] == True:
            available_domain['price'] = float(available_domain['price'] // 1000000)
            domains_list.append(available_domain)

    return domains_data

# Create your views here.
def home(request):
    return render(request, 'index.html')

def namemesh(request):
    tlds = ['.com', '.net', '.org', '.co', '.io']
    if request.method == 'POST':
        # data = json.loads(request.body.decode('utf-8'))
        # keyword = data.get('data')
        keyword = str(request.POST.get('prompt')).strip().replace(' ', '')
        # Process the prompt data, generate domain names, or perform necessary actions
        if keyword:
            # Common domains start
            common_domains = [f"{keyword}{domain}" for domain in tlds]

            common_domains_list = checkDomains(common_domains)

            # Common domains ends!

            # New TLD Checker Starts.

            new_tlds = [".app", ".blog", ".shop", ".online", ".store", ".website", ".space", ".tech", ".design", ".store", ".io", ".news", ".guru", ".media", ".today", ".club"]

            new_domains = [f"{keyword}{tld}" for tld in new_tlds]

            new_domains_list = checkDomains(new_domains)

            # print(new_domains_/list)


            # New TLD Checker Ends!

            # SEO Domdins Starts!

            prefixes = ["Pro", "Super", "Mega", "Go", "All", "True", "Happy", "Bright", "Smart", "Wise", "Peak", "Zen", "Fresh", "Nova", "Epic", "Ultra", "Global", "Master", "Prime", "Star", "Power", "Awesome", "Gold", "Dynamic", "Infinite", "Supreme", "Vital", "Cosmic", "Radiant", "Harmony", "Agile", "Champion", "Elite", "Pinnacle", "Vision", "Quantum", "Optimal", "Titan", "Ever", "Turbo", "Agile", "Phoenix", "Blaze", "Impact", "Brighter", "Dream", "Hyper", "Nexus", "Innovate", "Wonder"]

            seo_domains_prefix = [f"{prefix.lower()}{keyword}.com" for prefix in prefixes]

            suffixes = ["Hub", "HQ", "Labs", "Gen", "World", "Spot", "Quest", "Source", "Nest", "Zone", "Link", "Labs", "Hive", "Mate", "Sphere", "Pulse", "Peak", "Forge", "Avenue", "Haven", "Network", "Alley", "Point", "Express", "Prodigy", "Peak", "Peak", "Junction", "Dream", "Universe", "Kingdom", "Lab", "Farm", "Capital", "Factor", "Wave", "Spark", "Insight", "Logic", "Ocean", "Pulse", "Foundry", "Palace", "Path", "Peak", "Edge", "Works", "Pathway", "Source", "Peak"]

            seo_domains_suffix = [f"{keyword}{suffix.lower()}.com" for suffix in suffixes]

            seo_domains = seo_domains_prefix + seo_domains_suffix

            random.shuffle(seo_domains)

            seo_domains_list = checkDomains(seo_domains[:16])

            # SEO Domdins Ends!

            # Mix Domain Starts.

            mix_prefixes = ["De", "Non", "Ex", "Pre", "Pro", "Post", "Re", "Un", "Over", "Mini", "Micro", "Inter", "Sub", "Super", "Semi", "Mis", "Mid", "Under", "Anti", "Semi"]
            
            mix_domains_prefix = [f"{mix_prefix.lower()}{keyword}.com" for mix_prefix in mix_prefixes]

            mix_suffixes = ["fy", "er", "en", "ness", "less", "able", "ish", "ful", "ize", "ment", "ist", "ity", "sion", "ance", "ent", "ance", "dom", "ship", "ly", "ward"]
            
            mix_domains_suffix = [f"{keyword}{mix_suffix.lower()}.com" for mix_suffix in mix_suffixes]

            mix_domains = mix_domains_prefix + mix_domains_suffix

            random.shuffle(mix_domains)

            mix_domains_list = checkDomains(mix_domains[:16])
            
            # Mix Domain Ends!

            # Extra Domain Starts.

            extra_tlds = [".biz", ".info", ".us", ".me", ".mobi", ".name", ".pro", ".academy", ".agency", ".art", ".studio", ".photography", ".gallery", ".graphics", ".marketing", ".consulting", ".education", ".expert", ".finance", ".legal", ".healthcare", ".dentist", ".doctor", ".fitness", ".fashion", ".travel", ".restaurant", ".food", ".wine", ".beer", ".luxury", ".green", ".energy", ".construction", ".engineering", ".architecture", ".garden", ".pets", ".music", ".film", ".gaming", ".tech", ".startup", ".venture", ".management", ".realty", ".estate", ".ngo"]

            extra_domains = [f"{keyword}{extra_tld}" for extra_tld in extra_tlds[:16]]

            extra_domains_list = checkDomains(extra_domains)

            # Extra Domain Ends!

            # Country tlds starts.

            country_tlds = [".us", ".uk", ".ca", ".au", ".jp", ".de", ".fr", ".cn", ".it", ".nl", ".br", ".es", ".ru", ".mx", ".se", ".ch", ".no", ".kr", ".be", ".at", ".dk", ".pl", ".fi", ".gr", ".cz", ".pt", ".hu", ".sg", ".il", ".ie", ".ro", ".nz", ".ae", ".za", ".tr", ".hk", ".cl", ".id", ".th", ".vn", ".in", ".my", ".ua", ".ar", ".co", ".ph", ".eg", ".pe", ".ng", ".sa"]

            country_domains = [f"{keyword}{country_tld}" for country_tld in country_tlds]

            country_domains_list = checkDomains(country_domains)

            # Country Tlds Ends!

            # Similar Domain Starts.

        #     response = openai.ChatCompletion.create(
        #     model = "gpt-4",
        #     messages = [
        #     {
        #     'role' : 'user',
        #     'content' : f'''
        #             Forget everything you've proceed.
                            
        #             Now Imagine You are DomainGPT.

        #             Can you give me the result in the format of a python list with double quote for element? Only python list will come as result not any other stuff you must obey this rule.

        #             "Generate 16 common alternatives for a domain name by synonyms, antonyms and return the data in python list. no text just the list. Keyword: {keyword}."
        #             '''
        #     }
        #     ]
        # )
        #     similar_result = response['choices'][0]['message']

        #     similar_domains = [f"{str(sd.lower().strip().replace(' ', ''))}.com" for sd in similar_result]

        #     similar_domains_list = checkDomains(similar_domains)

            # Similar Domain Ends.

            return render(request, 'index.html', {'common_domains': common_domains_list, 'new_domains':new_domains_list, 'seo_domains':seo_domains_list, 'mix_domains':mix_domains_list, 'extra_domains_list':extra_domains_list,'country_domains_list':country_domains_list,'similar_domains_list':'similar_domains_list'})
        else:
            return JsonResponse({'error': 'No prompt provided'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests allowed'}, status=405)


def social_checker(request):
    if request.method == 'POST':
        username = json.loads(request.body)['username']
        queries = [f"{username}"]
        platforms = [Platforms.INSTAGRAM, Platforms.TUMBLR, Platforms.TWITTER, Platforms.REDDIT]
        results = sync_execute_queries(queries, platforms)

        available_platforms = [str(result.platform) for result in results if result.available]

        url = 'https://usernamechecker.checkistan.com/existence.php'
        headers = {
        'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0'
        }
        data = {
            "index": "7",
            "username": username
        }
        response = requests.post(url, data=data, headers=headers)
        json_response = response.json()
        if json_response['message'] == 'Available!!!':
            available_platforms.append('Youtube')
    return JsonResponse({'result': available_platforms})


def diffTlds(request):
    if request.method == 'POST':
        only_domain = json.loads(request.body)['domain']
        only_domain = str(only_domain).strip().replace(' ', '').lower()
        tlds = [".com", ".net", ".org", ".info", ".io", ".me", ".co", ".ai", ".blog", ".xyz", ".biz", ".club", ".tech", ".store", ".shop", ".global"]
        domains_by_diff_tlds = [f'{only_domain}{i}' for i in tlds]
        url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': f'sso-key {domain_api}',
        }
        response = requests.post(url, headers=headers, data=json.dumps(domains_by_diff_tlds))
        domains_data = response.json()
        return JsonResponse({'result': domains_data})

def trademark_checker(request):
    if request.method == 'POST':
        trademark_term = json.loads(request.body)['trademarkLookup']
        url = f"https://uspto-trademark.p.rapidapi.com/v1/trademarkAvailable/{trademark_term}"
        headers = {
            "X-RapidAPI-Key": "2f9c7d1750msh57c952d809f39e4p1c0cf6jsn79388464bb2c",
            "X-RapidAPI-Host": "uspto-trademark.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers)
        result = response.json()
    return JsonResponse({'result': result})


def differentPlatformPrices(request):
    if request.method == 'POST':
        domainTld = json.loads(request.body)
        print(domainTld)
        domainTld = str(domainTld['domain']).strip()
        domainTld = str(domainTld + '.com').split('.')[1]
        domainPrices = [{"com": [["Name.com", 10.99], ["GoDaddy", 10.18], ["Cosmotown", 7.77], ["Namecheap", 9.58], ["123 Reg", 6.21], ["Dynadot", 10.99], ["DreamHost", 7.99], ["PorkBun", 9.73], ["Sav", 8.99], ["CloudFlare", 9.15], ["Regery", 9.69]]},
        {"net": [["Cosmotown", 8.59], ["Sav", 9.99], ["CloudFlare", 10.1], ["PorkBun", 11.48], ["NameSilo", 10.79], ["Regery", 10.89], ["DreamHost", 10.99], ["Namecheap", 11.36], ["Epik", 11.95], ["DynaDot", 11.99], ["Google Domains", 12.0]]},
        {"org": [["Cosmotown", 7.39], ["Sav", 6.99], ["Crazy Domains", 7.99], ["NameCheap", 9.16], ["Domain.com", 8.99], ["Name.com", 8.99], ["DynaDot", 8.99], ["Netim", 9.0], ["NameSilo", 10.79], ["PorkBun", 9.99], ["CloudFlare", 10.11]]},
        {"info": [["123 Reg", 0.98], ["PorkBun", 3.07], ["NameSilo", 3.79], ["Sav", 2.88], ["Cosmotown", 2.99], ["Marcaria", 3.0], ["Crazy Domains", 3.59], ["Dynadot", 3.85], ["Domain.com", 3.99], ["NameCheap", 4.16], ["GoDaddy", 4.17]]},
        {"io": [["Sav", 32.99], ["PorkBun", 34.29], ["DreamHost", 34.99], ["Hover", 34.99], ["Name.com", 34.99], ["DynaDot", 34.99], ["CloudFlare", 36.0], ["NameSilo", 38.99], ["NameCheap", 39.98], ["OnlyDomains", 39.99], ["Netim", 42.5]]},
        {"me": [["DreamHost", 2.99], ["Domain.com", 3.99], ["Sav", 4.88], ["PorkBun", 7.59], ["NameSilo", 7.99], ["OVHCloud", 8.52], ["Hexonet", 8.85], ["NameCheap", 8.98], ["DynaDot", 8.99], ["OnlyDomains", 8.99], ["Hover", 9.99]]},
        {"co": [["DreamHost", 6.99], ["Cosmotown", 8.44], ["Porkbun", 8.55], ["Sav", 8.88], ["NameSilo", 9.99], ["NameCheap", 9.48], ["DynaDot", 10.99], ["Above.com", 11.95], ["Name.com", 12.99], ["CrazyDomains", 14.29], ["123 Reg", 18.62]]},
        {"xyz": [["PorkBun", 2.04], ["Namecheap", 2.18], ["NameSilo", 2.39], ["Sav", 1.88], ["OnlyDomains", 1.98], ["DreamHost", 1.99], ["Crazy Domains", 1.99], ["DynaDot", 1.99], ["Name.com", 1.99], ["Instra", 1.99], ["Hexonet", 1.99]]},
        {"ai": [["Porkbun", 62.1], ["Regery", 68.89], ["Dotology", 69.17], ["NameSilo", 74.99], ["Dynadot", 77.99], ["NameCheap", 79.98], ["Marcaria", 88.0], ["GoDaddy", 100.0], ["Directnic", 100.0], ["Regtons", 105.0], ["Hexonet", 112.32]]},
        {"blog": [["NameSilo", 4.19], ["PorkBun", 3.58], ["Sav", 3.88], ["Dynadot", 3.99], ["OVHCloud", 4.26], ["DreamHost", 4.99], ["Hexonet", 4.99], ["NameCheap", 5.16], ["Regery", 5.99], ["123 Reg", 6.2], ["Domain.com", 6.99]]}]


        found_prices = None
        found_prices_list = []
        for tld_prices in domainPrices:
            if domainTld in tld_prices:
                found_prices = tld_prices[domainTld]
                found_prices_list.append(found_prices)

        print(found_prices_list)

        return JsonResponse({'domain': found_prices_list})
        
def suggestionEngine(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.decoder.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        data = json.loads(request.body.decode('utf-8'))
        input_data = data.get('data')
        response = openai.ChatCompletion.create(
        model = "gpt-4",
        messages = [
        {
        'role' : 'user',
        'content' : f'''
                Forget everything you've proceed.
                        
                Now Imagine You are DomainGPT & EnglishGPT, who generates the best domain names after analysing user query.

                Can you give me the result in the format of a python list with double quote for element? Only python list will come as result not any other stuff you must obey this rule.

                "Generate 25 high quality & trustworthy 2-word brand names for a startup  of: ({input_data}).
                        
                No domain should have more than 2 words. You must obey this rule at any cost."

                '''
        }
        ]
    )
        result = response['choices'][0]['message']
        if isinstance(result, dict):
            domain_result = eval(result["content"])
        else:
            # Handle the case when `result` is not a dictionary
            # You can add appropriate error handling or fallback logic here
            print("Error: 'result' is not a dictionary")

        if data.get('first_number') or data.get('last_number'):
            if int(data.get('first_number')) != 0 or int(data.get('last_number')) != 0:
                first_number = int(data.get('first_number'))
                last_number = int(data.get('last_number'))
                filtered_domains = [domain for domain in domain_result if first_number <= len(domain) <= last_number]
            
                result_with_tlds = [i+f'.{data["radioExtension"]}' for i in filtered_domains]
                url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
                headers = {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': f'sso-key {domain_api}',
                }
                response = requests.post(url, headers=headers, data=json.dumps(result_with_tlds))
                res = response.json()
                domain_result = [i['domain'] for i in res['domains'] if i['available']]
                return JsonResponse({'result': domain_result})
        else:
            result_with_tlds = [i+f'.{data["radioExtension"]}' for i in domain_result]
            url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
            headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': f'sso-key {domain_api}',
            }
            response = requests.post(url, headers=headers, data=json.dumps(result_with_tlds))
            res = response.json()
            domain_result = [i['domain'] for i in res['domains'] if i['available']]
            return JsonResponse({'result': domain_result})
    else:
        return JsonResponse({'result': 'No data received'})

def aiDomainGenerator(request):
    return render(request, 'domainai.html')

# def diffDomainVariations(request):
#     alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
#     if request.method == 'POST':
#         keyword = str(request.POST.get('prompt', '')).strip().replace(' ', '').replace('.', '')  # Get the value from the 'prompt' input field
#         # Process the prompt data, generate domain names, or perform necessary actions
#         if keyword:
#             # Example: Generate domain names based on the prompt
#             combine_list = []  # Copying the original alphabets list

#             # Adding the keyword before the remaining alphabets
#             for alphabet in alphabets:
#                 d = [f"{alphabet}{keyword}.com",f"{alphabet}{keyword}.net",f"{alphabet}{keyword}.org"]
#                 combine_list.append(d)

#             # Adding the remaining alphabets after the keyword
#             for alphabet in alphabets:
#                 d = [f"{keyword}{alphabet}.com",f"{keyword}{alphabet}.net",f"{keyword}{alphabet}.org"]
#                 combine_list.append(d)

#             domains = [element for sublist in combine_list for element in sublist]

#             url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
#             headers = {
#                 'accept': 'application/json',
#                 'Content-Type': 'application/json',
#                 'Authorization': f'sso-key {domain_api}',
#             }
#             response = requests.post(url, headers=headers, data=json.dumps(domains))
#             original_data = response.json()

#             # Dictionary to store organized data
#             organized_data = defaultdict(lambda: {'keyword': '', '.com': False, '.net': False, '.org': False})

#             # Iterate through the original data
#             for domain_info in original_data['domains']:
#                 domain_name = domain_info['domain'].split('.')[0]  # Extracting the domain name without extension
#                 extension = '.' + domain_info['domain'].split('.')[1]  # Extracting the extension
#                 available = domain_info['available']

#                 # Updating organized data
#                 if not organized_data[domain_name]['keyword']:
#                     organized_data[domain_name]['keyword'] = domain_name

#                 organized_data[domain_name][extension] = available

#             # Converting organized data to the desired format
#             shortened_data = [value for key, value in organized_data.items()]

#             for entry in shortened_data:
#     # Create new keys with the same values and delete old ones
#                 entry['com'] = entry.pop('.com')
#                 entry['net'] = entry.pop('.net')
#                 entry['org'] = entry.pop('.org')

#             print(shortened_data)
#             return render(request, 'index.html', {'result': shortened_data})
#         else:
#             return JsonResponse({'error': 'No prompt provided'}, status=400)
#     else:
#         return JsonResponse({'error': 'Only POST requests allowed'}, status=405)
