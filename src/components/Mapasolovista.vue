<template>
  <div>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      style="height: 600px; width: 100%; z-index: 0"
    >
      <div v-for="figurast in figuras" :key="figurast._id">
        <!-- Dentro de este for habrá v.if por cada tipo de figura--> 
          
          <l-polygon
            v-if="figurast.type == 'polygon'"
            :lat-lngs="figurast.latlng"
            :color="figurast.color"
            :fillColor="figurast.color"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-polygon>

          <l-rectangle
            v-if="figurast.type == 'rectangle'"
            :bounds="figurast.latlng"
            :color="figurast.color"
            :fillColor="figurast.color"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-rectangle>

          <l-marker
            v-if="figurast.type == 'marker'"
            :lat-lng="figurast.latlng[0]"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-marker>

          <l-polyline
            v-if="figurast.type == 'polyline'"
            :lat-lngs="figurast.latlng"
            :color="figurast.color"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-polyline>

          <l-circle
            v-if="figurast.type == 'circle'"
            :lat-lng="figurast.latlng[0]"
            :radius="figurast.latlng[1]"
            :color="figurast.color"
            :fillColor="figurast.color"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-circle>
        
      </div>

      
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-control class="example-custom-control">
        <p @click="showAlert">
          Click me
        </p>
      </l-control>
      <l-polygon
        :lat-lngs="polygon.latlngs"
        :color="polygon.color"
      >
        <l-popup :content="polygon.name" />
      </l-polygon>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl, LPolygon, LPopup, LRectangle, LMarker, LPolyline, LCircle } from "vue2-leaflet";
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import axios from "axios";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Mapa',
  components: {
    LMap,
    LTileLayer,
    LControl,
    LPolygon,
    LRectangle,
    LMarker,
    LPolyline,
    LCircle,
    LPopup
  },
  data() {
    return {
      zoom: 15,
      figuras: [],
      data: '',
      center: latLng(3.449333156009882, -76.51537622482158),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      polygon: {
        latlngs: [
          [47.2263299, -1.6222],
          [47.21024000000001, -1.6270065],
          [47.1969447, -1.6136169],
          [47.18527929999999, -1.6143036],
          [47.1794457, -1.6098404],
          [47.1775788, -1.5985107],
          [47.1676598, -1.5753365],
          [47.1593731, -1.5521622],
          [47.1593731, -1.5319061],
          [47.1722111, -1.5143967],
          [47.1960115, -1.4841843],
          [47.2095404, -1.4848709],
          [47.2291277, -1.4683914],
          [47.2533687, -1.5116501],
          [47.2577961, -1.5531921],
          [47.26828069, -1.5621185],
          [47.2657179, -1.589241],
          [47.2589612, -1.6204834],
          [47.237287, -1.6266632],
          [47.2263299, -1.6222]
        ],
        color: "#ff00ff",
        name: 'Mi primer poligono'
      }
    };
  },
  created(){
      this.listarFiguras()
      //Ojo con este flujo, puede colocar problema el ciclo de vida entre created y mounted
  },
  methods: {
    showAlert() {
       alert('Programa desarrollado por Beycker Ágredo y Anderson Hormiga')
    },
    async listarFiguras(){
      try {
        this.figuras.splice(0, this.figuras.length)

        await axios.get("http://localhost:3000/zones/").then(res => {
          this.data = res.data;
          console.log(this.data);
          this.data.forEach(element => {
            const fig = {
                _id: element._id,
                type: element.type,
                title: element.title,
                description: element.description,
                calification: element.calification,
                color: element.color,
                latlng: element.latlng
            }
              
            this.figuras.push(fig)
          });
          
        });
      } catch (error) {
        console.log(error)
      }
      console.log('vamos a imprimir todas las figuras')
      console.log(this.figuras)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
</style>
