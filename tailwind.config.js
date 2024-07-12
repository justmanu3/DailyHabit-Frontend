/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width:{
        21: "8rem",
        42: "25rem",
        100: "80rem",
        99:"50rem",
       
        50: "72rem",
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
       
      },
      height:{
        100: "40rem",
        98:"40rem",
        80:"80px",
        150: "150px",
        225: "225px",
        250: "290px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        "90vh": "90vh",

      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px" ,
      },
      colors : {
        
        headingColor : "#2e2e2e",
        textColor : "#515151",
        cartNumBg : "#e80013",
        primary : "#f5f3f3",
        cardOverlay : "rgba(256,256,256,0.6)",
        lighttextGray : "#9ca0ab",
        rowBg : "rgba(255,131,0,0.0.4)",
        cartBg : "#282a2c",
        cartItem : "#2e3033",
        cartTotal : "#343739",
        yellow : "rgb(255, 202, 0)",
        redus : "rgb(125, 197, 238)",

      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

