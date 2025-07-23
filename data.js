export const orionData = {
    name: "Orion",
    info: "Orion is a prominent constellation located on the celestial equator and visible throughout the world. It is one of the most conspicuous and recognizable constellations in the night sky, known for its 'Hunter' shape.",
    position: { x: 0, y: 0, z: 0 },
    stars: [
        { name: "Betelgeuse",    x: -5.8*2, y: 7.4*2,  z: (26-642)/100, brightness: 0.5, distance: "642 ly" },
        { name: "Meissa",        x: -4.0*2, y: 9.9*2,  z: (26-1100)/100, brightness: 3.4, distance: "1100 ly" },
        { name: "Bellatrix",     x: 3.9*2,  y: 6.3*2,  z: (26-250)/100, brightness: 1.6, distance: "250 ly" },
        { name: "Alnitak",       x: -1.7*2, y: -1.9*2, z: (26-1260)/100, brightness: 1.7, distance: "1260 ly" },
        { name: "Alnilam",       x: -0.5*2, y: -1.2*2, z: (26-2000)/100, brightness: 1.7, distance: "2000 ly" },
        { name: "Mintaka",       x: 1.9*2,  y: -0.3*2, z: (26-1200)/100, brightness: 2.2, distance: "1200 ly" },
        { name: "Saiph",         x: -2.0*2, y: -9.7*2, z: (26-650)/100, brightness: 2.1, distance: "650 ly" },
        { name: "Rigel",         x: 5.5*2,  y: -8.2*2, z: (26-860)/100, brightness: 0.1, distance: "860 ly" },
        { name: "Pi3 Orionis",   x: 10.2*2,  y: 3.5*2,  z: (26-26)/100, brightness: 3.2, distance: "26 ly" },
        { name: "Omicron2 Ori",  x: 11.0*2, y: 4.8*2,  z: (26-1400)/100, brightness: 4.0, distance: "1400 ly" },
        { name: "Pi4 Orionis",   x: 11.5*2, y: 2.9*2,  z: (26-1250)/100, brightness: 3.7, distance: "1250 ly" },
        { name: "Pi5 Orionis",   x: 10.2*2, y: 0.1*2,  z: (26-1300)/100, brightness: 3.7, distance: "1300 ly" }
    ],
    connections: [
        [0, 1], [1, 2], [0, 4], [2, 4], [3, 4], [4, 5], [3, 6], [5, 7], [6, 7],
        [2, 8], [8, 10], [9, 10], [10, 11]
    ]
};

export const bigDipperData = {
    name: "Big Dipper",
    info: "The Big Dipper is an asterism of seven bright stars in the constellation Ursa Major. It is one of the most recognizable patterns in the night sky.",
    position: { x: -75, y: -20, z: 0 },
    stars: [
        { name: "Alkaid",  x: 0*1.5,    y: 12*1.5,  z: 0*1.5, z3d: ((78-104)/20) + 0.3, brightness: 1.9, distance: "104 ly" },
        { name: "Mizar",   x: 4.5*1.5,  y: 9*1.5,   z: 0*1.5, z3d: ((78-78)/20) + -0.7, brightness: 2.2, distance: "78 ly" },    
        { name: "Alioth",  x: 8.1*1.5,  y: 6*1.5,   z: 0*1.5, z3d: ((78-81)/20) + 0.5, brightness: 1.8, distance: "81 ly" },    
        { name: "Megrez",  x: 10.5*1.5, y: 3*1.5,   z: 0*1.5, z3d: ((78-80)/20) + -0.2, brightness: 3.3, distance: "80 ly" },    
        { name: "Phecda",  x: 8.1*1.5,  y: -3*1.5,  z: 0*1.5, z3d: ((78-84)/20) + 0.8, brightness: 2.4, distance: "84 ly" },   
        { name: "Dubhe",   x: 16.5*1.5, y: 0*1.5,   z: 0*1.5, z3d: ((78-123)/20) + -0.6, brightness: 1.8, distance: "123 ly" },  
        { name: "Merak",   x: 16.5*1.5, y: -6*1.5,  z: 0*1.5, z3d: ((78-79)/20) + 0.4, brightness: 2.4, distance: "79 ly" }
    ],
    connections: [
        [0, 1], [1, 2], [2, 3], 
        [3, 5], [5, 6], [6, 4], [4, 3] 
    ]
};

export const cassiopeiaData = {
    name: "Cassiopeia",
    info: "Cassiopeia is a prominent constellation in the northern sky, easily recognizable for its distinctive 'W' shape formed by five bright stars.",
    position: { x: 75, y: -20, z: 0 },
    stars: [
        { name: "Schedar",    x: 0*1.5,   y: 0*1.5,   z: 0*1.5, z3d: ((55-228)/20) + 0.2, brightness: 2.2, distance: "228 ly" },
        { name: "Caph",      x: 4*1.5,   y: 3*1.5,   z: 0*1.5, z3d: ((55-55)/20) + -0.5, brightness: 2.3, distance: "55 ly" },
        { name: "Gamma Cas", x: 8*1.5,   y: 0*1.5,   z: 0*1.5, z3d: ((55-610)/20) + 0.7, brightness: 2.2, distance: "610 ly" },
        { name: "Ruchbah",   x: 12*1.5,  y: 3*1.5,   z: 0*1.5, z3d: ((55-99)/20) + -0.3, brightness: 2.7, distance: "99 ly" },
        { name: "Segin",     x: 16*1.5,  y: 0*1.5,   z: 0*1.5, z3d: ((55-440)/20) + 0.6, brightness: 3.4, distance: "440 ly" }
    ],
    connections: [
        [0, 1], [1, 2], [2, 3], [3, 4]
    ]
}; 