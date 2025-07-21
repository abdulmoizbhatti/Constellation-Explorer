export const orionData = {
    name: "Orion",
    info: "Orion is a prominent constellation located on the celestial equator and visible throughout the world. It is one of the most conspicuous and recognizable constellations in the night sky, known for its 'Hunter' shape.",
    position: { x: 0, y: 0, z: 0 },
    stars: [
        { name: "Betelgeuse",    x: -5.8, y: 7.4,  z: -1.0, brightness: 0.5, distance: "642 ly" },
        { name: "Meissa",        x: -4.0, y: 9.9,  z: 1.0, brightness: 3.4, distance: "1100 ly" },
        { name: "Bellatrix",     x: 3.9,  y: 6.3,  z: -6.0, brightness: 1.6, distance: "250 ly" },
        { name: "Alnitak",       x: -1.7, y: -1.9, z: 2.0, brightness: 1.7, distance: "1260 ly" },
        { name: "Alnilam",       x: -0.5, y: -1.2, z: 7.0, brightness: 1.7, distance: "2000 ly" },
        { name: "Mintaka",       x: 1.9,  y: -0.3, z: 1.5, brightness: 2.2, distance: "1200 ly" },
        { name: "Saiph",         x: -2.0, y: -9.7, z: -0.8, brightness: 2.1, distance: "650 ly" },
        { name: "Rigel",         x: 5.5,  y: -8.2, z: 0.0, brightness: 0.1, distance: "860 ly" },
        { name: "Hatysa",        x: -0.6, y: -2.5, z: 0.5, brightness: 4.2, distance: "900 ly" },
        { name: "Pi3 Orionis",   x: 9.2,  y: 6.9,  z: -9.0, brightness: 3.2, distance: "26 ly" },
        { name: "Omicron2 Ori",  x: 10.5, y: 4.8,  z: 2.5, brightness: 4.0, distance: "1400 ly" },
        { name: "Pi4 Orionis",   x: 11.0, y: 2.9,  z: 1.8, brightness: 3.7, distance: "1250 ly" },
        { name: "Pi5 Orionis",   x: 10.2, y: 0.1,  z: 1.6, brightness: 3.7, distance: "1300 ly" }
    ],
    connections: [
        [0, 1], [1, 2], [0, 4], [2, 4], [3, 4], [4, 5], [3, 6], [5, 7], [6, 7], [4, 8],
        [2, 9], [9, 10], [10, 11], [11, 12]
    ]
}; 