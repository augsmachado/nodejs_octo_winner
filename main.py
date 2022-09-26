from fastapi import FastAPI

import uuid
import datetime

# Create new FastAPI instance
app = FastAPI()


@app.get('/')
async def status():
    response = {
        "msg": "Current API status",
        "name": "weather-scraper-api",
        "environment": "production",
        "version": "0.0.1",
        "uptime": datetime.datetime.now(),
        "hash": uuid.uuid4(),
    }

    return response
