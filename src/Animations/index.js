export const buttonClick= {
whileTap: {scale:0.95},
}

// export const fadeInOut={
//     initial:{opacity: 0}, animate:{opacity:1} ,exit:{opacity:0}
// }

export const fadeInOut = (index) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: index * 0.1 } },
    exit: { opacity: 0 }
  };
};

export const dropDown={
         initial:{ opacity: 0, y: 30 },
                  animate:{ opacity: 1, y: 0 },
                  exit:{ opacity: 0, x: 30 }
}

export const slideTop = {
  initial: {opacity:0, x:30},
  animate: {opacity:1,x:0},
  exit: {opacity:0, x:30},
}
export const slideIn = {
  initial: {opacity:0, y:30},
  animate: {opacity:1,y:0},
  exit: {opacity:0, y:30},
}