$(function() {
  $('#map_buttons a').click(function(e) {
    e.preventDefault();
    var zoom = $('#map_buttons').data('zoom');
    if (($(this).data('sign') === '+') && (zoom !== '2')) {
      ++zoom;
      width = '1'+25*zoom+'%';
      fileName = 'map'+zoom+'.png';
    } else if (($(this).data('sign') === '-') && (zoom !== '1')) {
      --zoom;
      width = '100%';
      fileName = 'map'+zoom+'.png';
    }
    $('#map_buttons').data('zoom', zoom);
    $('#map_img').attr('src', 'img/map/'+fileName).load(function() {
        $('#map_container').width(width);
        mapInit();
    });
  });
  mapInit();
  mapButtonsRewrite();
  drawAreas();
});
$( window ).resize(function() {
  mapInit();
});
function mapInit() {
  var $container = $('#map');
  var $img = $('#map_container');
  var containerOffset = $container.offset();
  var xTop = containerOffset.left-$img.width()+$container.outerWidth();
  var yTop = containerOffset.top-$img.height()+$container.outerHeight();
  var xBottom = containerOffset.left;
  var yBottom = containerOffset.top;

  $img.draggable({ containment: [xTop, yTop, xBottom, yBottom] });
  $img.css({'top':'-54%', 'left':'0'});
}

function mapButtonsRewrite() {
  var $container = $('#map');
  $('#map_buttons').css({
    right: ($container.outerWidth()/2 - 500)+'px'
  });
  $('#map_buttons').slideToggle("slow");
}

lineConfig = {
  fill: '#d7725e',
  stroke: '#cb624c',
  strokeWidth: 2,
  closed: true,
  opacity: 0.1
};

figurePoints = [{
  name: 'Ленинградская перспектива',
  points: [468, 158, 531, 146, 583, 244, 605, 367, 491, 366, 475, 257]
},{
  name: 'Гринландия',
  points: [141, 332, 163, 310, 258, 350, 160, 706, 137, 730, 77, 708]
},{
  name: 'Созведие',
  points: [267, 357, 250, 429, 304, 446, 327, 378, 289, 349]
},{name: 'Десяткино', points: [270, 546, 218, 527, 241, 450, 299, 470]}
,{name: 'Солнечный', points: [309, 450, 335, 459, 341, 490, 510, 544, 507, 606, 356, 682, 340, 713, 181, 649, 212, 537, 270, 558]}
,{name: 'Мой город', points: [182, 653, 357, 724, 376, 717, 417, 663, 441, 656, 530, 727, 451, 820, 369, 830, 157, 736]}
,{name: 'Виктория', points: [540, 702, 502, 678, 514, 636, 493, 629, 498, 612, 508, 613, 514, 556, 532, 547, 574, 557, 583, 578, 582, 611, 551, 696]}
,{name: 'Ласточка', points: [363, 462, 309, 444, 331, 380, 377, 411]}
,{name: 'Три Кита', points: [541, 516, 448, 448, 470, 396, 574, 440]}
,{name: 'Эланд', points: [783, 516, 799, 541, 761, 571, 760, 591, 771, 610, 771, 635, 758, 639, 672, 600, 694, 527, 737, 538, 782, 515]}
,{name: 'Мечта', points: [672, 605, 751, 641, 750, 645, 705, 648, 699, 653, 685, 697, 665, 691, 657, 711, 639, 704]}
,{name: 'Тридевяткино', points: [921, -3, 954, 132, 919, 201, 824, 184, 847, 40, 880, 6]}
];

function drawAreas() {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 2000,
    height: 6000
  });

  var layer = new Kinetic.Layer();
  
  $.each(figurePoints, function( index, figure ) {
    var poly = new Kinetic.Line($.extend({}, lineConfig, figure));

    poly.on('mouseover', function() {
      this.opacity(0.5);
      layer.draw();
    });
    poly.on('mouseout', function() {
      this.opacity(0.1);
      layer.draw();
    });

    layer.add(poly);
  });
  
  stage.add(layer);
}