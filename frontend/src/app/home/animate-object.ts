export function animiateObject(objects: Record<string, number>): void {
  for (let key in objects) {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;
    let speed = 2;
    let object: HTMLElement = document.getElementById(key) as HTMLElement;
    let x = Math.random() * screenWidth * 0.5,
      y = Math.random() * screenHeight * 0.5,
      dirX = Math.random() * 2 - 1,
      dirY = Math.random() * 2 - 1;
    const objectWidth = object.clientWidth;
    const objectHeight = object.clientHeight;
    let rotate = Math.random() * 180;

    function animate() {
      if (dirX * dirY > 0) {
        rotate += 0.5;
      } else {
        rotate -= 0.5;
      }
      if (y + objectHeight >= screenHeight + 500 || y < -500) {
        dirY *= -1;
        speed += Math.random() * 2 - 1;
      }
      if (x + objectWidth >= screenWidth + 500 || x < -500) {
        dirX *= -1;
        speed += Math.random() * 2 - 1;
      }
      if (speed > 3) speed--;
      if (speed < 1) speed++;
      x += dirX * speed;
      y += dirY * speed;
      object.style.left = x + 'px';
      object.style.top = y + 'px';
      object.style.transform = `rotate(${rotate}deg)`;
      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
  }
}
