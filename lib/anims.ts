import { animate, Variants } from "framer-motion"
import { exit } from "process"

const logoAnim: Variants = {
    init: {
        scale: 1,
        rotate: '0deg'
    },
    animate: {
        scale: [1, 1, 1, 1.05, 1],
        rotate: ['0deg', '5deg', '-5deg', '0deg', '0deg'],
        transition: {
            repeat: Infinity,
            duration: 3,
            delay: 1,
            repeatDelay: 0.5,
        }
    }
}

const spin: Variants = {
    init: {
        rotate: '0deg'
    },
    animate: {
        rotate: ['0deg', '360deg'],
        transition: {
            repeat: Infinity,
            duration: 10,
            repeatDelay: 0.5,
            ease: 'linear',
        }
    }
}

const bannerLinksAnim: Variants = {
    initial: {
        y: '0%'              
    },
    animater: (custom) => ({
        y: ['200%', '0%'],
        transition: {
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
            delay: custom * 0.2 + 0.5
        }
    })
}

const magnetic: Variants = {
    init: {
        x: 0,
        y: 0,
        zIndex: 0,
    },
    animate: {
        x: 10,
        y: -10,
        zIndex: 1,
    }
}

const menuAnim: Variants = {
    initial: {
        x: '-100%',
    },
    animater: {
        x: '0%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    },
    exit: {
        x: '-100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const navContainer: Variants = {
    init: {        
    },
    animate: {        
    }
}

const navLinks: Variants = {
    init: {
        height: '0%',
    },
    animate: {
        height: '100%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const navLinksB: Variants = {
    init: {
        height: '100%',
        width: '100%',
        borderRadius: '0px'
    },
    animate: {
        height: '90%',
        width: '90%',
        borderRadius: '10px',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }
}

const smileAnim: Variants = {
    init: {
        scale: 1,
        rotate: '0deg'
    },
    animate: {
        scale: 1.3,
        rotate: '360deg',
        transition: {
            duration: 4,
            repeat: Infinity,            
        }
    },
}

const textLink: Variants = {
    init: {
        y: '50%',
    },
    animate: {
        y: ['50%', '-10%'],
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }

}

const noiseAnim: Variants = {
    init: {
        opacity: 0,
    },
    animate: {
        opacity: 0.2,
        transition: {
            duration: 0.5,            
        }
    }
}

const infoImgAnim: Variants = {
    init: {
        y: '-10%',
    },
    animate: {
        y: '0%',
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    }   
}

const footerBannerAnim: Variants = {
    init: {
        x: '0%',
    },
    animate: {
        x: ['0%', `-${100/3}%`],
        transition: {
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
            
        }
    }   
}


export { bannerLinksAnim, logoAnim, spin, magnetic, menuAnim, navContainer, navLinksB, smileAnim, navLinks, noiseAnim, infoImgAnim, textLink, footerBannerAnim }