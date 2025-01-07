const { InfoBox, SelectionIndicator, Model } = require('cesium/Cesium');
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0Y2ZhYWU1Yi1lZDc3LTRlNDEtYTQxNi02ZDUzZDU0YmE0YTkiLCJpZCI6MjY3MDI0LCJpYXQiOjE3MzYxNDk5MDB9.MdU3OYj_Dsk_Iw9mFwRukwMxMu8SjV9QiaqHCC1iEfg';

var tileViewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});

async function load3DTileset() {
    try {
        const tileset = tileViewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(96188), );
        
        tileViewer.zoomTo(tileset);
        
    //   const extras = tileset.asset.extras;
    //   if (
    //     Cesium.defined(extras) &&
    //     Cesium.defined(extras.ion) &&
    //     Cesium.defined(extras.ion.defaultStyle)
    //   ) {
    //     tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    //   }
    } catch (error) {
        console.log(`타일 불러오기 오류: ${error}`);
    }    
}

load3DTileset();


// const modelViewer = new Cesium.Viewer('cesiumContainer', {
//     InfoBox: false,
//     SelectionIndicator: false,
//     shadows: true,
//     shouldAnimate: true,
// });

// function createModel (url, height) {
//     modelViewer.entities.removeAll();

//     const position = Cesium.Cartesian3.fromDegrees(
//         -123.0744619,
//         44.0503706,
//         height,
//     );
//     const heading = Cesium.Math.toRadians(135);
//     const pitch = 0;
//     const roll = 0;
//     const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
//     const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

//     const entity = viewer.entities.add({
//         name: url,
//         position: position,
//         orientation: orientation,
//         model: {
//             uri: url,
//             minimumPixelSize: 128,
//             maximumScale: 20000,
//         },
//     });
//     modelViewer.trackedEntity = entity;
// }

// const options = [
//     {
//         text: "비행기",
//         onselect: function () {
//             createModel("../SampleData/models/CesiumAir/Cesium_Air.glb", 5000.0);
//         },
//     },
// ]