const { InfoBox, SelectionIndicator, } = require('cesium/Cesium');
var Cesium = require('cesium/Cesium');
require('./css/main.css');
require('cesium/Widgets/widgets.css');
Cesium.Ion.defaultAccessToken = process.env.MY_CESIUMJS_KEY;

let point = [];
// var tileViewer = new Cesium.Viewer('cesiumContainer', {
//     terrain: Cesium.Terrain.fromWorldTerrain(),
// });

// async function load3DTileset() {
//     try {
//         const tileset = tileViewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(1415196), );
        
//         tileViewer.zoomTo(tileset);
//     } catch (error) {
//         console.log(`타일 불러오기 오류: ${error}`);
//     }    
// // }

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

// const clampViewer = new Cesium.Viewer("cesiumContainer", {
//     terrain: Cesium.Terrain.fromWorldTerrain(),
//     shadows: true,
// });
// const scene = clampViewer.scene;
// const clock = clampViewer.clock;

// clampViewer.camera.setView({
//     destination: Cesium.Cartesian3.fromRadians(
//         -1.3193669086512454,
//         0.698810888305128,
//         220,
//     ),
//     orientation: {
//         heading: -1.3,
//         pitch: -0.6,
//         roll: 0,
//     },
//     endTransform: Cesium.Matrix4.IDENTITY,
// });

// let tileset;
// async function getTileset() {
//     try{
//         tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188, {
//             enableCollision: true,
//         });
//         clampViewer.scene.primitives.add(tileset);
//         tileset.show = true;
//     } catch (error) {
//         console.log(`타일 셋 로딩 실패: ${error}`);
//     }
// }

// let entity, positionProperty;
// async function getCZMLData() {
//     try {
//         const dataSource = await Cesium.CzmlDataSource.load("./SampleData/ClampToGround.czml",);
//         clampViewer.dataSources.add(dataSource);
//         entity = dataSource.entities.getById("CesiumMilkTruck");
//         positionProperty = entity.position;
//         entity.orientation = new Cesium.VelocityOrientationProperty(positionProperty);
//         entity.model.heightReference = Cesium.HeightReference.CLAMP_TO_TERRAIN;
//     } catch (error) {
//         console.log(`에러 ${error}`);
//     }
// }

// clock.shoudAnimate = true;

// getTileset().then(console.log('타일 호출'));
// getCZMLData()


const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    });

let tileset
async function getBilboardTileset() {
    tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188, );  
}
getBilboardTileset().then(() => {
    // viewer.scene.primitives.add(tileset);
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(
            -4356164.021824962,
            864976.5891000634,
            -4562648.77869673,
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0
        }
    });
})


const addBillboardAt = function(cartesianPosition) {
    viewer.entities.add({
        id:'test' + Math.random(),
        position: cartesianPosition,
        billboard: {
            image: "./SampleData/snowflake_particle.png",
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
    });
};

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (input) {
    const pickedObject = viewer.scene.pick(input.position);
    if (viewer.scene.pickPositionSupported){
        const cartesian = viewer.scene.pickPosition(input.position);
        addBillboardAt(cartesian);
        calTime(cartesian);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

handler.setInputAction(function (input) {
    // const pickedObject = viewer.scene.pick(input.position);
    // const { _id } = pickedObject.id;
    // if(Cesium.defined(pickedObject) && _id) {
    //     viewer.entities.removeById(_id)
    //     return;
    // }
    console.log(point)
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

handler.setInputAction(() => {
    // if(viewer.entities.values.length > 0) {
    //     const entityList = viewer.entities.values;
    //     console.log(entityList[0].position.getValue());
        
    // }
    console.log(positionProperty);
}, Cesium.ScreenSpaceEventType.MIDDLE_CLICK)

async function calTime(cartesianValue) {
    const startTime = Cesium.JulianDate.now();
    const stopTime = Cesium.JulianDate.addSeconds(startTime, 30, new Cesium.JulianDate());

    const timePos = [];
    const duration = viewer.entities.values.length;
    console.log(duration)
    for(let i = 0; i <= 4; i+=5) {
        const time = Cesium.JulianDate.addSeconds(startTime, i, new Cesium.JulianDate());
        const position = Cesium.Cartesian3.fromDegrees(
            cartesianValue.x + i * 0.001,
            cartesianValue.y + i * 0.001,
            100
        );
        timePos.push(Cesium.JulianDate.toIso8601(time), position.x, position.y, position.z);
        console.log(timePos.length)
    }
    
    return await point.push(timePos);
}













// async function tileHighlight() {
//     const tileHighlightViewer = new Cesium.Viewer("cesiumContainer", {
//         terrain: Cesium.Terrain.fromWorldTerrain(),
//     });
    
//     const geocoder = tileHighlightViewer.geocoder.viewModel;
//     geocoder.searchText = "Vienna";
//     geocoder.flightDuration = 0.0;
//     geocoder.searchText();
    
//     try {
//         const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(5737);
//         tileHighlightViewer.scene.primitives.add(tileset);

//         tileset.style = new Cesium.Cesium3DTileStyle({
//             color: "rgba(255, 255, 255, 0.5)",
//         });
//     } catch(error) {
//         console.log(`타일 로딩 실패: ${error}`);
//     }

//     const highlighted = {
//         feature: undefined,
//         originalColor: new Cesium.Color(),
//     };

//     tileHighlightViewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
//         if(Cesium.defined(highlighted.feature)) {
//             highlighted.feature.color = highlighted.originalColor;
//             highlighted.feature = undefined;
//         }

//         const pickedFeature = tileHighlightViewer.scene.pick(movement, endPosition);
//         if(!Cesium.defined(pickedFeature)) {
//             return;
//         }
//     })
// }
