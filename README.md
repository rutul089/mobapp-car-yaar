# 📱 mobapp-car-yaar

A React Native mobile application project for **Car Yaar** — a car trading platform. This app uses a custom UI component library called `caryaar-mobile-components` for consistent and reusable UI elements.

---

## 📂 Project Structure

```
mobapp-car-yaar/
├── src/
│   ├── networking/          # Centralized Axios instance with request/response interceptors. 
│   ├── assets/              # Images and fonts
│   ├── components/          # Custom components specific to this project
│   ├── constants/           # Constants, enums, and screen names
│   ├── navigation/          # Navigation setup
│   ├── redux/               # State management code
│   ├── screens/             # All the app screens
│   ├── styles/              # Common styles for screens
│   ├── theme/               # Colors, sizes, and font styles
│   ├── utils/               # Common utility functions
│   ├── services/            # Modular API service layer with reusable methods
├── App.js                   # Main app entry point
├── metro.config.js
├── package.json
├── README.md
└── ...
```

---

## 📦 Dependencies

- **React Native** 0.78.2
- **React** 19.0.0
- **React Navigation**
  - @react-navigation/native 7.1.5
  - @react-navigation/stack 7.2.9
  - @react-navigation/bottom-tabs 7.3.9
- **Redux & State Management**
  - redux 5.0.1
  - react-redux 9.2.0
  - redux-thunk 3.1.0
  - redux-logger 3.0.6
  - redux-persist 6.0.0
- **Networking**
  - axios 1.8.4
  - @react-native-community/netinfo 11.4.1
- **UI & UX**
  - react-native-fast-image 8.6.3
  - react-native-image-picker 8.2.0
  - react-native-image-viewing 0.2.2
  - react-native-linear-gradient 2.8.3
  - react-native-modal 14.0.0-rc.1
  - react-native-step-indicator 1.0.3
  - react-native-keyboard-aware-scroll-view 0.9.5
  - react-native-safe-area-context 5.3.0
  - react-native-screens 3.29.0
  - react-native-gesture-handler 2.19.0
  - react-native-reanimated 3.15.1
- **Utilities**
  - lodash 4.17.21
  - moment 2.30.1
  - prop-types 15.8.1
- **Permissions**
  - react-native-permissions 5.3.0
- **File & Document Handling**
  - @react-native-async-storage/async-storage 2.1.2
  - @react-native-documents/picker 10.1.2
- **Custom UI Library**
  - @caryaar/components (linked locally via ../caryaar-mobile-components)

---

## 📥 How to Set Up and Run the Project

### 1️⃣ Clone the Project

```bash
git clone https://github.com/your-org/mobapp-car-yaar.git
cd mobapp-car-yaar
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

## 🎨 Install and Link Custom UI Library

The app depends on a custom UI library called **caryaar-mobile-components**.

### 1️⃣ Clone the UI Library Repository

```bash
git clone https://github.com/your-org/caryaar-mobile-components.git
cd caryaar-mobile-components
npm install
npm run build    # if applicable
```

### 2️⃣ Link the Library to Your Project

Go back to the `mobapp-car-yaar` root directory:

```bash
npm install ../caryaar-mobile-components
# or
yarn add ../caryaar-mobile-components
```

Make sure the relative path is correct based on where the `caryaar-mobile-components` folder is located.

---

## 🚀 Run the App

After everything is set up:

```bash
npx react-native run-android
# or
npx react-native run-ios
```

For Metro bundler, in a separate terminal:

```bash
npx react-native start
```

---

## 📝 Notes

- Ensure both `mobapp-car-yaar` and `caryaar-mobile-components` are on the same directory level (or adjust the install path accordingly).
- Any updates to the `caryaar-mobile-components` library should be rebuilt and re-installed in the project.
