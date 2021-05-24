// ページの読み込みを待つ
window.addEventListener('load', init);

function init() {

    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const canvasElement = document.querySelector('#myCanvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    //モデルを読み込み
    const gltfLoader = new THREE.GLTFLoader();
    const url = 'src/models/mixer.glb';
    gltfLoader.load(url, function (gltf) {
        const model = gltf.scene;
        model.position.set(0,-5,0);
        scene.add(gltf.scene);
    });
    renderer.gammaOutput = true;

    // カメラ関連を作成
    const camera = new THREE.PerspectiveCamera(
        10,
        width / height,
        1,
        1000
    );
    camera.position.set(9, 0, 100);
    // camera.lookAt(gltfLoader.position);

    //コントローラー
    const controls = new THREE.OrbitControls(camera, canvasElement);
    //制御
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    directionalLight.intensity = 2;
    scene.add(directionalLight);

    // // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x333333, 1.0);
    ambientLight.intensity = 4;
    scene.add(ambientLight);

    // 初回の実行
    tick();

    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    onResize();
    window.addEventListener('resize', onResize);

    function onResize() {
        const reWidth = window.innerWidth;
        const reHeight = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(reWidth, reHeight);

        camera.aspect = reWidth / reHeight;
        camera.updateProjectionMatrix();
    }

}