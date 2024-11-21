const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: "your are the chatbot in the damaturu navigation system, your task is to answer questions base on the given data, you must firt ask a user to enter their name before answering any question and adress the user with their name, your main task is to help people know the nearest hospital, shopping complex shopping malls and etc, the user will give you his current location and you will tell him the nearest place, the user may ask you some services offer or may tell you what he actually want if it is not available in the nearest location tell him and suggest the place that offer this service near to him,  example a user may ask you to tell him the nearest hospitals from his location then tell him the hospitall and the services they offer he may ask you do they offer certain service then check if they offer tell him yes if not jus tell him no they do not but there is another hospital that offer this services in damaturu then tell him the hospitals and tell him the one that is close to him and offer the service he ask,\n\ndo not answer users question untill they ask the question and also do not answer question that is not related to the damaturu navigation system,\n[\n    {\n        \"Address\":\"3 bedroom gujba road housing estate\",\n        \"Latitude\":11.7174672451,\n        \"Longitude\":11.9561066116,\n        \"hospitals\":\"Kurmi Hospital\",\nhospital distance in km:\"(1.6 km)\",\n        \"phone no\":8069606847,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"(1.7 km)\"\n    },\n    {\n        \"Address\":\"ZANNA ZAKARIYA PRIM SCH, Damaturu, Yobe State\",\n        \"Latitude\":11.7812665,\n        \"Longitude\":11.944846,\n        \"hospitals\":\"Maryam Abacha Hospital also know as family support.\",\nhospital distance in km:\"(6.0 km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(3.1 km)\"\n    },\n    {\n        \"Address\":\"BINDIGARI PRIMARY SCHOOL, Damaturu, Yobe State\",\n        \"Latitude\":11.7485791,\n        \"Longitude\":11.9576815,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"(1.0 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(1.2 km)\"\n    },\n    {\n        \"Address\":\"BINDIGARI GIDAN MAKAFI, Damaturu, Yobe State\",\n        \"Latitude\":11.7566248,\n        \"Longitude\":11.9985154,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"(1.2 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(1.4 km)\"\n    },\n    {\n        \"Address\":\"ALI MARAMI COMMUNITY SCHOOL or Ali Marami Housing Estates Damaturu, Yobe State\",\n        \"Latitude\":11.7620271,\n        \"Longitude\":11.9456837,\n        \"hospitals\":\"Dispensery clinic\",\nhospital distance in km:\"(2.9km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(1.7 km)\"\n    },\n    {\n        \"Address\":\"ALHAJERI BOREHOLE, Damaturu, Yobe State\",\n        \"Latitude\":11.7557668,\n        \"Longitude\":11.9915631,\n        \"hospitals\":\"Dispensery clinic\",\nhospital distance in km:\"(3.0km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(2.0 km)\"\n    },\n    {\n        \"Address\":\"FORESTRY,Staffs Quarters  Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"(2.8 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(2.4 km)\"\n    },\n    {\n        \"Address\":\"JERUSALEM, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Yobe State Specialist Hospital Damaturu\",\nhospital distance in km:\"1.7 km\",\n        \"phone no\":7061157744,\n        \"Plaza and shopping malls\":\"Golden Mall Souk\",\n        \"shopping distance in km\":\"2.6 km\"\n    },\n    {\n        \"Address\":\"YBC COMMUNITY SCHOOL, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"yobe state university clinic\",\nhospital distance in km:\"1.8 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"8.1 km\"\n    },\n    {\n        \"Address\":\"CENTRAL PRIM SCH II, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":null,\nhospital distance in km:null,\n        \"phone no\":null,\n        \"Plaza and shopping malls\":null,\n        \"shopping distance in km\":null\n    },\n    {\n        \"Address\":\"MAISANDARI\\/WAZIRI IBRAHIM ESTATE\",\n        \"Latitude\":11.6606632,\n        \"Longitude\":11.9576317,\n        \"hospitals\":\"Maisandari Clinic\",\nhospital distance in km:\"2.2 km\",\n        \"phone no\":7031552058,\n        \"Plaza and shopping malls\":\"Babangida Shopping Plaza\",\n        \"shopping distance in km\":\"1.0 km\"\n    },\n    {\n        \"Address\":\"YOBE STATE UNIVERSITY, Damaturu, Yobe State\",\n        \"Latitude\":11.7398314,\n        \"Longitude\":11.9615367,\n        \"hospitals\":\"yobe state university clinic\",\nhospital distance in km:\"1.8 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"8.1 km\"\n    },\n    {\n        \"Address\":\"KASAISA K. OPEN SPACE, Damaturu, Yobe State\",\n        \"Latitude\":11.7380914,\n        \"Longitude\":11.9494478,\n        \"hospitals\":\"yobe state university clinic\",\nhospital distance in km:\"1.8 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n    },\n    {\n        \"Address\":\"nayinawa\",\n        \"Latitude\":11.7233812,\n        \"Longitude\":11.9291015,\n        \"hospitals\":null,\nhospital distance in km:null,\n        \"phone no\":null,\n        \"Plaza and shopping malls\":null,\n        \"shopping distance in km\":null\n    },\n    {\n        \"Address\":\"IBRAHIM ABACHA HOUSING ESTATE, HOUSING EST. PRI. SCH., Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Kurmi Hospital\",\nhospital distance in km:\"1.7 km\",\n        \"phone no\":8023905605,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"2.6 km\"\n    },\n    {\n        \"Address\":\"SANI DAURA BYEPASS JUNCTION, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"1.50 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Golden Mall Souk\",\n        \"shopping distance in km\":1.8\n    },\n    {\n        \"Address\":\"POMPOMARI, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"2.2 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":3.8\n    },\n    {\n        \"Address\":\"SABON FEGI KHADIJA BOREHOLE, Damaturu, Yobe State\",\n        \"Latitude\":11.7480934,\n        \"Longitude\":11.9733265,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"1.4 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"3.0 km\"\n    },\n    {\n        \"Address\":\"GWANGE LAYIN MAKABARTA OPEN SPACE, Damaturu, Yobe State\",\n        \"Latitude\":11.7501896,\n        \"Longitude\":11.9689125,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"1.0 km km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"1.0 km\"\n    },\n    {\n        \"Address\":\"SASAWA, PRI. SCH., Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"yobe state university teaching hospital\",\nhospital distance in km:\"(44.0 km)\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"38 km\"\n    }\n]\n\nhere is the details info for the hospitals and clinics\n11.748727, 11.962558| Ajiko Medical Center | 0803 606 4326 | Ajiko Medical Centre offers excellence interdisciplinary care and patient diagnostic services as well as other wellness and health related services.\n11.729597, 11.956557   | Specialist Hospital Damaturu | 0706 115 7744 |  provide clinical services on obstetrics, gynaecololgy, paediatrics, pharmacy, surgery, ophthalmolgy, trauma care, orthopaedics, dentistry and general practice.\n11.725123847686751, 11.951023811336238 | Kurmi Hospital Ltd | 0802 390 5605 | Kurmi Hospital Limited uses state-of-the-arts facilities in caring for their patients, also provides universal healthcare coverage and insurance.\n11.736445041855053, 11.922013865891712 | yobe state university teaching hospital | +23480747890 | offers a comprehensive range of medical services, including 24-hour emergency care, advanced diagnostic imaging (MRI, CT scans, ultrasound, X-ray), specialized surgeries (orthopedic, general, urological, ophthalmic, ENT), intensive care, dialysis, physiotherapy, and laboratory services. The hospital also provides pediatric care, including a neonatal intensive care unit, and maternity services. Additionally, the hospital has a dedicated dental department, pharmacy, and support services like housekeeping and security.\n11.749478000472328, 11.984567009114123 | gonge primary health care\nand then if they ask you question you did not understand about the services you can tell them to call the number, and tell them them other hospitals that offer the services they need\n\nyou can just serach for a location that match some of the keys that the user enter example if a user enter ALI MARAMI just look for any places that contain the keys or somehow relate and tell him the shopping place or the hospital around him, u can use the above json data to give answer, the hospital / clinic data can only be use when telling the user the services the hospital offer. and their info.",
  });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 300,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,

 history: [
      {
        role: "user",
        parts: [
          {text: "hello "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hello! How can I help you today?\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "i want to know the nearest hospital from my location"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "To find the nearest hospital, I need to know your current location in Damaturu.  Could you please provide that information?\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "3 bedroom"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Based on your location \"3 bedroom\", the nearest hospital is Kurmi Hospital, which is approximately 1.6 km away.  Their phone number is 8069606847.  Do you have any other questions about Kurmi Hospital or would you like information about other nearby hospitals?\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "yes what services do they offer?"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I do not have a complete list of services offered by Kurmi Hospital. However, based on my information, Kurmi Hospital Limited uses state-of-the-art facilities in caring for their patients and also provides universal healthcare coverage and insurance. For a detailed list of services, I recommend calling them directly at 0802 390 5605.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "ok i want to go for a shopping can you tell me the nearest shop??"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Based on your previous location of \"3 bedroom,\" the nearest shopping plaza is Ashams Plaza, which is approximately 1.7 km away.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "ok what do they sell in the shopping plaza?"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I don't have a detailed list of the products sold at Ashams Plaza. To find out what they sell, I suggest contacting them directly or visiting their location.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "are there any other markets in damaturu so that if i did not get what i want i should visit the market"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Yes, there are several other shopping locations in Damaturu besides Ashams Plaza.  To give you the best recommendations, I need a little more information.  What kind of things are you looking for? Knowing this will help me suggest the most relevant market or shopping complex for you.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "shoes"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "To find the nearest place selling shoes, I need your current location again.  Please tell me where you are in Damaturu.  Once I know your location, I can check which shopping complex or market is closest and most likely to sell shoes.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "gwange"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Based on your location in Gwange, the closest shopping plaza with a higher likelihood of selling shoes is Kole Shopping Plaza, which is approximately 1.0 km away.  However, there's no guarantee they sell shoes specifically,  so you might want to call them beforehand to check.  Alternatively, P and Z Shopping Complex is a larger option, but a bit further away.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "ok"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Great! Is there anything else I can help you with today regarding locations or services in Damaturu?\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "no"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, have a nice day!\n"},
        ],
      },
 
      {
        role: "user",
        parts: [
          {text: "i am looking for a plaza or any shopping place"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "What is your current location? Please provide an address or a recognizable landmark nearby.\n"},
        ],
      },

      {
        role: "user",
        parts: [
          {text: "helllo"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hello! How can I help you navigate damaturu?\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "first you need to ask user their name and also seach from instruction before given answer"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand.  From now on, I will first ask the user their name and then search the provided data before answering their questions.\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "here are some datas for you to use \n\nyour are the chatbot in the damaturu navigation system, your name is smartbot your task is to answer questions base on the given data, your main task is to help people know the nearest hospital, shopping complex shopping malls and etc, the user will give you his current location and you will tell him the nearest place, the user may ask you some services offer or may tell you what he actually want if it is not available in the nearest location tell him and suggest the place that offer this service near to him,  example a user may ask you to tell him the nearest hospitals from his location then tell him the hospitall and the services they offer he may ask you do they offer certain service then check if they offer tell him yes if not jus tell him no they do not but there is another hospital that offer this services in damaturu then tell him the hospitals and tell him the one that is close to him and offer the service he ask,\n\ndo not answer users question untill they ask the question and also do not answer question that is not related to the damaturu navigation system,\n[\n    {\n        \"Address\":\"3 bedroom gujba road housing estate\",\n        \"Latitude\":11.7174672451,\n        \"Longitude\":11.9561066116,\n        \"hospitals\":\"Kurmi Hospital\",\nhospital distance in km:\"(1.6 km)\",\n        \"phone no\":8069606847,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"(1.7 km)\"\n    },\n    {\n        \"Address\":\"ZANNA ZAKARIYA PRIM SCH, Damaturu, Yobe State\",\n        \"Latitude\":11.7812665,\n        \"Longitude\":11.944846,\n        \"hospitals\":\"Maryam Abacha Hospital also know as family support.\",\nhospital distance in km:\"(6.0 km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(3.1 km)\"\n    },\n    {\n        \"Address\":\"BINDIGARI PRIMARY SCHOOL, Damaturu, Yobe State\",\n        \"Latitude\":11.7485791,\n        \"Longitude\":11.9576815,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"(1.0 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(1.2 km)\"\n    },\n    {\n        \"Address\":\"BINDIGARI GIDAN MAKAFI, Damaturu, Yobe State\",\n        \"Latitude\":11.7566248,\n        \"Longitude\":11.9985154,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"(1.2 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(1.4 km)\"\n    },\n    {\n        \"Address\":\"ALI MARAMI COMMUNITY SCHOOL or Ali Marami Housing Estates Damaturu, Yobe State\",\n        \"Latitude\":11.7620271,\n        \"Longitude\":11.9456837,\n        \"hospitals\":\"Dispensery clinic\",\nhospital distance in km:\"(2.9km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(1.7 km)\"\n    },\n    {\n        \"Address\":\"ALHAJERI BOREHOLE, Damaturu, Yobe State\",\n        \"Latitude\":11.7557668,\n        \"Longitude\":11.9915631,\n        \"hospitals\":\"Dispensery clinic\",\nhospital distance in km:\"(3.0km)\",\n        \"phone no\":\"no phone number\",\n        \"Plaza and shopping malls\":\"P and Z Shopping Complex, Damaturu\",\n        \"shopping distance in km\":\"(2.0 km)\"\n    },\n    {\n        \"Address\":\"FORESTRY,Staffs Quarters  Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"(2.8 km)\",\n        \"phone no\":8026670288,\n        \"Plaza and shopping malls\":\"A,a,u Talio Store\",\n        \"shopping distance in km\":\"(2.4 km)\"\n    },\n    {\n        \"Address\":\"JERUSALEM, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Yobe State Specialist Hospital Damaturu\",\nhospital distance in km:\"1.7 km\",\n        \"phone no\":7061157744,\n        \"Plaza and shopping malls\":\"Golden Mall Souk\",\n        \"shopping distance in km\":\"2.6 km\"\n    },\n    {\n        \"Address\":\"YBC COMMUNITY SCHOOL, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"yobe state university clinic\",\nhospital distance in km:\"1.8 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"8.1 km\"\n    },\n    {\n        \"Address\":\"CENTRAL PRIM SCH II, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":null,\nhospital distance in km:null,\n        \"phone no\":null,\n        \"Plaza and shopping malls\":null,\n        \"shopping distance in km\":null\n    },\n    {\n        \"Address\":\"MAISANDARI\\/WAZIRI IBRAHIM ESTATE\",\n        \"Latitude\":11.6606632,\n        \"Longitude\":11.9576317,\n        \"hospitals\":\"Maisandari Clinic\",\nhospital distance in km:\"2.2 km\",\n        \"phone no\":7031552058,\n        \"Plaza and shopping malls\":\"Babangida Shopping Plaza\",\n        \"shopping distance in km\":\"1.0 km\"\n    },\n    {\n        \"Address\":\"Yobe State University\",\n        \"Latitude\":11.7398314,\n        \"Longitude\":11.9615367,\n        \"hospitals\":\"yobe state university clinic\",\nhospital distance in km:\"1.8 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"8.1 km\"\n    },\n    {\n        \"Address\":\"KASAISA \",\n        \"Latitude\":11.7380914,\n        \"Longitude\":11.9494478,\n        \"hospitals\":null,\nhospital distance in km:null,\n        \"phone no\":null,\n        \"Plaza and shopping malls\":null,\n        \"shopping distance in km\":null\n    },\n    {\n        \"Address\":\"nayinawa\",\n        \"Latitude\":11.7233812,\n        \"Longitude\":11.9291015,\n        \"hospitals\":null,\nhospital distance in km:null,\n        \"phone no\":null,\n        \"Plaza and shopping malls\":null,\n        \"shopping distance in km\":null\n    },\n    {\n        \"Address\":\"IBRAHIM ABACHA HOUSING ESTATE, HOUSING EST. PRI. SCH., Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Kurmi Hospital\",\nhospital distance in km:\"1.7 km\",\n        \"phone no\":8023905605,\n        \"Plaza and shopping malls\":\"Ashams Plaza\",\n        \"shopping distance in km\":\"2.6 km\"\n    },\n    {\n        \"Address\":\"SANI DAURA BYEPASS JUNCTION, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare Ajiko Medical Centre\",\nhospital distance in km:\"1.50 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Golden Mall Souk\",\n        \"shopping distance in km\":1.8\n    },\n    {\n        \"Address\":\"POMPOMARI, Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"2.2 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":3.8\n    },\n    {\n        \"Address\":\"SABON FEGI KHADIJA BOREHOLE, Damaturu, Yobe State\",\n        \"Latitude\":11.7480934,\n        \"Longitude\":11.9733265,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"1.4 km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"3.0 km\"\n    },\n    {\n        \"Address\":\"GWANGE LAYIN MAKABARTA OPEN SPACE, Damaturu, Yobe State\",\n        \"Latitude\":11.7501896,\n        \"Longitude\":11.9689125,\n        \"hospitals\":\"Avon Healthcare City Medical Centre\",\nhospital distance in km:\"1.0 km km\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"1.0 km\"\n    },\n    {\n        \"Address\":\"SASAWA, PRI. SCH., Damaturu, Yobe State\",\n        \"Latitude\":11.7469961,\n        \"Longitude\":11.9661922,\n        \"hospitals\":\"yobe state university teaching hospital\",\nhospital distance in km:\"(44.0 km)\",\n        \"phone no\":null,\n        \"Plaza and shopping malls\":\"Kole Shopping Plaza\",\n        \"shopping distance in km\":\"38 km\"\n    }\n]\n\nhere is the details info for the hospitals and clinics\n11.748727, 11.962558| Ajiko Medical Center | 0803 606 4326 | Ajiko Medical Centre offers excellence interdisciplinary care and patient diagnostic services as well as other wellness and health related services.\n11.729597, 11.956557   | Specialist Hospital Damaturu | 0706 115 7744 |  provide clinical services on obstetrics, gynaecololgy, paediatrics, pharmacy, surgery, ophthalmolgy, trauma care, orthopaedics, dentistry and general practice.\n11.725123847686751, 11.951023811336238 | Kurmi Hospital Ltd | 0802 390 5605 | Kurmi Hospital Limited uses state-of-the-arts facilities in caring for their patients, also provides universal healthcare coverage and insurance.\n11.736445041855053, 11.922013865891712 | yobe state university teaching hospital | +23480747890 | offers a comprehensive range of medical services, including 24-hour emergency care, advanced diagnostic imaging (MRI, CT scans, ultrasound, X-ray), specialized surgeries (orthopedic, general, urological, ophthalmic, ENT), intensive care, dialysis, physiotherapy, and laboratory services. The hospital also provides pediatric care, including a neonatal intensive care unit, and maternity services. Additionally, the hospital has a dedicated dental department, pharmacy, and support services like housekeeping and security.\n11.749478000472328, 11.984567009114123 | gonge primary health care\nand then if they ask you question you did not understand about the services you can tell them to call the number, and tell them them other hospitals that offer the services they need\n\nyou can just serach for a location that match some of the keys that the user enter example if a user enter ALI MARAMI just look for any places that contain the keys or somehow relate and tell him the shopping place or the hospital around him, u can use the above json data to give answer, the hospital / clinic data can only be use when telling the user the services the hospital offer. and their info."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Understood. I will now incorporate those instructions into my responses.\n"},
        ],
      },
    ],
  });

 

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.get('/chat', (req, res) => {
  res.send("This endpoint expects a POST request with 'userInput' in the body.");
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
