# OptiRoute

OptiRoute is a mobile application designed to revolutionize the shopping experience by helping users determine the most cost-effective route for purchasing items. It combines advanced algorithms and heuristics to minimize overall monetary costs—including both the prices of goods and travel expenses.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Future Work](#future-work)
- [Contributing](#contributing)

---

## Project Overview

OptiRoute is a mobile app that helps users plan cost-effective shopping routes by combining item prices and travel costs.

Shoppers often waste time and money visiting multiple stores without an optimized plan. OptiRoute solves this by using advanced heuristics and algorithms to:

- Identify nearby shops with desired items  
- Calculate the total cost of items plus travel  
- Suggest the most efficient route  

The app’s goals are:

- **App Development:** Build a user-friendly mobile app  
- **Cost Effectiveness:** Reduce shopping and travel expenses  
- **Enhanced Experience:** Make shopping more convenient and affordable  

---

## Tech Stack

- **React Native** – Mobile app development  
- **Expo** – Simplifies mobile development and testing  
- **Flask** – Backend server implementation  
- **Supabase** – Database and auth platform  
- **Render** – Cloud deployment of backend  

---

## Getting Started

Follow these steps to run OptiRoute on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/)  
- **Expo CLI** – install globally using:

  ```sh
  npm install -g expo-cli
  ```

- Python + `virtualenv` for backend server  

---

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yashharne/OptiRoute.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd OptiRoute
   ```

3. **Install frontend dependencies:**

   ```sh
   npm install
   ```

---

### Running the App

#### Running Frontend

Start the Expo development server:

```sh
npx expo start --tunnel
```

Open the Expo Go app on your mobile device and scan the QR code displayed in your terminal or browser.

#### Running Backend

Navigate to the backend directory and activate the virtual environment (on Windows):

```sh
cd backend
venv\Scripts\activate
flask run
```

Or run the backend server using Gunicorn:

```sh
gunicorn server:app
```

> **Note:** The backend is also deployed on **Render**, and the mobile app can use live API calls when deployed.

---

## Future Work

- **Shopkeeper Interface**  
  A future goal is to build a dedicated interface for shopkeepers to:
  - Efficiently manage shop inventory  
  - Automatically remove expired products based on expiry dates  
  - Maintain accurate and up-to-date product listings

- **Scalable Route Optimization**  
  To improve performance as the number of locations increases, we plan to:
  - Replace the current TSP approach with faster, scalable algorithms  
  - Explore solutions such as:
    - **Nearest Neighbor Heuristic** — quickly selects the next closest shop  
    - **Clustering with Local TSP** — groups nearby shops into clusters and solves routes within each cluster

---

## Contributing

Contributions are welcome to enhance OptiRoute further.

1. Fork the repository  
2. Clone your fork:

   ```sh
   git clone https://github.com/<your-username>/OptiRoute.git
   ```

3. Create a new branch:

   ```sh
   git checkout -b feature/MyFeature
   ```

4. Make changes and commit:

   ```sh
   git add .
   git commit -m "Add MyFeature"
   ```

5. Push to your fork:

   ```sh
   git push origin feature/MyFeature
   ```

6. Open a Pull Request

---
