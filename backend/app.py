import os
from flask import Flask
from supabase import create_client, Client
from postgrest import APIError
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

print("created")

@app.route('/')
def index():
    try:
        response = supabase.table('users').select("*").execute()
    except APIError as error:
        return f'<p>Error loading users: {error.message}</p>'

    users = response.data

    html = '<h1>users</h1><ul>'
    for user in users:
        html += f'<li>{user["email"]}</li>'
    html += '</ul>'

    return html

if __name__ == '__main__':
    app.run(debug=True)