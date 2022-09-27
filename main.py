import re
from fastapi import FastAPI

from controllers.status import Status
from controllers.weather import Weather

# Create new FastAPI instance
app = FastAPI()
status = Status()
weather = Weather()


@app.get('/')
async def api_status():
    return status.api()


@app.get('/temperature')
async def temperature():
    return weather.temperature()
