const { InfoBox, SelectionIndicator, Model } = require('cesium/Cesium');
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
Cesium.Ion.defaultAccessToken = process.env.MY_CESIUMJS_KEY;

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


// const modelViewer = new Cesium.Viewer('cesiumContainer', {
//     InfoBox: false,
//     SelectionIndicator: false,
//     shadows: true,
//     shouldAnimate: true,
// });


// async function createModel (id, height) {
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
        
//     try {
//         const resource = await Cesium.IonResource.fromAssetId(id);
//         console.log(resource)
//         const entity = modelViewer.entities.add({
//             name: id,
//             position: position,
//             orientation: orientation,
//             model: {
//                 uri: resource,
//                 minimumPixelSize: 128,
//                 maximumScale: 20000,
//             },
//         });
//         modelViewer.trackedEntity = entity;
//     } catch (error) {
//         console.log(error);
//     }   
// }

// document.getElementById('modelSelector').addEventListener('change', function (e) {
//     const selectedValue = e.target.value;
//     if(selectedValue) {
//         const { modelId, height } = JSON.parse(selectedValue)
//         createModel(modelId, height)
//     }
// });

const clampViewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    shadows: true,
});
const scene = clampViewer.scene;
const clock = clampViewer.clock;

clampViewer.camera.setView({
    destination: Cesium.Cartesian3.fromRadians(
        -1.3193669086512454,
        0.698810888305128,
        220,
    ),
    orientation: {
        heading: -1.3,
        pitch: -0.6,
        roll: 0,
    },
    endTransform: Cesium.Matrix4.IDENTITY,
});

let tileset;
async function getTileset() {
    try{
        tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188, {
            enableCollision: true,
        });
        clampViewer.scene.primitives.add(tileset);
    } catch (error) {
        console.log(`타일 셋 로딩 실패: ${error}`);
    }
}

let entitiy, positionProperty;
async function getCZMLData() {
    try {
        const dataSource = await Cesium.CzmlDataSource.load("./SampleData/ClampToGround.czml",);
        // clampViewer.dataSource.add(dataSource);
        entitiy = dataSource.entities.getById("CesiumMilkTruck");
        entitiy.model.uri = "./SampleData/models/CesiumMilkTruck.glb";
        entitiy.model.scale = 2.5;
        entitiy.model.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
        positionProperty = entitiy.position;
        entitiy.orientation =new Cesium.VelocityOrientationProperty(positionProperty);
    } catch (error) {
        console.log(`에러 ${error}`);
    }
}

clock.shoudAnimate = true;

getTileset();
getCZMLData();
