const { InfoBox, SelectionIndicator, Model } = require('cesium/Cesium');
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0Y2ZhYWU1Yi1lZDc3LTRlNDEtYTQxNi02ZDUzZDU0YmE0YTkiLCJpZCI6MjY3MDI0LCJpYXQiOjE3MzYxNDk5MDB9.MdU3OYj_Dsk_Iw9mFwRukwMxMu8SjV9QiaqHCC1iEfg';

// var tileViewer = new Cesium.Viewer('cesiumContainer', {
//     terrain: Cesium.Terrain.fromWorldTerrain(),
// });

// async function load3DTileset() {
//     try {
//         const tileset = tileViewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(96188), );
        
//         tileViewer.zoomTo(tileset);
//     } catch (error) {
//         console.log(`타일 불러오기 오류: ${error}`);
//     }    
// }

// load3DTileset();


const modelViewer = new Cesium.Viewer('cesiumContainer', {
    InfoBox: false,
    SelectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
});


async function createModel (id, height) {
    modelViewer.entities.removeAll();

    const position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height,
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        
    try {
        const resource = await Cesium.IonResource.fromAssetId(id);
        console.log(resource)
        const entity = modelViewer.entities.add({
            name: "SpaceShip",
            position: position,
            orientation: orientation,
            model: {
                uri: resource,
                minimumPixelSize: 128,
                maximumScale: 20000,
            },
        });
        modelViewer.trackedEntity = entity;
    } catch (error) {
        console.log(error);
    }   
}

document.getElementById('modelSelector').addEventListener('change', function (e) {
    const selectedValue = e.target.value;
    if(selectedValue) {
        const { modelId, height } = JSON.parse(selectedValue)
        createModel(modelId, height)
    }
});