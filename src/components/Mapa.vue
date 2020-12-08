<template>
  <div>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      style="height: 600px; width: 100%; z-index: 0"
    >
      <l-draw-toolbar position="topright"/>
      <div v-for="figurast in figuras" :key="figurast._id">
        <!-- Dentro de este for habrá v.if por cada tipo de figura--> 
          
          <l-polygon
            v-if="figurast.type == 'polygon'"
            :lat-lngs="figurast.latlng"
            :color="figurast.color"
            :fillColor="figurast.color"
            @dblclick="editar(figurast._id, figurast)"
            @click.right="eliminar(figurast._id)"
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
            @dblclick="editar(figurast._id, figurast)"
            @click.right="eliminar(figurast._id)"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-rectangle>

          <l-marker
            v-if="figurast.type == 'marker'"
            :lat-lng="figurast.latlng[0]"
            @dblclick="editar(figurast._id, figurast)"
            @click.right="eliminar(figurast._id)"
          >
            <l-popup :content="'<b> Título: ' + figurast.title + 
                              '<br><br><b>Calificación: </b>' + figurast.calification +
                              '<br><b>Descripción: </b>' + figurast.description" />
          </l-marker>

          <l-polyline
            v-if="figurast.type == 'polyline'"
            :lat-lngs="figurast.latlng"
            :color="figurast.color"
            @dblclick="editar(figurast._id, figurast)"
            @click.right="eliminar(figurast._id)"
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
            @dblclick="editar(figurast._id, figurast)"
            @click.right="eliminar(figurast._id)"
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
    <div class="modal" style="z-index: 100"> 
      <div class="modal-background"></div> 
      <div class="modal-content"> 

        <div class='box'> 
          <h1 class='title' 
              style='color:green'> 
            Califica este sitio</h1> 
          
            <div class="columns ">
              <div class="column is-one-quarter">
                Titulo
              </div>
              <div class="column">
                <input class="input" type="text" placeholder="Nombre del sitio o evento ocurrido" v-model="figura.title">
              </div>
            </div>

            <div class="columns ">
              <div class="column is-one-quarter">
                Descripción
              </div>
              <div class="column">
                <input class="input" type="text" placeholder="Describe brevemente el lugar o suceso ocurrido" v-model="figura.description">
              </div>
            </div>

            <div class="columns ">
              <div class="column is-one-quarter">
                Nivel de seguridad
              </div>
              <div class="column">
                <div class="select">
                  <select v-model="figura.color">
                      <option>Muy seguro</option>
                      <option>Tener precaución</option>
                      <option>Inseguro</option>
                  </select>
                  </div>
              </div>
            </div>

            <div class="columns ">
              <div class="column is-one-quarter">
                Califica el sitio
              </div>
              <div class="column">
                <div class="select">
                  <select v-model="figura.calification">
                      <option>★✩✩✩✩</option>
                      <option>★★✩✩✩</option>
                      <option>★★★✩✩</option>
                      <option>★★★★✩</option>
                      <option>★★★★★</option>
                  </select>
                  </div>
              </div>
            </div>
          
          <div class='buttons'> 
            <button class='button is-fullwidth' @click.prevent="guardar"> 
              Guardar
            </button> 
          </div> 
        </div> 
      </div> 
      <!--
      <button class="modal-close is-large" 
              aria-label="close"> 
        Model 
      </button> 
      -->
    </div> 
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl, LPolygon, LPopup, LRectangle, LMarker, LPolyline, LCircle } from "vue2-leaflet";
import { Icon } from 'leaflet';
import LDrawToolbar from 'vue2-leaflet-draw-toolbar';
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
  props: {
    msg: String
  },
  components: {
    LMap,
    LTileLayer,
    LControl,
    LDrawToolbar,
    LPolygon,
    LRectangle,
    LMarker,
    LPolyline,
    LCircle,
    LPopup
  },
  mounted() {
    this.$nextTick(() => {
      const map = this.$refs.map.mapObject;
      const drawnItems = new window.L.FeatureGroup();
      map.addLayer(drawnItems)
      

      //const editableLayers = new window.L.FeatureGroup().addTo(map);
      map.on('draw:created', (e) => {
        const type = e.layerType;
        const layer = e.layer;

        this.estado = 'agregar'

        const modal = document.querySelector('.modal'); 
        modal.style.display = 'block' 
        this.layer = layer;

        if (type === 'marker') {
          // Do marker specific actions
          //console.log(layer.getLatLng().lat)
          this.tipofigura = 'marker'
          this.figura.type = 'marker'

          this.figura.latlng = [layer.getLatLng().lat, layer.getLatLng().lng]

        }else if(type === 'polygon'){
          
          //console.log(layer.options.color)
          //Cambiar de color el poligono
          //layer.options.color = '#ffffff';
          //Imprimir todas los puntos del poligono:
          /*
          layer.getLatLngs()[0].map((res) => {
            console.log("Latitud: " + res.lat + " Longitud: " + res.lng)
          })
          */
          this.figura.latlng = layer.getLatLngs()

          this.tipofigura = 'polygon'
          this.figura.type = 'polygon'
          
        }else if(type === 'circle'){
          this.tipofigura = 'circle'
          this.figura.type = 'circle'
          //console.log('informacion de la capa')
          //console.log(layer.getLatLng())
          //console.log(layer)
          this.figura.latlng = [[layer.getLatLng().lat, layer.getLatLng().lng], [layer._mRadius]]
        }else if(type === 'rectangle'){
          this.tipofigura = 'rectangle';
          this.figura.type = 'rectangle'
          this.figura.latlng = layer.getLatLngs()
          /*
          layer.getLatLngs()[0].map((res) => {
            console.log("Latitud: " + res.lat + " Longitud: " + res.lng)
          })
          */
        }else if(type === 'polyline'){
          this.tipofigura = 'polyline'
          this.figura.type = 'polyline'
          this.figura.latlng = layer.getLatLngs()
        }
        // Do whatever else you need to. (save to db, add to map etc)
        //console.log("Se agrego algo")
        //editableLayers.addLayer(layer);
      })

      map.on('draw:deleted', (e) => {
        //const layers = e.layers;
        
        console.log(e)
        
      })

      /*
      map.on('draw:edited', (e) => {
        const layers = e.layers;
        
        layers.eachLayer(function (layer) {
             //do whatever you want; most likely save back to db
             console.log(layer)
         });
        
        //Do whatever else you need to. (save to db, add to map etc)
        //console.log("Se editó algo")
        //editableLayers.addLayer(layer);
      })
      */
/*
      map.on('layeradd', (e) => {
        console.log(e)
        console.log("Se cambio el color")
      })
      */
    })
  },
  data() {
    return {
      zoom: 15,
      layer: null,
      figura: {},
      figuras: [],
      estado: 'agregar',
      data: '',
      tipofigura: '',
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

        this.figura.title = ''
        this.figura.description = ''
        this.figura.color = ''
        this.figura.calification = ''

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
    },
    async guardar(){
      //var puntuacion = '';

      //console.log(this.layer._leaflet_id)
      if(this.figura.color == 'Muy seguro'){
        //this.layer.options.fillcolor = '#43C523';
        //this.layer.setStyle({color: '#43C523'});
        this.figura.color = '#43C523'
        console.log("Seguro");
      }else if(this.figura.color == 'Tener precaución'){
        //this.layer.options.fillcolor = '#E8EB27';
        //this.layer.setStyle({color: '#E8EB27'});
        this.figura.color = '#E8EB27'
        console.log("Precaucion");
      }else if(this.figura.color == 'Inseguro'){
        //this.layer.options.fillcolor = '#EF3522';
        //this.layer.setStyle({color: '#EF3522'});
        this.figura.color = '#EF3522'
        console.log("Inseguro");
      }
      /*
      if(this.sitio.puntuacion == '1 estrella'){
        puntuacion = '★✩✩✩✩'
        this.figura.calification = '★✩✩✩✩'
      }else if(this.sitio.puntuacion == '2 estrellas'){
        puntuacion = '★★✩✩✩'
        this.figura.calification = '★★✩✩✩'
      }else if(this.sitio.puntuacion == '3 estrellas'){
        puntuacion = '★★★✩✩'
        this.figura.calification = '★★★✩✩'
      }else if(this.sitio.puntuacion == '4 estrellas'){
        puntuacion = '★★★★✩'
        this.figura.calification = '★★★★✩'
      }else if(this.sitio.puntuacion == '5 estrellas'){
        puntuacion = '★★★★★';
        this.figura.calification = '★★★★★'
      }
      

      this.layer.bindPopup('<b> Título: ' + this.figura.titulo + 
                            '<br><br><b>Calificación: </b>' + this.figura.calification +
                            '<br><b>Descripción: </b>' + this.sitio.descripcion);

      */
      
      const modal =  document.querySelector('.modal');
      modal.style.display = 'none';

      if(this.estado == 'agregar'){
        await axios.post("http://localhost:3000/zones/", this.figura).then((result) => {
          console.log(result);
        })
      }else if(this.estado == 'editar'){
        await axios.put("http://localhost:3000/zones/" + this.figura._id, this.figura).then((result) => {
          console.log(result);
        })
      }

      

      this.listarFiguras()
    },
    async editar(id, figuraactual){

      this.figura = figuraactual
      this.estado = 'editar'
      if(this.figura.color == '#43C523'){
        this.figura.color = 'Muy seguro'
      }else if(this.figura.color == '#E8EB27'){
        this.figura.color = 'Tener precaución'
      }else if(this.figura.color == '#EF3522'){
        this.figura.color = 'Inseguro'
      }
      const modal = document.querySelector('.modal'); 
      modal.style.display = 'block' 
      console.log(id)
      //this.listarFiguras()
    },
    async eliminar(id){
      
      await axios.delete("http://localhost:3000/zones/" + id).then((result) => {
        console.log(result);
      });
      
      this.listarFiguras()
      
      //console.log(id)
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
