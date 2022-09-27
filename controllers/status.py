import uuid
import datetime


class Status():

    def api(self):
        r = {
            "msg": "Current API status",
            "name": "weather-api",
            "environment": "production",
            "version": "0.0.1",
            "uptime": datetime.datetime.now(),
            "hash": uuid.uuid4(),
        }
        return r
