// Glowing Marker for Contact bar //

const marker = document.querySelector('#marker');
const item = document.querySelectorAll('ul .contact-link a');

function Indicator(e) {
    marker.style.left = e.offsetLeft + 'px';
    marker.style.width = e.offsetWidth + 'px';
}

item.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        Indicator(link);
    })
})

// Glowing background color randomizer for header box //

var colors = ['#ff9900',
    '#ff0000', '#00ff00', '#0000ff'
];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.getElementById('title').style.color = random_color;