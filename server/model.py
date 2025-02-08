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

# Weather Data Retrieval

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

def main():
    openweather_api_key = "d1d29f5d2f0bd71e49cff4024f23dbc5"

    # Building Parameters Input
    try:
        building_size = float(input("Enter building size (e.g., in square feet): "))
        wwr = float(input("Enter window-to-wall ratio (e.g., 0.25): "))
        insulation = float(input("Enter insulation quality score (e.g., percentage or index value): "))
    except ValueError:
        print("Invalid input for building parameters. Please enter numeric values.")
        return

    # Coordinates Input
    # Need to be provided from the frontend.
    try:
        lat = float(input("Enter the latitude: "))
        lon = float(input("Enter the longitude: "))
    except ValueError:
        print("Invalid input for coordinates. Please enter valid numeric values.")
        return

    # Retrieve weather data (temperature and humidity) using the provided coordinates.
    weather_data = get_weather_data(lat, lon, openweather_api_key)
    if not weather_data:
        print("Could not retrieve weather data. Exiting prediction.")
        return

    temperature = weather_data["temperature"]
    humidity = weather_data["humidity"]

    # print(f"\nRetrieved Weather Data:")
    # print(f"  Temperature: {temperature} °C")
    # print(f"  Humidity: {humidity}%\n")

    # Get Estimate ---
    prediction = get_estimate(building_size, wwr, insulation, temperature, humidity)

    print("Estimated Results:")
    print("  Energy Savings Potential (%):", prediction[0])
    print("  Zonal Heating/Cooling Data (kWh):", prediction[1])
    print("  Carbon Emission Rate (g CO2/kWh):", prediction[2])
    print("  Water Usage (liters):", prediction[3])
    print("  Lighting Consumption (kWh):", prediction[4])

if __name__ == "__main__":
    main()
