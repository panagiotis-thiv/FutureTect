# model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor
import requests

# Read CSV file
df = pd.read_csv("./csvs/general.csv")

# Inputs (X) and targets (y)
X = df[["Building Size", "Window-to-Wall Ratio", "Insulation Quality Score", "Temperature", "Humidity"]]
y = df[["Energy Savings Potential (%)", "Zonal Heating/Cooling Data (kWh)", "Carbon Emission Rate (g CO2/kWh)",
        "Water Usage (liters)", "Lighting Consumption (kWh)"]]

# Split data into training and test sets.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the KNN model.
knn = KNeighborsRegressor(n_neighbors=5)
knn.fit(X_train, y_train)

def get_estimate(building_size, wwr, insulation, temperature, humidity):
    """
    Given building characteristics along with external temperature and humidity,
    returns predicted values from the trained KNN model.
    """
    input_data = pd.DataFrame(
        [[building_size, wwr, insulation, temperature, humidity]],
        columns=["Building Size", "Window-to-Wall Ratio", "Insulation Quality Score", "Temperature", "Humidity"]
    )
    prediction = knn.predict(input_data)
    return prediction[0] 

def get_weather_data(lat, lon, openweather_api_key):
    """
    Fetches current weather data from the OpenWeatherMap API using provided coordinates.
    Returns a dictionary with temperature and humidity.
    """
    weather_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": openweather_api_key,
        "units": "metric"  # Change to "imperial" for Fahrenheit.
    }

    try:
        response = requests.get(weather_url, params=params)
        data = response.json()

        if response.status_code == 200:
            temperature = data["main"]["temp"]
            humidity = data["main"]["humidity"]
            return {"temperature": temperature, "humidity": humidity}
        else:
            print(f"Error: Unable to get weather for coordinates ({lat}, {lon}).")
            print("Reason:", data.get("message", "Unknown error"))
            return None
    except requests.exceptions.RequestException as e:
        print("Error: Failed to make a weather request.")
        print(e)
        return None