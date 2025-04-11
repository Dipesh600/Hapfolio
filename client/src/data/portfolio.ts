export const projects = [
  {
    id: "police-connect",
    title: "Police Connect",
    date: "Feb 2025",
    description: "A cross-platform mobile application using React Native and Expo, ensuring a smooth, responsive user experience across both iOS and Android.",
    fullDescription: "Police Connect is a comprehensive mobile application designed to streamline police operations and enhance communication between officers. Built with React Native and Expo, it provides a seamless experience across iOS and Android platforms. The application features a secure login system using unique UIDs and passwords, with data securely stored using PL SQL.",
    technologies: ["React Native", "Expo", "TypeScript", "PLSQL"],
    features: [
      "Secure login system using unique UID and password",
      "PL SQL for secure data storage",
      "Quick access to manage complaints, investigations, and ongoing cases",
      "Cross-platform compatibility (iOS and Android)",
      "Responsive user interface"
    ],
    githubLink: "https://github.com/happy0002/police-connect",
    demoLink: "",
    codeSnippet: {
      code: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';

export default function LoginScreen({ navigation }) {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      navigation.replace('Dashboard');
    },
    onError: (error) => {
      Alert.alert('Login Failed', error.message);
    },
  });

  const handleLogin = () => {
    if (!uid || !password) {
      Alert.alert('Validation Error', 'UID and password are required');
      return;
    }
    
    loginMutation.mutate({ uid, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Police Connect</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="UID"
          value={uid}
          onChangeText={setUid}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
          disabled={loginMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}`,
      language: "TypeScript",
      filename: "LoginScreen.tsx"
    }
  },
  {
    id: "fastapi-auth",
    title: "FastAPI Authentication",
    date: "Dec 2024",
    description: "Secure authentication system built with FastAPI, including user signup and login functionality with SQLite database integration.",
    fullDescription: "This project implements a robust authentication system using FastAPI, Python's high-performance web framework. It provides secure user signup and login routes, integrating SQLite as the database for storing user credentials via SQLAlchemy ORM. For enhanced security, the system implements password hashing using Passlib and bcrypt to ensure secure storage and protection of user passwords.",
    technologies: ["FastAPI", "React Native", "SQLite", "Python"],
    features: [
      "Secure authentication routes for user signup and login",
      "SQLite database integration using SQLAlchemy ORM",
      "Password hashing with Passlib and bcrypt",
      "Mobile frontend using React Native",
      "Secure token storage with AsyncStorage",
      "API calls using Axios"
    ],
    githubLink: "https://github.com/happy0002/fastapi-auth",
    demoLink: "",
    codeSnippet: {
      code: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt
from typing import Optional

from . import models, schemas
from .database import get_db

app = FastAPI()

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# JWT settings
SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}`,
      language: "Python",
      filename: "main.py"
    }
  }
];

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "C++", proficiency: 85 },
      { name: "Java", proficiency: 80 },
      { name: "JavaScript", proficiency: 75 },
      { name: "Python", proficiency: 70 }
    ]
  },
  {
    category: "Technologies/Frameworks",
    items: [
      { name: "React JS", proficiency: 75 },
      { name: "Node JS", proficiency: 65 },
      { name: "Ubuntu", proficiency: 60 },
      { name: "Postman", proficiency: 70 },
      { name: "Selenium", proficiency: 60 }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", proficiency: 80 },
      { name: "GitHub", proficiency: 85 },
      { name: "VS Code", proficiency: 90 },
      { name: "Intellij", proficiency: 75 }
    ]
  },
  {
    category: "Others",
    items: [
      { name: "Problem-Solving", proficiency: 85 },
      { name: "Responsive Web Design", proficiency: 70 },
      { name: "Scripting in Python and JavaScript", proficiency: 65 }
    ]
  }
];

export const education = [
  {
    institution: "Lovely Professional University Punjab",
    degree: "Computer Science and Engineering",
    period: "2022 – 2026",
    location: "Jalandhar, Punjab",
    grade: "CGPA: 6.35"
  },
  {
    institution: "Sanjay Gandhi Inter College",
    degree: "12th with Science",
    period: "2020 – 2021",
    location: "Saran, Bihar",
    grade: "Percentage: 73.3%"
  },
  {
    institution: "G.D Mission Public School",
    degree: "10th with Science",
    period: "2017 – 2018",
    location: "Muzaffarpur, Bihar",
    grade: "Percentage: 60%"
  }
];

export const certificates = [
  {
    title: "Core and Advance Java",
    issuer: "Board Infinity",
    date: "November 2024",
    link: "#" // Replace with actual link
  },
  {
    title: "Mastering Data Structures & Algorithms using C and C++",
    issuer: "Udemy",
    date: "November 2023",
    link: "#" // Replace with actual link
  },
  {
    title: "Object Oriented Programming Using C++",
    issuer: "NIIT",
    date: "April 2022",
    link: "#" // Replace with actual link
  }
];
