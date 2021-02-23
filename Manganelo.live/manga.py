from bs4 import BeautifulSoup
import sys, time ,requests, os


url = input("Enter manglnelo.live URL: e.g https://manganelo.link/manga/shingeki-no-kyojin/shingeki-no-kyojin-chapter-129/")

def progressbar(it,prefix="",size=60, file=sys.stdout):
    count = len(it)
    def show(j):
        x = int(size*j/count)
        file.write("%s[%s%s] %i/%i\r" % (prefix, "#"*x, " "*(size-x), j, count))
        file.flush()        
    show(0)
    for i, item in enumerate(it):
        yield item
        show(i+1)
    file.write("\n")
    file.flush()

def createFolder(name):
    if not os.path.exists(name):
        os.mkdir(name)

def download(url,folder,image_name):
    response = requests.get(url).content   
    with open(f"{folder}/{image_name}", "wb") as f:
        f.write(response)
    time.sleep(0.1)

page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

heading = soup.find("h1",id='chapter-heading').get_text().split(' ')
chapter=heading[-1]
dash = heading.index('-')
AnimeName = ' '.join(heading[0:dash])

createFolder(f"{AnimeName}")
createFolder(f"{AnimeName}/Chapter{chapter}")

images = []
for link in soup.select('.page-break img'):
    image = link.get('src').strip()
    images.append(image)

for i in progressbar(range(len(images)), "Downloading: ",40):
    download(images[i],f"{AnimeName}/Chapter{chapter}",f"image{i+1}.png")