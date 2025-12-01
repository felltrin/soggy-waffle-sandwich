# 💪 Workout Tracker Application

This is a web application for tracking run times and distances

## ✨ Technologies

- `React`
- `TypeScript`
- `npm`
- `Python`
- `Flask`
- `TailWindCSS`
- `ShadCN UI`

## 📍 The Process

I've been looking for a product to suit my specific needs and I found that the solutions out there didn't fit well with me. So I thought to make on myself. I encounted numerous problems along the way. One of the most notable problems I encounted was during connecting to the API. Specifically, when setting up the DELETE RestAPI route. For some reason, it would throw a CORs error even when I allowed CORs in the Flask application initiation. The only way I found a solution was by looking in an obscure Stackoverflow forum where I used a general method with Axios and specifiying the DELETE request in the arguments. After that, it worked!

## 🚦 Running the Project

1. Clone this repository
2. `cd` into the server directory
3. Source the environment
   1. `source .venv/bin/activate` on MacOS, Linux
   2. `.venv\Scripts\activate` on Windows
4. Run `pip install -r requirements.txt`
   1. If that doesn't work, try `pip3 install -r requirements.txt`
5. Lastly, run `python main.py`
   1. `python3 main.py` if above doesn't work 
7. `cd` back up a directory
8. `cd` into the client
9. Run `npm install`
10. Lastly, run `npm run dev` for the client side

## 🎞️ Preview

<video width="320" height="240" controls>
  <source src="video.mov" type="video/mp4">
</video>

## 📚 Resources

- https://www.figma.com/community/file/1212785201447006833
- https://miro.medium.com/v2/resize:fit:1400/0*rgxBZQVyrT1iiLIA.png
