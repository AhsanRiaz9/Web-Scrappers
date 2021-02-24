from bs4 import BeautifulSoup
import requests,json

keyword_file = open("keywords.txt", "r")
keywords = keyword_file.read().split('\n')

result = []
for i in range(len(keywords)): 
    print("Extracting Search Related to keyword : "+keywords[i])
    url = f"https://www.bing.com/search?q={keywords[i]}"
    secondPage = url+"&first=10"
    thirdPage = url+"&first=20"
    data = []

#page 1
    page = requests.get(url,headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36" })
    soup = BeautifulSoup(page.content, 'html.parser')

    metas = soup.select(".b_algo>h2>a")
    captions = soup.select(".b_algo .b_caption p") 
    
    for meta,caption in zip(metas,captions):
        data.append({
            "title":meta.get_text(),
            "link":meta.get('href'),
            "caption":caption.get_text()
        })
#page 2
    page = requests.get(secondPage,headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36" })
    soup = BeautifulSoup(page.content, 'html.parser')

    metas = soup.select(".b_algo>h2>a")
    captions = soup.select(".b_algo .b_caption p") 
    
    for meta,caption in zip(metas,captions):
        data.append({
            "title":meta.get_text(),
            "link":meta.get('href'),
            "caption":caption.get_text()
        })
#page 3  
    page = requests.get(thirdPage,headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36" })
    soup = BeautifulSoup(page.content, 'html.parser')

    metas = soup.select(".b_algo>h2>a")
    captions = soup.select(".b_algo .b_caption p") 
    
    for meta,caption in zip(metas,captions):
        data.append({
            "title":meta.get_text(),
            "link":meta.get('href'),
            "caption":caption.get_text()
        })

    data = data[:20]
    result.append({f"{keywords[i]}":data})
    i+=1

resultJSON = json.dumps(result,indent=3)
with open('result.json','w') as f:
    f.write(resultJSON)
    print("result saved in result.json")