import * as THREE from 'three';

/** 屏幕空间 UI 层：正交相机，y 轴向下，单位与 CSS 像素一致 */
export class UiLayer {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;

  constructor(
    readonly width: number,
    readonly height: number,
  ) {
    // 标准 y 向上的正交相机；UI 坐标（y 向下）在放置时用 H - y 转换
    this.camera = new THREE.OrthographicCamera(0, width, height, 0, -100, 100);
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(0, 0, 0);
  }

  render(renderer: THREE.WebGLRenderer): void {
    renderer.setViewport(0, 0, this.width, this.height);
    renderer.setScissorTest(false);
    renderer.render(this.scene, this.camera);
  }
}
